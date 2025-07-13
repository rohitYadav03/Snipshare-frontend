import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const DashboardHeader = () => {
   const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/logout`, {}, {
        withCredentials: true 
      });
      console.log(res.data.message); 
      navigate("/")
    } catch (error) {
      console.error("Logout error:", error.response?.data?.message || error.message);
    }
  };

  return (
    <header className="dashboard-header">
      <div className="dashboard-logo">
        <img src={logo} alt="SnipShare Logo" />
        <span className="dashboard-brand">SnipShare</span>
      </div>

      <nav className="dashboard-nav">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/snippets">My Snippets</Link>
        <Link to="/snippets/new">New Snippet</Link>
        <Link to="/profile/edit">Edit Profile</Link>
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </header>
  );
};

export default DashboardHeader;
