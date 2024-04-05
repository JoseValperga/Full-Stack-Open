const Notification = ({ message, errorMessage }) => {
  if (!message && !errorMessage) {
    return null;
  }

  return (
    <div className="notification">
      {message && <div className="added">{message}</div>}
      {errorMessage && <div className="error">{errorMessage}</div>}
    </div>
  );
};

export default Notification;
