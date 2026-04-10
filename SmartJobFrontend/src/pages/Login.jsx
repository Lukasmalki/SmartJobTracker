import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "../styles/login.css";
import InfoPanel from "../components/InfoPanel";
const API_URL = import.meta.env.VITE_API_URL;

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.toLowerCase(), password }),
      });

      if (!res.ok) {
        setError("Fel email eller lösenord.");
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
    <div className="login-page">
      <div className="login-container">
        <InfoPanel
          textInfo={
            <>
              Keep all your job <br /> applications <br /> organized in one
              place.
            </>
          }
          ulItems={[
            "Track application status",
            "Add notes and follow-ups",
            "Never miss an opportunity",
          ]}
        />

        <div className="login-form-container">
          <form className="login-form" onSubmit={handleSubmit}>
            <h2>Welcome back</h2>
            {error && <p>{error}</p>}
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
            <button className="signin-btn" type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="noaccount-info">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
