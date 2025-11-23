// TaleWeaver frontend - AGPLv3
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { apiFetch } from "../lib/api";
import { GraphCanvas } from "../components/GraphCanvas";
import { NodeListView } from "../components/NodeListView";
import { EditableNode, NodeEditor } from "../components/NodeEditor";
import { Edge, Node } from "reactflow";

interface StoryLink {
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
  label?: string | null;
  orderIndex: number;
}

export default function EditorPage() {
  const { versionId } = useParams();
  const [nodes, setNodes] = useState<EditableNode[]>([]);
  const [links, setLinks] = useState<StoryLink[]>([]);
  const [selectedId, setSelectedId] = useState<string>();

  useEffect(() => {
    if (!versionId) return;
    apiFetch(`/story-versions/${versionId}/nodes`).then((res) => setNodes(res));
    apiFetch(`/story-versions/${versionId}/links`).then((res) => setLinks(res));
  }, [versionId]);

  const flowNodes: Node[] = useMemo(
    () =>
      nodes.map((n) => ({
        id: n.id,
        data: { label: n.title },
        position: { x: (n as any).positionX || 0, y: (n as any).positionY || 0 },
        style: { border: "1px solid #111827", padding: 8, borderRadius: 6, background: "white" }
      })),
    [nodes]
  );

  const flowEdges: Edge[] = useMemo(
    () =>
      links.map((l) => ({ id: l.id, source: l.sourceNodeId, target: l.targetNodeId, label: l.label || undefined, animated: false })),
    [links]
  );

  const selectedNode = nodes.find((n) => n.id === selectedId);

  return (
    <div className="container">
      <h1>Story Editor</h1>
      <GraphCanvas nodes={flowNodes} edges={flowEdges} onNodeSelect={setSelectedId} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "1rem", marginTop: "1rem" }}>
        <NodeListView nodes={nodes.map((n) => ({ id: n.id, title: n.title }))} selectedId={selectedId} onSelect={setSelectedId} />
        <NodeEditor node={selectedNode} onUpdated={(updated) => setNodes(nodes.map((n) => (n.id === updated.id ? updated : n)))} />
      </div>
    </div>
  );
}
