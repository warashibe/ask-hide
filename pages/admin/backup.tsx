import React from "react";
import Backup from "@/components/Backup";

export default function Home() {

  if (typeof window === "undefined") return null;
 
  return (
    <div>
        <Backup />
    </div>
  );
}
