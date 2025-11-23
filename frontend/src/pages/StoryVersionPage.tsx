// TaleWeaver frontend - AGPLv3
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiFetch } from "../lib/api";

interface StoryVersion {
  id: string;
  name: string;
  description: string;
}

export default function StoryVersionPage() {
  const { projectId } = useParams();
  const [versions, setVersions] = useState<StoryVersion[]>([]);

  useEffect(() => {
    if (!projectId) return;
    apiFetch(`/projects/${projectId}/story-versions`)
      .then(setVersions)
      .catch((err) => console.error(err));
  }, [projectId]);

  return (
    <div className="container">
      <h1>Story Versions</h1>
      {versions.map((v) => (
        <div className="card" key={v.id}>
          <h3>{v.name}</h3>
          <p>{v.description}</p>
          <Link to={`/editor/${v.id}`}>Open Editor</Link> · <Link to={`/play/${v.id}`}>Play</Link>
        </div>
      ))}
    </div>
  );
}
