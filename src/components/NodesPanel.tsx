import { nodeItemData } from "../data/data";
import NodeItem from "./NodeItem";

//Nodes panel component that can display different types of nodes

const NodesPanel = () => {
  return (
    <div className="pt-3 px-3  h-screen border-l-2">
      <div className="grid grid-cols-1 gap-y-3 md:grid-cols-2 md:gap-x-3">
        {nodeItemData.map((item) => {
          return <NodeItem key={item.type} item={item} />;
        })}
      </div>
    </div>
  );
};

export default NodesPanel;
