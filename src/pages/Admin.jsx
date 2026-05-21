import React from "react";

function Admin() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Panel</h1>

      <h3>Manage Users</h3>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Admin User</td>
            <td>ADMIN</td>
            <td>
              <button>Delete</button>
            </td>
          </tr>

          <tr>
            <td>Member User</td>
            <td>MEMBER</td>
            <td>
              <button>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Admin;