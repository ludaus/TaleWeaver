// TaleWeaver frontend - AGPLv3
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { apiFetch } from "../lib/api";

interface StoryNode {
  id: string;
  title: string;
  textBlocks: { id: string; htmlContent: string; displayMode: string }[];
  outgoingLinks: { id: string; targetNodeId: string; label?: string | null; orderIndex: number }[];
}

export default function PlayerPage() {
  const { versionId } = useParams();
  const [nodes, setNodes] = useState<StoryNode[]>([]);
  const [currentId, setCurrentId] = useState<string | null>(null);

  useEffect(() => {
    if (!versionId) return;
    apiFetch(`/player/story/${versionId}`).then((data) => {
      setNodes(data.nodes);
      setCurrentId(data.nodes.find((n: any) => n.nodeType === "ROOT")?.id || data.nodes[0]?.id || null);
    });
  }, [versionId]);

  const current = useMemo(() => nodes.find((n) => n.id === currentId), [nodes, currentId]);
  const nextLinks = useMemo(
    () => current?.outgoingLinks.sort((a, b) => a.orderIndex - b.orderIndex) || [],
    [current]
  );

  return (
    <div className="container">
      <h1>Story Player</h1>
      {current ? (
        <div className="card">
          <h2>{current.title}</h2>
          {current.textBlocks.map((block) => (
            <div key={block.id} dangerouslySetInnerHTML={{ __html: block.htmlContent }} />
          ))}
          <div style={{ marginTop: "1rem" }}>
            {nextLinks.map((link) => (
              <button key={link.id} className="button" style={{ marginRight: "0.5rem", marginBottom: "0.5rem" }} onClick={() => setCurrentId(link.targetNodeId)}>
                {link.label || "Continue"}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading story...</p>
      )}
    </div>
  );
}
