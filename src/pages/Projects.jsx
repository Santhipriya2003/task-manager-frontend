import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../config";

function Projects() {

  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const token = localStorage.getItem("token");

  const fetchProjects = async () => {
    try {

      const res = await axios.get(
        `${API_URL}/api/projects`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProjects(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const createProject = async () => {

    try {

      await axios.post(
        `${API_URL}/api/projects/create`,
        {
          name,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Project Created");

      setName("");
      setDescription("");

      fetchProjects();

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>

      <h1>Projects Page</h1>

      <input
        type="text"
        placeholder="Project Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br /><br />

      <button onClick={createProject}>
        Create Project
      </button>

      <hr />

      {projects.map((project) => (

        <div
          key={project.id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            margin: "10px",
          }}
        >

          <h3>{project.name}</h3>

          <p>{project.description}</p>

        </div>
      ))}

    </div>
  );
}

export default Projects;