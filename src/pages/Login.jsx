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

    console.log("LOGIN START");

    const response = await axios.post(
      `${API_URL}/api/auth/login`,
      {
        email,
        password,
      }
    );

    console.log("LOGIN RESPONSE:", response.data);

    // SAVE TOKEN
    localStorage.setItem("token", response.data.token);

    // SAVE ROLE
    localStorage.setItem("role", response.data.role);

    alert("Login Successful");

    navigate("/dashboard");

  } catch (error) {

    console.log("FULL ERROR:", error);

    alert("Login Failed");
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