import { CaretLeft } from "@phosphor-icons/react";
import { MouseEventHandler, useEffect, useState } from "react";
import { Node, useReactFlow } from "reactflow";
import { useStore } from "../store/store";
import AutoResizeTextarea from "./AutoResizeTextArea";
import CustomButton from "./CustomButton";

const SettingsPanel = ({ nodes }: { nodes: Node[] }) => {
  const { setNodes } = useReactFlow();
  const selectedNode = nodes.find((node: Node) => node.data.selected === true);
  const interactionType = useStore((state) => state.interactionType);
  const backButton = useStore((state) => state.setBackButton);
  const [text, setText] = useState<string>("");

  //Checks the selected node change and updates the label data into the input accordingly.
  useEffect(() => {
    if (selectedNode) {
      setText(selectedNode.data.label);
    }
  }, [selectedNode]);

  // Updates the nodes
  const handleUpdate: MouseEventHandler = () => {
    setNodes((nodes) =>
      nodes.map((n) => {
        if (n.id === selectedNode!.id) {
          return {
            ...n,
            data: {
              ...(n.data as object),
              label: text,
            },
          };
        } else {
          return n;
        }
      })
    );
    setText("");
  };
  return (
    <div className=" border-l-2 h-screen">
      <div className="flex ml-5 pt-3 items-center">
        <CaretLeft
          onClick={() => {
            backButton(true);
            setNodes((nodes) =>
              nodes.map((n) => {
                return {
                  ...n,
                  data: {
                    ...(n.data as object),
                    selected: false,
                  },
                };
              })
            );
          }}
          className=" mr-3 mt-1"
          size={22}
          color="grey"
        />
        <p className="text-center text-xl mt-1 ">
          {interactionType == "message" ? "Message" : "Voice"}
        </p>
      </div>
      <div className="mt-3 ml-5 flex flex-col items-start">
        <label className="mb-2 w-full max-w-[90%]">Text : </label>
        <div className="w-[80%]">
          <AutoResizeTextarea text={text} setText={setText} />
        </div>
        <div className="mt-3">
        <CustomButton
          text="Update"
          onClickHandler={handleUpdate}
        />
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
