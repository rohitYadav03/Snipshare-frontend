import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="notfound-container">
      <h1>404</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/dashboard" className="notfound-link">Go back to Dashboard</Link>
    </div>
  );
};

export default NotFound;
