import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../config";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // ================= LOGIN =================
  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      "https://task-manager-backend-ovjq.onrender.com/api/auth/login",
      {
        email,
        password,
      }
    );

    localStorage.setItem("token", response.data.token);

    navigate("/dashboard");

  } catch (error) {
    alert("Invalid email or password");
  }
};
  // ================= UI =================
  return (
    <div style={{ maxWidth: "300px", margin: "auto" }}>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <br />
        <br />

        <button type="submit">
          Login
        </button>
      </form>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}
    </div>
  );
}

export default Login;