const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Blog = require("../models/blog");
const helper = require("./test_helper");
let loginToken;
let loginUser;

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map(u => u.username);
    expect(usernames).toContain(newUser.username);
  }, 100000);
});

test("login user with jwt", async () => {
  const conectado = await api
    .post("/api/login")
    .send({
      username: "mluukkai",
      password: "salainen",
    })
    .expect(200);
  loginToken = conectado.body.token;
  loginUser = conectado.body.id;

});

beforeEach(async () => {
  await Blog.deleteMany({});

  let noteBlog = new Blog(helper.initialBlogs[0]);
  await noteBlog.save();

  noteBlog = new Blog(helper.initialBlogs[1]);
  await noteBlog.save();

  /*
  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog));
  const promiseArray = blogObjects.map(blog => blog.save());
  await Promise.all(promiseArray);
  */
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 100000);

test("there are two notes", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(2);
});

test("the first blog belongs to Josefer", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body[0].author).toBe("Josefer");
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("a specific blog is within the returned notes", async () => {
  const response = await api.get("/api/blogs");
  const contents = response.body.map(r => r.author);
  expect(contents).toContain(
    "Annie"
  );
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "Prueba 3",
    author: "Ana Sofi",
    url: "http://anasofi.com.ar",
    likes: 5,
    userId: loginUser
  };
  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${loginToken}`)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  //const response = await api.get("/api/blogs");
  const response = await helper.blogsInDb();

  //expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
  expect(response).toHaveLength(helper.initialBlogs.length + 1);

  //const author = response.body.map(r => r.author);
  const author = response.map(blog => blog.author);
  expect(author).toContain(
    "Ana Sofi"
  );
});

test("blog without author is not added", async () => {
  const newBlog =
  {
    title: "Prueba 4",
    url: "http://prueba4.com.ar",
    likes: 5,
    userId: loginUser,
  };

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${loginToken}`)
    .send(newBlog)
    .expect(400);

  //const response = await api.get("/api/blogs");
  //expect(response.body).toHaveLength(helper.initialBlogs.length);

  const blogsQuantity = await helper.blogsInDb();
  expect(blogsQuantity).toHaveLength(helper.initialBlogs.length);
});


test("The id property must exist instead of _id", async () => {
  const newBlog = {
    title: "Prueba 3",
    author: "Ana Sofi",
    url: "http://anasofi.com.ar",
    likes: 5,
    userId: loginUser,
  };
  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${loginToken}`)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  expect(response.body[0].id).toBeDefined();
  expect(response.body[0]._id).not.toBeDefined();
});

test("likes = 0 if not exist", async () => {
  const newBlog = {
    title: "Prueba 3",
    author: "Ana Sofi",
    url: "http://anasofi.com.ar",
    userId: loginUser,
  };

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${loginToken}`)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  expect(response.body[2].likes).toEqual(0);
});


test("blog without title or url are not added", async () => {
  const newBlog1 =
  {
    author: "Prueba de falta de title",
    url: "http://prueba4.com.ar",
    likes: 5,
    userId: loginUser,
  };

  const newBlog2 =
  {
    author: "Prueba de falta de url",
    title: "Prueba 4",
    likes: 5,
    userId: loginUser,
  };

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${loginToken}`)
    .send(newBlog1)
    .expect(400);

  let response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(helper.initialBlogs.length);

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${loginToken}`)
    .send(newBlog2)
    .expect(400);

  response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("delete a blog", async () => {
  const newBlog = {
    title: "Prueba 3",
    author: "Ana Sofi",
    url: "http://anasofi.com.ar",
    likes: 10,
    userId: loginUser
  };
  const responseOne = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${loginToken}`)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  const postId = responseOne.body.id;
  await api
    .delete(`/api/blogs/${postId}`)
    .set("Authorization", `Bearer ${loginToken}`);
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("edit a blog", async () => {
  const newBlog1 = {
    title: "Prueba 3",
    author: "Ana Sofi",
    url: "http://anasofi.com.ar",
    likes: 5,
    userId: loginUser
  };

  const newBlog2 = {
    title: "Prueba 4",
    author: "Ana Sofi",
    url: "http://anasofi.com.ar",
    likes: 10,
    userId: loginUser
  };

  const responseOne = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${loginToken}`)
    .send(newBlog1).expect(201)
    .expect("Content-Type", /application\/json/);

  const postId = responseOne.body.id;
  newBlog2.id = postId;
  const responseTwo = await api
    .put("/api/blogs")
    .set("Authorization", `Bearer ${loginToken}`)
    .send(newBlog2).expect(202)
    .expect("Content-Type", /application\/json/);
  expect(responseTwo.body.title).toEqual("Prueba 4");
  expect(responseTwo.body.likes).toEqual(10);
});

afterAll(() => {
  mongoose.connection.close();
});