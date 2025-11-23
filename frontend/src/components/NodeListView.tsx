// TaleWeaver frontend - AGPLv3
interface NodeListViewProps {
  nodes: { id: string; title: string }[];
  selectedId?: string;
  onSelect: (id: string) => void;
}

export function NodeListView({ nodes, selectedId, onSelect }: NodeListViewProps) {
  return (
    <div className="card">
      <h3>Nodes</h3>
      <ul>
        {nodes.map((n) => (
          <li key={n.id}>
            <button className="button secondary" style={{ width: "100%", marginBottom: "0.5rem", background: selectedId === n.id ? "#2563eb" : "#6b7280" }} onClick={() => onSelect(n.id)}>
              {n.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
