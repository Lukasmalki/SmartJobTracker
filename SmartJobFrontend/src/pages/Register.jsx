import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import InfoPanel from "../components/InfoPanel";
import "../styles/register.css";
const API_URL = import.meta.env.VITE_API_URL;

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (username.length < 3) {
      setError("Username must be at least 3 characters.");
      return false;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setError("Username can only contain letters, numbers and underscores.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email.");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!validate()) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email: email.toLowerCase(),
          password,
        }),
      });

      if (!res.ok) {
        const message = await res.text();
        if (message === "USERNAME_TAKEN") {
          setError("Username is already taken");
        } else {
          setError("Email already taken.");
        }
        setLoading(false);
        return;
      }

      const data = await res.json();
      login(data.token, { email: data.email, username: data.username });
      navigate("/dashboard");
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <InfoPanel
          textInfo="Start tracking your applications today."
          ulItems={[
            "Never lose track of an opportunity",
            "Stay organized through every step",
            "Land your next job faster",
          ]}
        />

        <div className="register-form-container">
          <form className="register-form" onSubmit={handleSubmit}>
            <h2>Create an account</h2>
            {error && <p>{error}</p>}
            <label>Username</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="register-btn" type="submit" disabled={loading}>
              {loading ? "Creating your account..." : "Register"}
            </button>
          </form>

          <p className="accountinfo">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
