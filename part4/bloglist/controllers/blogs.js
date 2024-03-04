const blogRoutes = require("express").Router();
const Blog = require("../models/blog");

blogRoutes.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  return response.json(blogs);
});

blogRoutes.post("/", async (request, response) => {
  const blog = new Blog(request.body);
  const result = await blog.save();
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