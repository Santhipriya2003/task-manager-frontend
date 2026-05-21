import React from "react";

function Tasks() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Task Management</h1>

      <button>Create Task</button>

      <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Assigned To</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Complete README</td>
            <td>In Progress</td>
            <td>High</td>
            <td>Admin</td>
          </tr>

          <tr>
            <td>Fix Login API</td>
            <td>Done</td>
            <td>Medium</td>
            <td>Member</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Tasks;