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

afterAll(() => {
  mongoose.connection.close();
});