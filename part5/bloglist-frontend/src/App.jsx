import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [addedMessage, setAddedMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
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

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setCurrentUser(null);
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

  useEffect(() => {
    if (currentUser) {
      blogService.getAll().then((blogs) => setBlogs(blogs));
    }
  }, [currentUser]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      setCurrentUser(user);
      setUsername("");
      setPassword("");
    }
  }, []);

  return (
    <div>
      {currentUser === null ? (
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      ) : (
        <div>
          {addedMessage && <Notification message={addedMessage} />}
          {errorMessage && <Notification errorMessage={errorMessage} />}
          <h2>blogs</h2>
          <BlogForm
            newBlogForm={newBlogForm}
            handleBlogChange={handleBlogChange}
            addform={addform}
          />
          <p>Welcome, {currentUser.username}!</p>
          <button onClick={handleLogout}>Logout</button>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;

/*import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  //const [errorMessage, setErrorMessage] = useState(null);
  const [addedMessage, setAddedMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
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

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setCurrentUser(null);
  };

  const loginForm = () => {
    return (
      <div>
        <h2>log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
              autoComplete="username"
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
              autoComplete="current-password"
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
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

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      setCurrentUser(user);
      setUsername("");
      setPassword("");
    }
  }, []);

  return (
    <div>
      {currentUser === null ? (
        loginForm()
      ) : (
        <div>
          {addedMessage && <Notification message={addedMessage} />}
          {errorMessage && <Notification errorMessage={errorMessage} />}
          <h2>blogs</h2>
          {blogForm()}
          <p>Welcome, {currentUser.username}!</p>
          <button onClick={handleLogout}>Logout</button>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
*/
