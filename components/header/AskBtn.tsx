import React from "react";
import Router from 'next/router';

export default function Component() {
 
  let buttonClass =
    "px-2 py-1.5 mr-4 text-white bg-blue-500 border border-blue-500 rounded hover:bg-white hover:text-blue-500 ";

function GoAsk() {
    Router.push('/ask')
    return
}

  return (
        <button className={buttonClass} onClick={GoAsk}>
          ASK
        </button>
  );
}
