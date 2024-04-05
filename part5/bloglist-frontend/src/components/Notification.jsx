const Notification = ({ message, errorMessage }) => {
    if (message === null && errorMessage === null) {
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
  