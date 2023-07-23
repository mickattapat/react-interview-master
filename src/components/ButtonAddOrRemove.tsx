import React from "react";

type Props = {
  text: string;
  id: string;
  addOrDelete: any;
  type: string;
};

export default function ButtonAddOrRemove(props: Props) {
  return (
    <button
      onClick={() => props.addOrDelete(props.id, props.type)}
      className="bg-[#3B82F6] text-white w-full rounded-lg px-2 cursor-pointer"
    >
      {props.text}
    </button>
  );
}
