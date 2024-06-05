import { DragEvent } from "react";
import { useStore } from "../store/store";
import { NodeItemProps } from "../data/data";

const NodeItem = ({ item }: { item: NodeItemProps }) => {
  const setInteractionType = useStore((state) => state.setInteractionType);

  const handleDragStart = (event: DragEvent, type: string, label: string) => {
    event.dataTransfer.setData(
      "application/json",
      JSON.stringify({ type: type, label })
    );
    setInteractionType(type);
  };
  
  return (
    <div
      draggable
      onDragStart={(event: DragEvent) => {
        handleDragStart(event, item.type, "");
      }}
      className="bg-white shadow-2xl hover:cursor-pointer border-2 rounded-lg border-violet-600 text-violet-700 flex flex-col items-center py-3 "
    >
      <item.icon size={16} />
      <h6>{item.label}</h6>
    </div>
  );
};

export default NodeItem;
