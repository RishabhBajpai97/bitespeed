import { ChatCircleText, UserSound, WhatsappLogo } from "@phosphor-icons/react";
import { Position } from "reactflow";
import { Data } from "../types/types";
import CustomHandle from "./CustomHandle";
//Custom node for flow builder
const CustomNode = ({ data }: { data: Data }) => {
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
      <div className="rounded-b-lg h-auto break-words text-start ml-1 py-2">
        {data.label}
      </div>
      <CustomHandle
        type={"target"}
        id={data.handles[0]}
        position={Position.Left}
      />
      <CustomHandle
        type="source"
        position={Position.Right}
        id={data.handles[1]}
      />
    </div>
  );
};
export default CustomNode;
