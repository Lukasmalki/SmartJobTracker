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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

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
        setError("Email redan registrerad.");
        return;
      }

      const data = await res.json();
      login(data.token, { email: data.email, username: data.username });
      navigate("/dashboard");
    } catch (err) {
      setError("Något gick fel");
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
