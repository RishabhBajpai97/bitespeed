import { Node, useReactFlow, getOutgoers, getIncomers, Edge } from "reactflow";
import toast from "react-hot-toast";
import CustomButton from "./CustomButton";
import { MouseEventHandler } from "react";

const TopBar = ({ nodes }: { nodes: Node[] }) => {
  const { getEdges } = useReactFlow();

  const handleSaveToStorage = (nodes: Node[], edges: Edge[]) => {
    localStorage.setItem(
      Date.now().toString(),
      JSON.stringify({ nodes: nodes, edges: edges })
    );
    toast.success("Saved Successfully");
  };

  const handleSave: MouseEventHandler = () => {
    const edges = getEdges();
    if (nodes.length === 0 || nodes === undefined) {
      toast.error("Empty Flow");
      return;
    }
    if (nodes.length === 1) {
      handleSaveToStorage(nodes, edges);
      return;
    }
    //checks for the nodes which are not connected using outgoers and incomers
    // As there can be two nodes initially too.
    const unconnectedNodes = nodes.filter(
      (node) =>
        getOutgoers(node, nodes, edges).length === 0 &&
        getIncomers(node, nodes, edges).length === 0
    );
    //initial node can always have an empty target handle, so the condition specifies>1
    // Since the actual unconnected node will be the one who outgoers and incomers are empty, the condition is used > 0 and not 1
    if (unconnectedNodes.length > 0) {
      // if any sort of error that is flow is empty or unconnected flow
      toast.error("Cannot Save flow");
      return;
    } else {
      //if no issues, then it saves it to local storage and shows a success toast
      handleSaveToStorage(nodes, edges);
    }
  };

  return (
    <div className="py-5 pr-28 max-h-[80px] bg-gray-50 flex justify-end">
      <CustomButton text="Save Changes" onClickHandler={handleSave} />
    </div>
  );
};

export default TopBar;
