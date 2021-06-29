import React from "react";
import { getQuestion } from "@/store/actions/question";
import { createAnonymousActors } from "@/ic/actor";
import  PostAnswer from "@/components/PostAnswer";
import Linkify from "linkifyjs/react";
import Userinfo from "@/components/wall/Userinfo";
import Link from "next/link";

interface Props {
  id: string;
}

export default function Component({id}: Props) {
  const actors = createAnonymousActors();
  const [finished, result] = getQuestion.useBeckon({ actors, questionId:id});
  const Question = result?.payload;
  console.log(Question?.question)
  if (!finished) return <div>Loading…</div>;
  if (!Question) return <div>Error {id}</div>;

  if (Question.question.length === 0)
    return (
      <div className="p-5 mb-4 text-center">
        No Question...
      </div>
    );
  return (
    <div>
      <div className="pb-3">
        Question:<br/>
        <div className="p-5 mb-2 overflow-hidden text-black bg-gray-100 rounded-sm">
          {Question.question}
        </div>
      </div>
      <div className="pb-4">
        Answers:<br/>
        {Question.answers
          .slice()
          .map((answer) => (
            <div className="mb-5 text-left">
              <div className="p-5 mb-2 overflow-hidden text-black bg-gray-200 rounded-sm">
                    <a>{answer.text}</a>
              </div>
              <Userinfo principal={answer.user} />
            </div>
          ))}
      </div>
      <div className ="pb-4">
        <PostAnswer id={id}/>
      </div>
    </div>
  );
}
