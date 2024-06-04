import { ChatCircleText, WhatsappLogo } from "@phosphor-icons/react";
import { UserSound } from "@phosphor-icons/react/dist/ssr";
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
  Handle,
  Edge,
  Position,
  Node,
  OnNodesChange,
  Connection,
  BackgroundVariant,
} from "reactflow";

import "reactflow/dist/style.css";
import { Data } from "../types/types";
import { useStore } from "../store/store";

const initialEdges: Edge[] = [];

// Custom node component
const CustomNode = ({ data }: { data: Data }) => {
  const renderNode = () => {
    if (data.label == "") {
      switch (data.interactionType) {
        case "message":
          return "Text Node";
        case "voice":
          return "Voice Node";
      }
    } else {
      return data.label;
    }
  };
  return (
    <div
      className={`rounded-lg shadow-2xl border-2 bg-white w-64 ${
        data.selected ? "border-violet-600" : ""
      }`}
    >
      <div className="rounded-t-lg py-2 bg-green-200 px-1 flex justify-between items-center">
        <div className="flex items-center">
          {data.interactionType === "message" ? (
            <ChatCircleText size={16} />
          ) : (
            <UserSound size={16} />
          )}
          <b className="text-sm ml-2">
            {data.interactionType === "message" ? "Send Message" : "Send Audio"}
          </b>
        </div>
        <div>
          <WhatsappLogo size={16} color="#3aa15e" weight="fill" />
        </div>
      </div>
      <div className="rounded-b-lg text-start ml-1 py-2">
        {/* {data.label == "" ? "Text Node" : data.label} */}
        {renderNode()}
      </div>
      <Handle
        type="target"
        position={Position.Left}
        id={data.handles[0]}
        style={{
          width: "10px",
          height: "10px",
          backgroundColor: "black",
          borderRadius: "50%",
          border: "2px solid white",
        }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id={data.handles[1]}
        style={{
          width: "10px",
          height: "10px",
          backgroundColor: "black",
          borderRadius: "50%",
          border: "2px solid white",
        }}
      />
    </div>
  );
};

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
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [connectedSources, setConnectedSources] = useState([]);
  const setBackButton = useStore((state) => state.setBackButton);
  const setInteractionType = useStore((state) => state.setInteractionType);

  const onConnect = useCallback(
    (params: Edge | Connection) => {
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

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("application/json"));
    setNodes((nodes) => [
      ...nodes,
      {
        id: Date.now().toString(),
        position: {
          x: e.clientX - window.innerWidth * 0.05,
          y: e.clientY - window.innerHeight * 0.14,
        },
        data: {
          label: "",
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
      className="flex-grow overflow-auto h-screen"
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
