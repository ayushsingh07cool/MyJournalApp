import "./Signup.css";
import { useState } from "react";
import API from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import { FiUser, FiLock } from "react-icons/fi";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    setMessage("");

    try {
      await API.post("/public/signup", {
        userName,
        password,
      });

      setMessage("Signup Successful");
      setIsError(false);

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      setIsError(true);

      if (error.response?.status === 409) {
        setMessage(error.response.data);
      } else {
        setMessage("Signup Failed");
      }
    }
  };

  const loginNavigate = () => {
    navigate("/login");
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSignup}>
        <h2>Create Account</h2>

        {message && (
          <div className={`message ${isError ? "error" : "success"}`}>
            {message}
          </div>
        )}

        
<div className="input-group">
  <FiUser className="input-icon" />
  <input
    type="text"
    placeholder="Username"
    value={userName}
    onChange={(e) => setUserName(e.target.value)}
  />
</div>

<div className="input-group">
  <FiLock className="input-icon" />
  <input
    type="password"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
</div>

        <button type="submit">Signup</button>
        <p className="login-text">
          Already have an account?
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
