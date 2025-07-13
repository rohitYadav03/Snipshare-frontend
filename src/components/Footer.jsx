import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </div>
      <p className="footer-text">
        © {new Date().getFullYear()} SnipShare. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
