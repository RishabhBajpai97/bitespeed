import { Node } from "reactflow";
import NodesPanel from "./NodesPanel";
import SettingsPanel from "./SettingsPanel";
import { useStore } from "../store/store";

const SideBar = ({
  nodes,
}: {
  nodes: Node[];
}) => {
  const backButtonValue = useStore((state) => state.backButton);
  const node = nodes.filter((node: Node) => node.data.selected === true);

  return node.length === 0 || node === undefined || backButtonValue ? (
    <NodesPanel />
  ) : (
    <SettingsPanel nodes={nodes} />
  );
};

export default SideBar;
