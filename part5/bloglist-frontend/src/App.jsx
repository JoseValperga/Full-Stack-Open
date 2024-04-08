import { useState, useEffect, useCallback } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
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

  const handleLogout = useCallback(() => {
    window.localStorage.removeItem("loggedBlogappUser");
    setCurrentUser(null);
  }, []);

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
      {errorMessage && <Notification errorMessage={errorMessage} />}
      {currentUser === null ? (
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          setCurrentUser={setCurrentUser}
          setErrorMessage={setErrorMessage}
        />
      ) : (
        <div>
          {addedMessage && <Notification message={addedMessage} />}     
          <h2>blogs</h2>
          <BlogForm
            newBlogForm={newBlogForm}
            setNewBlogForm={setNewBlogForm}
            blogs={blogs}
            setBlogs={setBlogs}
            setErrorMessage={setErrorMessage}
            setAddedMessage={setAddedMessage}
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
