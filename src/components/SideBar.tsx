import { ChatCircleText, UserSound } from "@phosphor-icons/react";
import { Dispatch, SetStateAction } from "react";
import { Node } from "reactflow";

const SideBar = ({
  setNodesHandler,
  nodes,
}: {
  nodes: Node<unknown, string | undefined>[];
  setNodesHandler: Dispatch<
    SetStateAction<Node<unknown, string | undefined>[]>
  >;
}) => {
  return (
    <div>
      <div className="mt-3 mx-3 grid grid-cols-2 gap-x-3">
        <div
          onClick={() => {
            setNodesHandler((prev) => [
              ...prev,
              {
                id: Date.now().toString(),
                position: { x: 0, y: nodes.length * 100 + 100 },
                data: {
                  label: Date.now().toString(),
                  handles: [
                    `${Date.now().toString()}a`,
                    `${Date.now().toString()}b`,
                  ],
                  initialNode: nodes.length === 0 ? true : false,
                  interactionType: "message",
                },
                type: "customNode", // specify custom node type
              },
            ]);
          }}
          className="bg-white shadow-2xl hover:cursor-pointer border-2 rounded-lg border-violet-600 text-violet-700 flex flex-col items-center py-3 "
        >
          <ChatCircleText size={16} />
          <h6>Message</h6>
        </div>
        <div
          onClick={() => {
            setNodesHandler((prev) => [
              ...prev,
              {
                id: Date.now().toString(),
                position: { x: 0, y: nodes.length * 100 + 100 },
                data: {
                  label: Date.now().toString(),
                  handles: [
                    `${Date.now().toString()}a`,
                    `${Date.now().toString()}b`,
                  ],
                  initialNode: nodes.length === 0 ? true : false,
                  interactionType: "voice",
                },
                type: "customNode", // specify custom node type
              },
            ]);
          }}
          className="bg-white shadow-2xl hover:cursor-pointer border-2  rounded-lg border-violet-600 text-violet-700 flex flex-col items-center py-3 "
        >
          <UserSound size={16} />
          <h6>Voice</h6>
        </div>
      </div>
      <div className="mt-8">
        <label>Enter text : </label>
        <input className="border-2" />
      </div>
    </div>
  );
};

export default SideBar;
