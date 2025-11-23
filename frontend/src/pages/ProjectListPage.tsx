// TaleWeaver frontend - AGPLv3
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "../lib/api";

interface Project {
  id: string;
  name: string;
  description: string;
}

export default function ProjectListPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    apiFetch("/projects")
      .then(setProjects)
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container">
      <h1>Projects</h1>
      {projects.map((p) => (
        <div className="card" key={p.id}>
          <h3>{p.name}</h3>
          <p>{p.description}</p>
          <Link to={`/projects/${p.id}`}>Story Versions</Link>
        </div>
      ))}
    </div>
  );
}
