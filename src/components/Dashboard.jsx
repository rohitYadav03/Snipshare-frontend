import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DashboardHeader from "./DashboardHeader";
import Footer from "../components/Footer";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:8000/profile", {
          withCredentials: true,
        });
        console.log(res);
        
        setUser(res.data.message);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="dashboard-container">
      <DashboardHeader />

      <div className="dashboard-welcome">
        <h2>Welcome back{user ? `, ${user.name}` : ""} 👋</h2>
        <Link to="/snippets/new" className="dashboard-new-btn">
          ➕ Create New Snippet
        </Link>
      </div>

      <div className="dashboard-preview">
        <h3>Your Snippets</h3>
        <p className="dashboard-preview-placeholder">You haven’t created any snippets yet.</p>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
