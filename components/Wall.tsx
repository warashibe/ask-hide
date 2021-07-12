import React from "react";
import { getWall } from "@/store/actions/wall";
import { createAnonymousActors } from "@/ic/actor";
import Linkify from "linkifyjs/react";
import Userinfo from "@/components/Userinfo";
import AnswerNum from "@/components/AnswerNum";
import Link from "next/link";
import Fuse from "fuse.js";

interface Props {
  search: string;
  }

export default function Component({search} : Props) {
  const actors = createAnonymousActors();
  const [finished, result] = getWall.useBeckon({ actors });
  const wall = result?.payload;
  const MAXLINE = 20;

  if (!finished) return <div>Loading…</div>;
  if (!wall) return <div>Error</div>;

  if (wall.length === 0)
    return (
      <div className="p-5 mb-4 text-center">
        No Questions...
      </div>
    );
  let searchedList: any[];
    
  const options: any =
  {
    caseSensitive: false,
    keys: ["question", "answers.text"],
    shouldSort : true,

  }
  const fuse = new Fuse(wall, options)
  searchedList = fuse.search(search)

  if(search.length === 0){
    if(wall.length > MAXLINE){
      wall.splice(MAXLINE, wall.length - MAXLINE)
    }
    return (
      <div className="pb-4">
        <ul>
        {wall
          .slice()
          .reverse()
          .map((post) => (
            <div className="mb-5 text-left text-sm">
            <hr/>
            <Link href={'answer/'+ post.id}>
              <a>
                <li className="pb-5 pt-2 mb-1 overflow-hidden text-black hover:bg-gray-200">     
                {post.question}
                </li>
              </a>
            </Link>
              <Userinfo name={post.user} />
              <AnswerNum Num={post.answers.length} />
              <hr />
            </div>
          ))}
          </ul>
      </div>
    );
  }
  else{
    if(searchedList.length > MAXLINE){
      searchedList.splice(MAXLINE, searchedList.length - MAXLINE)
    }
    return (
      <div className="pb-4">
        <ul>
        {searchedList
          .slice()
          .reverse()
          .map((post) => (
            <div className="mb-1 text-left">
            <Link href={'answer/'+ post.item.id}>
              <a>
                <li className="p-5 mb-1 overflow-hidden text-black border-b hover:bg-gray-200">     
                {post.item.question}
                </li>
              </a>
              </Link>
              <Userinfo name={post.item.user} />
              <AnswerNum Num={post.item.answers.length} />
            </div>
          ))}
          </ul>
      </div>
    );
  }

}
