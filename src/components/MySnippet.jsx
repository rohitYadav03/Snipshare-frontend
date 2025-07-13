import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";

const MySnippets = () => {
  const [mySnippet, setMySnippet] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSnippet = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/snippets`, {
        withCredentials: true,
      });
      setMySnippet(res.data.snippets || []);
    } catch (error) {
      console.log(error.response?.data?.message || "Failed to load snippets");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this snippet?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/snippets/${id}`, {
        withCredentials: true,
      });
      setMySnippet(mySnippet.filter((s) => s._id !== id));
    } catch (error) {
      console.error("Delete failed:", error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    getSnippet();
  }, []);

  return (
    <>
      <DashboardHeader />

      <div className="snippets-container">
        <h2>My Snippets</h2>

        {loading ? (
          <p>Loading...</p>
        ) : mySnippet.length === 0 ? (
          <p>You haven’t created any snippets yet.</p>
        ) : (
          mySnippet.map((curSnippet) => (
            <div className="snippet-card" key={curSnippet._id}>
              <div className="snippet-info">
                <Link to={`/snippets/${curSnippet._id}`} className="snippet-title-link">
                  <h3>{curSnippet.title}</h3>
                </Link>
                <p>Language: {curSnippet.language}</p>
                <pre>{curSnippet.code.slice(0, 100)}...</pre>
              </div>

              <div className="snippet-actions">
                <Link to={`/snippets/${curSnippet._id}/edit`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => handleDelete(curSnippet._id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default MySnippets;
