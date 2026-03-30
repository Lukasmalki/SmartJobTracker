import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    if (!res.ok) {
      setError("Email redan registrerad.");
      return;
    }

    const data = await res.json();
    login(data.token, { email: data.email });
    navigate("/dashboard");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Registrera</h1>
        {error && <p>{error}</p>}
        <input
          type="text"
          placeholder="Användarnamn"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Lösenord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Registrera</button>
      </form>

      <p>Har du inget konto? Registrera dig här</p>
      <Link to="/register">Skapa konto</Link>
    </div>
  );
}
