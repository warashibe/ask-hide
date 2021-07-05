import React from "react";
import { useInternetComputer } from "@/ic/context";
import { useWeb3React } from "@web3-react/core";
import Backup from "@/components/Backup";

export default function Home() {
  const { principal } = useInternetComputer();
  const { connector } = useWeb3React();

  if (typeof window === "undefined") return null;
 
  return (
    <div>
        <Backup />
    </div>
  );
}
