// src/components/PublicSnippet.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PublicSnippet = () => {
  const { id } = useParams();
  const [snippet, setSnippet] = useState(null);
  const [message, setMessage] = useState("Loading...");

  const fetchSnippet = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/snippets/public/${id}`);
      setSnippet(res.data.snippet);
      setMessage("");
    } catch (error) {
      setMessage(error.response?.data?.message || "Snippet not found or it is private.");
    }
  };

  useEffect(() => {
    fetchSnippet();
  }, [id]);

  return (
    <div className="public-snippet-container">
      {message && <p className="public-snippet-message">{message}</p>}
      {snippet && (
        <div className="public-snippet-card">
          <h2>{snippet.title}</h2>
          <p><strong>Language:</strong> {snippet.language}</p>
          <pre className="snippet-code">{snippet.code}</pre>
        </div>
      )}
    </div>
  );
};

export default PublicSnippet;
