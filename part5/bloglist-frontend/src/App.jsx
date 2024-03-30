import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [newBlogForm, setNewBlogForm] = useState({
    title: "",
    author: "",
    url: "",
  });

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      blogService.setToken(user.token)
      setCurrentUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    );
  };

  const handleBlogChange = (event) => {
    const whoFiredEvent = event.target.name;
    const valueEvent = event.target.value;
    setNewBlogForm({ ...newBlogForm, [whoFiredEvent]: valueEvent });
  };

  const addform = async (event) => {
    event.preventDefault();
    const newBlog = await blogService.create(newBlogForm);
    setBlogs([...blogs, newBlog]);
    setNewBlogForm({ title: "", author: "", url: "" });
  };

  const blogForm = () => {
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

  useEffect(() => {
    if (currentUser) {
      blogService.getAll().then((blogs) => setBlogs(blogs));
    }
  }, [currentUser]);

  return (
    <div>
      <h2>blogs</h2>
      {currentUser === null ? (
        loginForm()
      ) : (
        <div>
          {blogForm()}
          <p>Welcome, {currentUser.username}!</p>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default App;
