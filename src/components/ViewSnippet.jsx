import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DashboardHeader from "./DashboardHeader";

const ViewSnippet = () => {
  const { id } = useParams();
  const [snippet, setSnippet] = useState(null);
  const [loading, setLoading] = useState(true);

  const getSnippet = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/snippets/${id}`, {
        withCredentials: true,
      });
      setSnippet(res.data.snippet);
    } catch (error) {
      console.error(error.response?.data?.message || "Failed to load snippet");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSnippet();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!snippet) return <p>Snippet not found.</p>;

  return (
    <>
      <DashboardHeader />
      <div className="snippet-view-container">
        <h2>{snippet.title}</h2>
        <p>
          <strong>Language:</strong> {snippet.language}
        </p>
        <p>
          <strong>Visibility:</strong> {snippet.isPublic ? "Public" : "Private"}
        </p>
        <pre className="snippet-code-block">{snippet.code}</pre>
      </div>
    </>
  );
};

export default ViewSnippet;
