import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../config";

function Dashboard() {

  const navigate = useNavigate();

  // ================= STATES =================

  const [tasks, setTasks] = useState([]);

  const [role, setRole] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [dueDate, setDueDate] = useState("");

  const [priority, setPriority] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  // ================= INIT =================

  useEffect(() => {

    const savedRole = localStorage.getItem("role");

    if (!token) {
      navigate("/login");
      return;
    }

    setRole(savedRole);

    fetchTasks();

  }, []);

  // ================= FETCH TASKS =================

  const fetchTasks = async () => {

    try {

      setLoading(true);

      const res = await axios.get(
        "http://localhost:8080/api/tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      

      setTasks(res.data);

      setError("");

    } catch (err) {

      

      setError("Failed to load tasks");

    } finally {

      setLoading(false);
    }
  };

  // ================= CREATE TASK =================

  const createTask = async () => {

    if (
      !title ||
      !description ||
      !dueDate ||
      !priority
    ) {
      alert("Please fill all fields");
      return;
    }

    try {

      const res = await axios.post(
        "http://localhost:8080/api/tasks",
        {
          title,
          description,
          dueDate,
          priority,
          status: "TODO",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks([...tasks, res.data]);

      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("");

      alert("Task Created");

    } catch (err) {

      

      setError("Task creation failed");
    }
  };

  // ================= DELETE TASK =================

  const deleteTask = async (id) => {

    try {

      await axios.delete(
        `http://localhost:8080/api/tasks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks(
        tasks.filter((task) => task.id !== id)
      );

      alert("Task Deleted");

    } catch (err) {

      

      setError("Delete failed");
    }
  };

  // ================= UPDATE STATUS =================

  const updateStatus = async (id, status) => {

    try {

      const res = await axios.put(
        `http://localhost:8080/api/tasks/${id}`,
        {
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks(
        tasks.map((task) =>
          task.id === id ? res.data : task
        )
      );

    } catch (err) {

    

      setError("Status update failed");
    }
  };

  // ================= LOGOUT =================

  const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("role");

    navigate("/login");
  };

  // ================= UI =================

  return (

    <div style={{ padding: "20px" }}>

      <h1>Team Task Dashboard</h1>

      <p>
        Logged in as: <b>{role}</b>
      </p>

      <button
        onClick={logout}
        style={{
          background: "red",
          color: "white",
          padding: "8px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Logout
      </button>

      <hr />

      {/* ================= DASHBOARD STATS ================= */}

      <h3>Total Tasks: {tasks.length}</h3>

      <h3>
        Completed Tasks: {
          tasks.filter(
            (t) => t.status === "DONE"
          ).length
        }
      </h3>

      <h3>
        Pending Tasks: {
          tasks.filter(
            (t) => t.status === "TODO"
          ).length
        }
      </h3>

      <h3>
        In Progress Tasks: {
          tasks.filter(
            (t) => t.status === "IN_PROGRESS"
          ).length
        }
      </h3>

      <h3>
        Overdue Tasks: {
          tasks.filter(
            (t) =>
              t.dueDate &&
              new Date(t.dueDate) < new Date() &&
              t.status !== "DONE"
          ).length
        }
      </h3>

      <hr />

      {/* ================= ADMIN CREATE TASK ================= */}

      {role === "ADMIN" && (

        <div style={{ marginBottom: "20px" }}>

          <h2>Create Task</h2>

          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            style={{
              padding: "8px",
              width: "300px",
            }}
          />

          <br />
          <br />

          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            style={{
              padding: "8px",
              width: "300px",
              height: "100px",
            }}
          />

          <br />
          <br />

          <input
            type="date"
            value={dueDate}
            onChange={(e) =>
              setDueDate(e.target.value)
            }
          />

          <br />
          <br />

          <select
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value)
            }
          >
            <option value="">
              Select Priority
            </option>

            <option value="LOW">
              LOW
            </option>

            <option value="MEDIUM">
              MEDIUM
            </option>

            <option value="HIGH">
              HIGH
            </option>
          </select>

          <br />
          <br />

          <button
            onClick={createTask}
            style={{
              background: "green",
              color: "white",
              padding: "10px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Create Task
          </button>

        </div>
      )}

      {/* ================= ERROR ================= */}

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      {/* ================= TASK LIST ================= */}

      <h2>Tasks</h2>

      {loading ? (

        <p>Loading...</p>

      ) : (

        tasks.map((task) => (

          <div
            key={task.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "5px",
            }}
          >

            <h3>{task.title}</h3>

            <p>{task.description}</p>

            <p>
              <b>Status:</b> {task.status}
            </p>

            <p>
              <b>Priority:</b> {task.priority}
            </p>

            <p>
              <b>Due Date:</b> {task.dueDate}
            </p>

            {/* ================= UPDATE STATUS ================= */}

            {(role === "ADMIN" ||
              role === "EDITOR" ||
              role === "MEMBER") && (

              <select
                value={task.status}
                onChange={(e) =>
                  updateStatus(
                    task.id,
                    e.target.value
                  )
                }
                style={{
                  padding: "5px",
                }}
              >

                <option value="TODO">
                  TODO
                </option>

                <option value="IN_PROGRESS">
                  IN PROGRESS
                </option>

                <option value="DONE">
                  DONE
                </option>

              </select>
            )}

            {/* ================= DELETE TASK ================= */}

            {role === "ADMIN" && (

              <button
                onClick={() =>
                  deleteTask(task.id)
                }
                style={{
                  marginLeft: "10px",
                  background: "black",
                  color: "white",
                  padding: "8px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            )}

          </div>
        ))
      )}

    </div>
  );
}

export default Dashboard;