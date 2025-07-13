import { useState } from "react";
import DashboardHeader from "./DashboardHeader";
import axios from "axios";

const NewSnippet = () => {
    const [language, setLanguage] = useState("");
    const [title, setTitle] = useState("");
    const [code, setCode] = useState("");
const [isPublic, setisPublic] = useState(false);
const [message , setMessage] = useState("")
const [showToast, setShowToast] = useState(false);

const createSnippet = async (e) => {
  e.preventDefault(); // Prevent form refresh

  try {
    const res = await axios.post(
      "http://localhost:8000/snippets",
      { title, code, language, isPublic },
      { withCredentials: true }
    );

    setMessage(res.data.message);
    setShowToast(true);

    // Auto-hide toast after 3s
    setTimeout(() => setShowToast(false), 3000);

    // Clear form fields
    setTitle("");
    setCode("");
    setLanguage("");
    setisPublic(false);

  } catch (error) {
    const errMsg = error?.response?.data?.message || "Something went wrong";
    setMessage(errMsg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  }
};

      return ( <div>
        <DashboardHeader />

<div className="new-snippet-container">
  <h2>Create New Snippet</h2>
  {showToast && (
  <div className="toast-message">
    ✅ {message}
  </div>
)}

  <form className="new-snippet-form">
    <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
    <select value={language} onChange={(e) => setLanguage(e.target.value)}>
      <option value="">Select Language</option>
      <option value="javascript">JavaScript</option>
      <option value="python">Python</option>
      <option value="cpp">C++</option>
      <option value="java">Java</option>
      <option value="plaintext">Plaintext</option>
    </select>
    <textarea placeholder="Code" value={code} onChange={(e) => setCode(e.target.value)}></textarea>
<label>
        <input type="checkbox" value={isPublic} onChange={(e) => setisPublic(e.target.checked)}/> Make this snippet public
</label>
    <button type="submit" onClick={createSnippet}>Create Snippet</button>
  </form>
</div>
    </div>
        
    )
}

export default NewSnippet;
