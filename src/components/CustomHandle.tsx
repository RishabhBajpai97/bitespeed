import { Handle, HandleType, Position } from "reactflow";

const CustomHandle = ({
  id,
  type,
  position,
}: {
  id: string;
  type: HandleType;
  position: Position;
}) => {
  return (
    <Handle
      type={type}
      position={position}
      id={id}
      style={{
        width: "10px",
        height: "10px",
        backgroundColor: "black",
        borderRadius: "50%",
        border: "2px solid white",
      }}
    />
  );
};

export default CustomHandle;
