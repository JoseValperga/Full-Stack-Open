require("dotenv").config();
const jwt = require("jsonwebtoken");
const blogRoutes = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

blogRoutes.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username:1,user:1 });
  return response.json(blogs);
});

blogRoutes.post("/", async (request, response) => {
  const { title, author, url } = request.body;

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title, author, url, user: user._id
  });

  const result = await blog.save();
  user.blogs = user.blogs.concat(result._id);
  await user.save();
  return response.status(201).json(result);
});

blogRoutes.delete("/:id", async (request, response) => {
  const id = request.params.id;
  await Blog.findByIdAndDelete(id);
  return response.status(204).end();
});


blogRoutes.put("/", async (request, response) => {
  const newBlog = request.body;
  const { title, author, url, likes, id } = newBlog;

  if (!title || !author || !url) {
    return response.status(400).send({ error: "Missing title/author/url" });
  }

  const blog = { title, author, url, likes };
  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, {
    new: true,
    runValidators: true,
    context: "query",
  });
  return response.status(202).json(updatedBlog);
});

module.exports = blogRoutes;