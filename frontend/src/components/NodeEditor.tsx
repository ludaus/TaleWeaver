// TaleWeaver frontend - AGPLv3
import { useState, useEffect } from "react";
import { apiFetch } from "../lib/api";

export interface EditableNode {
  id: string;
  storyVersionId: string;
  title: string;
  nodeType: string;
  textBlocks: { id: string; htmlContent: string; displayMode: string }[];
}

interface NodeEditorProps {
  node?: EditableNode;
  onUpdated: (node: EditableNode) => void;
}

export function NodeEditor({ node, onUpdated }: NodeEditorProps) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    setTitle(node?.title || "");
    setText(node?.textBlocks?.[0]?.htmlContent || "");
  }, [node]);

  if (!node) return <div className="card">Select a node to edit</div>;

  const save = async () => {
    const payload = { ...node, title, textBlocks: [{ id: node.textBlocks[0]?.id || node.id, htmlContent: text, displayMode: "onEnter" }] };
    const updated = await apiFetch(`/story-versions/${node.storyVersionId}/nodes/${node.id}`, { method: "PUT", body: JSON.stringify(payload) });
    onUpdated(updated);
  };

  return (
    <div className="card">
      <h3>Node Editor</h3>
      <label>Title</label>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <label>Text (HTML)</label>
      <textarea rows={6} value={text} onChange={(e) => setText(e.target.value)} />
      <button className="button" onClick={save}>Save</button>
    </div>
  );
}
