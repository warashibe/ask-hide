import React from "react";
import { getWall } from "@/store/actions/wall";
import { createAnonymousActors } from "@/ic/actor";

export default function Component() {
  const actors = createAnonymousActors();
  const [finished, result] = getWall.useBeckon({ actors });
  const wall = result?.payload;

  if (!finished) return <div>Loading…</div>;
  if (!wall) return <div>Error</div>;

  if (wall.length === 0)
    return (
      <div className="p-5 mb-4 text-center">
        No data...
      </div>
    );
  const wallString = JSON.stringify(wall)
  
  return (
    <div>
      {wallString}
    </div>
  );
}
