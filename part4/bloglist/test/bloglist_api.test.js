const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "Prueba 1",
    author: "Josefer",
    url: "http://josefer.com.ar",
    likes: 5,
  },

  {
    title: "Prueba 2",
    author: "Annie",
    url: "http://annie.com.ar",
    likes: 5,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let noteBlog = new Blog(initialBlogs[0]);
  await noteBlog.save();
  noteBlog = new Blog(initialBlogs[1]);
  await noteBlog.save();
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
  expect(response.body).toHaveLength(initialBlogs.length);
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
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  const author = response.body.map(r => r.author);
  expect(response.body).toHaveLength(initialBlogs.length + 1);
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
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(400);

  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(initialBlogs.length);
});


test("The id property must exist instead of _id", async () => {
  const newBlog = {
    title: "Prueba 3",
    author: "Ana Sofi",
    url: "http://anasofi.com.ar",
    likes: 5,
  };
  await api
    .post("/api/blogs")
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
  };

  await api
    .post("/api/blogs")
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
  };

  const newBlog2 =
  {
    author: "Prueba de falta de url",
    title: "Prueba 4",
    likes: 5,
  };

  await api
    .post("/api/blogs")
    .send(newBlog1)
    .expect(400);

  let response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(initialBlogs.length);

  await api
    .post("/api/blogs")
    .send(newBlog2)
    .expect(400);

  response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(initialBlogs.length);
});

test("delete a blog", async () => {
  const newBlog = {
    title: "Prueba 3",
    author: "Ana Sofi",
    url: "http://anasofi.com.ar",
    likes: 10,
  };
  const responseOne = await api.post("/api/blogs").send(newBlog).expect(201).expect("Content-Type", /application\/json/);
  const postId=responseOne.body.id;
  await api.delete(`/api/blogs/${postId}`);
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(initialBlogs.length);
});

test("edit a blog", async () => {
  const newBlog1 = {
    title: "Prueba 3",
    author: "Ana Sofi",
    url: "http://anasofi.com.ar",
    likes: 5,
  };

  const newBlog2 = {
    title: "Prueba 4",
    author: "Ana Sofi",
    url: "http://anasofi.com.ar",
    likes: 10,
  };

  const responseOne = await api.post("/api/blogs").send(newBlog1).expect(201).expect("Content-Type", /application\/json/);
  const postId=responseOne.body.id;
  newBlog2.id=postId;
  const responseTwo = await api.put("/api/blogs").send(newBlog2).expect(202).expect("Content-Type", /application\/json/);
  expect(responseTwo.body.title).toEqual("Prueba 4");
  expect(responseTwo.body.likes).toEqual(10);
});



afterAll(() => {
  mongoose.connection.close();
});