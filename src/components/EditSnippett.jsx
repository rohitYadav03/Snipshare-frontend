import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import axios from "axios";

const EditSnippet = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [snippet, setSnippet] = useState(null);
  const [message, setMessage] = useState("");

  const fetchSnippet = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/snippets/${id}`, {
        withCredentials: true,
      });
      setSnippet(res.data.snippet);
    } catch (error) {
      setMessage("Failed to load snippet for editing.");
    }
  };

  useEffect(() => {
    fetchSnippet();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        `http://localhost:8000/snippets/${id}`,
        {
          title: snippet.title,
          code: snippet.code,
          language: snippet.language,
          isPublic: snippet.isPublic,
        },
        { withCredentials: true }
      );
      setMessage("Snippet updated successfully!");
      setTimeout(() => navigate("/dashboard"), 400);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to update snippet");
    }
  };

  if (!snippet) return <p>Loading snippet...</p>;

  return (
    <div>
      <DashboardHeader />
      <div className="new-snippet-container">
        <h2>Edit Snippet</h2>
        <form className="new-snippet-form" onSubmit={handleUpdate}>
          <input
            type="text"
            value={snippet.title}
            onChange={(e) => setSnippet({ ...snippet, title: e.target.value })}
            placeholder="Title"
            required
          />

          <select
            value={snippet.language}
            onChange={(e) => setSnippet({ ...snippet, language: e.target.value })}
          >
            <option value="">Select Language</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="plaintext">Plaintext</option>
          </select>

          <textarea
            value={snippet.code}
            onChange={(e) => setSnippet({ ...snippet, code: e.target.value })}
            placeholder="Code"
            required
          />

          <label>
            <input
              type="checkbox"
              checked={snippet.isPublic}
              onChange={(e) => setSnippet({ ...snippet, isPublic: e.target.checked })}
            />
            Make this snippet public
          </label>

          <button type="submit">Update Snippet</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    
    </div>
  );
};

export default EditSnippet;
