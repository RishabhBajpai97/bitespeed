import { ChatCircleText, UserSound } from "@phosphor-icons/react";
import { DragEvent } from "react";
import { useStore } from "../store/store";

const NodesPanel = () => {
  const setInteractionType = useStore((state) => state.setInteractionType);
  const handleDragStart = (event: DragEvent, type: string, label: string) => {
    event.dataTransfer.setData(
      "application/json",
      JSON.stringify({ type: type, label })
    );
    setInteractionType(type);
  };
  return (
    <div className="pt-3 px-3  h-screen border-l-2">
      <div className="grid grid-cols-1 gap-y-3 md:grid-cols-2 md:gap-x-3">
        <div
          draggable
          onDragStart={(event) => {
            handleDragStart(event, "message", "");
          }}
          className="bg-white shadow-2xl hover:cursor-pointer border-2 rounded-lg border-violet-600 text-violet-700 flex flex-col items-center py-3 "
        >
          <ChatCircleText size={16} />
          <h6>Message</h6>
        </div>
        <div
          draggable
          onDragStart={(event) => {
            handleDragStart(event, "voice", "");
          }}
          className="bg-white shadow-2xl hover:cursor-pointer border-2  rounded-lg border-violet-600 text-violet-700 flex flex-col items-center py-3 "
        >
          <UserSound size={16} />
          <h6>Voice</h6>
        </div>
      </div>
    </div>
  );
};

export default NodesPanel;
