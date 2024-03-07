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

const nonExistingId = async () => {
  const blog = new Blog({ author: "Josefer" });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

const usersInDb = async () => {
  const users = await Blog.find({});
  return users.map(user => user.toJSON());
};

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb
};