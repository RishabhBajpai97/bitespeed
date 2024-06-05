import {
  Dispatch,
  DragEvent,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import ReactFlow, {
  Background,
  useEdgesState,
  addEdge,
  Edge,
  Node,
  OnNodesChange,
  Connection,
  BackgroundVariant,
} from "reactflow";

import "reactflow/dist/style.css";
import { useStore } from "../store/store";
import CustomNode from "./CustomNode";

// Custom node component

const nodeTypes = {
  customNode: CustomNode,
};

const FlowBuilder = ({
  nodes,
  onNodesChange,
  setNodes,
}: {
  nodes: Node[];
  onNodesChange: OnNodesChange;
  setNodes: Dispatch<SetStateAction<Node<unknown, string | undefined>[]>>;
}) => {
  const initialEdges: Edge[] = [];

  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [connectedSources, setConnectedSources] = useState([]);

  const setBackButton = useStore((state) => state.setBackButton);
  const setInteractionType = useStore((state) => state.setInteractionType);

  //handles node connection event

  const onConnect = useCallback(
    (params: Edge | Connection) => {
      //below logic checks whether there is already an edge created from this source
      // If it has been created then do nothing. Otherwise add data to edges.
      const source = params.source;
      const isSourceConnected = connectedSources.includes(source as never);

      if (isSourceConnected) {
        return;
      }

      setEdges((eds) => addEdge(params, eds));
      setConnectedSources([...connectedSources, source] as never[]);
    },
    [setEdges, connectedSources]
  );

  //handle click on nodes

  const handleNodeClick = (_: unknown, node: Node) => {
    setNodes((nodes) => {
      return nodes.map((n) => ({
        ...n,
        data: {
          ...(n.data as object),
          selected: n.id === node.id,
        },
      }));
    });
    setBackButton(false);
    setInteractionType(node.data.interactionType);
  };

  //handles drop element in builder region

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("application/json"));
    // Adds a new node with default label
    setNodes((nodes) => [
      ...nodes,
      {
        id: Date.now().toString(),
        position: {
          x: e.clientX - window.innerWidth * 0.05,
          y: e.clientY - window.innerHeight * 0.14,
        },
        data: {
          label: data["type"]==="message"?"Text Node":"Voice Node",
          handles: [`${Date.now().toString()}a`, `${Date.now().toString()}b`],
          initialNode: nodes.length === 0 ? true : false,
          interactionType: data["type"],
          selected: false,
        },
        type: "customNode", // specify custom node type
      },
    ]);
  };

  return (
    <div
      className="flex-grow h-screen"
      onDrop={handleDrop}
      onDragOver={(event) => event.preventDefault()}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onNodeClick={handleNodeClick}
      >
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default FlowBuilder;
