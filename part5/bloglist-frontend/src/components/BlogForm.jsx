import blogService from "../services/blogs";

const BlogForm = ({
  newBlogForm,
  setNewBlogForm,
  blogs,
  setBlogs,
  setErrorMessage,
  setAddedMessage,
}) => {
  const handleBlogChange = (event) => {
    const whoFiredEvent = event.target.name;
    const valueEvent = event.target.value;
    setNewBlogForm({ ...newBlogForm, [whoFiredEvent]: valueEvent });
  };

  const addform = async (event) => {
    event.preventDefault();
    try {
      const newBlog = await blogService.create(newBlogForm);

      setAddedMessage(
        `Blog '${newBlog.title}' by ${newBlog.author} was added`
      );
      setTimeout(() => {
        setAddedMessage(null);
      }, 5000)
      
      setBlogs([...blogs, newBlog]);
      setNewBlogForm({ title: "", author: "", url: "" });
    } catch (error) {
      setErrorMessage(error.response.data.error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

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
