// TaleWeaver frontend - AGPLv3
import ReactFlow, { Background, Controls, Edge, Node } from "reactflow";
import "reactflow/dist/style.css";

interface GraphCanvasProps {
  nodes: Node[];
  edges: Edge[];
  onNodeSelect: (id: string) => void;
}

export function GraphCanvas({ nodes, edges, onNodeSelect }: GraphCanvasProps) {
  return (
    <div style={{ height: "400px", background: "#f3f4f6" }}>
      <ReactFlow nodes={nodes} edges={edges} onNodeClick={(_, node) => onNodeSelect(node.id)} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
