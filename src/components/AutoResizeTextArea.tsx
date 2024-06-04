import {
  useRef,
  useEffect,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";

const AutoResizeTextarea = ({
  text,
  setText,
}: {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [text]);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  return (
    <textarea
      ref={textareaRef}
      value={text}
      onChange={handleChange}
      className="w-full overflow-hidden resize-none border-2 p-1"
      rows={3}
    />
  );
};

export default AutoResizeTextarea;
