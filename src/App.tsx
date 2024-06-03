import { Node, useNodesState } from "reactflow";
import FlowBuilder from "./components/FlowBuilder";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";

const initialNodes: Node[] = [];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

  return (
    <div className="flex flex-col w-full h-full overflow-scroll">
      <TopBar />
      <div className="flex w-full">
        <div className="flex-grow overflow-auto">
          <FlowBuilder
            nodes={nodes}
            onNodesChange={onNodesChange}
          />
        </div>
        <div className="w-[20%]">
          <SideBar setNodesHandler={setNodes} nodes={nodes} />
        </div>
      </div>
    </div>
  );
}
