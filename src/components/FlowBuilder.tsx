import { ChatCircleText, WhatsappLogo } from "@phosphor-icons/react";
import { UserSound } from "@phosphor-icons/react/dist/ssr";
import { useCallback } from "react";
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

const initialEdges: Edge[] = [];

// Custom node component
const CustomNode = ({ data }: { data: Data }) => {
  return (
    <div className="rounded-lg shadow-2xl bg-white w-64">
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
      <div className="rounded-b-lg text-center py-2">{data.label}</div>
      <Handle
        type="target"
        className={data.initialNode === true ? "hidden" : "block"}
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
}: {
  nodes: Node[];
  onNodesChange: OnNodesChange;
}) => {
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Edge | Connection) => {
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );

  return (
    <div className="flex-grow overflow-auto h-screen">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      >
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default FlowBuilder;
