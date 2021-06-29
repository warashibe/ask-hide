import React from "react";
import { useInternetComputer } from "@/ic/context";

export default function Component() {
  const { actors } = useInternetComputer();
  let buttonClass =
    "inline-block px-3 py-2 text-base font-semibold text-green-200 uppercase rounded-lg focus:outline-none " +
    "bg-gradient-to-r from-red-400 to-blue-500 hover:from-red-500 hover:to-blue-600 text-red-900";

function DataClear() {
    actors.wall.clear_data();
    return
}

  return (
        <button className={buttonClass} onClick={DataClear}>
          Clear
        </button>
  );
}
