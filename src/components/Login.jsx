import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";


const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [redirect , setRedirect] = useState(false)

  const handleLogin = async () => {
    try {
      // TODO: Connect to backend later
      if (!email || !password) {
        setMessage("Please enter both email and password");
        return;
      }

      const res = await axios.post("http://localhost:8000/auth/login", {email, password}, {withCredentials : true})
console.log(res);

      setMessage( res.data.message||"Login successful ");
setTimeout(() => {
  setRedirect(true);
}, 300); // ⏳ short delay so cookie is set before PrivateRoute checks


    } catch (error) {
        console.log(`error : ${error}`);
        
     if (error.response && error.response.data && error.response.data.message) {
      setMessage(error.response.data.message);
    } else {
      setMessage("Something went wrong");
    }
    console.error(error);

      
    }
  };

if (redirect) return <Navigate to="/dashboard" />;

  return (
    <main className="auth-container">
      <div className="auth-box">
        <h2>Welcome Back 👋</h2>
        <p>Login to manage your snippets</p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>

<p className="auth-message" style={{ color: 'red' }}>
  {message}
</p>

        <p>
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
