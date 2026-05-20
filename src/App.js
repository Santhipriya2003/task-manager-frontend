import React from "react";

import {BrowserRouter,Routes,Route,Navigate,} from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {

  // ================= GET TOKEN =================

  const token = localStorage.getItem("token");

  return (

    <BrowserRouter>

      <Routes>

        {/* ================= HOME REDIRECT ================= */}

        <Route
          path="/"
          element={
            token
              ? <Navigate to="/dashboard" />
              : <Navigate to="/login" />
          }
        />

        {/* ================= REGISTER ================= */}

        <Route
          path="/register"
          element={<Register />}
        />

        {/* ================= LOGIN ================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        {/* ================= PROTECTED DASHBOARD ================= */}

        <Route
          path="/dashboard"
          element={
            token
              ? <Dashboard />
              : <Navigate to="/login" />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;