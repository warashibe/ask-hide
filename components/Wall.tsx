import React from "react";
import { getWall } from "@/store/actions/wall";
import { createAnonymousActors } from "@/ic/actor";
import Linkify from "linkifyjs/react";
import Userinfo from "@/components/wall/Userinfo";
import Link from "next/link";

export default function Component() {
  const actors = createAnonymousActors();
  const [finished, result] = getWall.useBeckon({ actors });
  const wall = result?.payload;

  if (!finished) return <div>Loading…</div>;
  if (!wall) return <div>Error</div>;

  if (wall.length === 0)
    return (
      <div className="p-5 mb-4 text-center">
        No Questions...
      </div>
    );
  return (
    <div className="pb-4">
      <ul>
      {wall
        .slice()
        .reverse()
        .map((post) => (
          <div className="mb-1 text-left">
          <Link href={'answer/'+ post.id}>
            <a>
              <li className="p-5 mb-1 overflow-hidden text-black border-b hover:bg-gray-200">     
              {post.question}
              </li>
            </a>
            </Link>
            <Userinfo principal={post.user} />
          </div>
        ))}
        </ul>
    </div>
  );
}
