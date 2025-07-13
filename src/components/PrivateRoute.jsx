import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const PrivateRoute = ({ children }) => {
  const [auth, setAuth] = useState(null); // null = loading, true/false = result

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:8000/profile", {
          withCredentials: true,
        });
       if (res.data?.message?.email) {
  setAuth(true);
} else {
  setAuth(false);
}

      } catch (error) {
        setAuth(false);
        console.log(error);
        
      }
    };

    checkAuth();
  }, []);

  if (auth === null) return <p>Checking login...</p>;

  return auth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
