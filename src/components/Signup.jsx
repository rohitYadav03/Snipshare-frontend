import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
const navigate = useNavigate();

const handleSignup = async() => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/signup`, {name , email, password}, {
    withCredentials : true
})

setMessage(res.data.message)
navigate("/login")
} catch (error) {
    console.log(error);
    
   if(error.response.data.message){
    setMessage(error.response.data.message)
   }
   else{
    setMessage("Something went wrong")
   }
}
}


    return (
      <div className="signup-container">

  <h2 className="signup-heading">Create an account</h2>
  <p className="signup-subheading">
    Join SnipShare to manage and secure your code snippets
  </p>

  <div className="signup-input">
    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your Name" />
    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your Email" />
    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your Password" />
  </div>

  <button className="signup-button" onClick={handleSignup}>Signup</button>

  {message && <p className="auth-message">{message}</p>}

  <p className="signup-footer-text">
    Already have an account? <Link to="/login">Login</Link>
  </p>

</div>

    )
}

export default Signup;