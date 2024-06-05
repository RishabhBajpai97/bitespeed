import { useNodesState, ReactFlowProvider, Node } from "reactflow";
import FlowBuilder from "./FlowBuilder";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
//Main Component
const Builder = () => {
  const initialNodes: Node<unknown, string | undefined>[] = [];
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  return (
    <div className="flex flex-col w-full h-full overflow-scroll">
      <ReactFlowProvider>
        <TopBar nodes={nodes} />
        <div className="flex w-full">
          <div className="flex-grow">
            <FlowBuilder
              nodes={nodes}
              onNodesChange={onNodesChange}
              setNodes={setNodes}
            />
          </div>
          <div className="w-[20%]">
            <SideBar nodes={nodes} />
          </div>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default Builder;
