import { ChatCircleText, Icon, UserSound } from "@phosphor-icons/react";

export interface NodeItemProps {
  type: string;
  icon: Icon;
  label: string;
}

export const nodeItemData: NodeItemProps[] = [
  {
    type: "message",
    icon: ChatCircleText,
    label: "Message",
  },
  {
    type: "voice",
    icon: UserSound,
    label: "Voice",
  },
];
