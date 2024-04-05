//import React from "react";

const BlogForm = ({ newBlogForm, handleBlogChange, addform }) => {
  return (
    <form onSubmit={addform}>
      <div>
        Title:
        <input
          type="text"
          value={newBlogForm.title}
          onChange={handleBlogChange}
          name="title"
        />
      </div>
      <div>
        Author:
        <input
          type="text"
          value={newBlogForm.author}
          onChange={handleBlogChange}
          name="author"
        />
      </div>
      <div>
        URL:
        <input
          type="text"
          value={newBlogForm.url}
          onChange={handleBlogChange}
          name="url"
        />
      </div>
      <button type="submit">Create Blog</button>
    </form>
  );
};

export default BlogForm;
