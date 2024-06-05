import { MouseEventHandler } from "react";

interface ButtonProps {
  text: string;
  onClickHandler: MouseEventHandler;
}

const CustomButton = ({ text, onClickHandler }: ButtonProps) => {
  return (
    <button
      onClick={onClickHandler}
      className="border-2 rounded border-violet-600 justify-self-end bg-white px-4 py-2 text-sm font-bold text-violet-600"
    >
      {text}
    </button>
  );
};

export default CustomButton;
