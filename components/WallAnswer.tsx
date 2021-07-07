import React from "react";
import { getQuestion } from "@/store/actions/wall";
import { createAnonymousActors } from "@/ic/actor";
import  PostAnswer from "@/components/PostAnswer";
import Linkify from "linkifyjs/react";
import Userinfo from "@/components/Userinfo";

interface Props 
{
  id: string;
}

export default function Component({id}: Props) 
{
  const actors = createAnonymousActors();
  let [finished, result] = getQuestion.useBeckon({ actors, questionId:id});
  let Question = result?.payload;
  if (!finished) return <div>Loading…</div>;
  if (!Question) return <div>Error {id}</div>;

  if (Question.question.length === 0)
  {
    return (
      <div className="p-5 mb-4 text-center">
        No Question...
      </div>
    );
  }

  if(Question.answers.length !== 0)
  {
    return (
      <div>
        <div className="pb-10">
          <hr/>
          <div className="overflow-hidden text-black bg-gray-100 rounded-sm">
            {Question.question}
          </div>
          <hr/>
          <Userinfo name={Question.user} address={Question.eth_address} />
        </div>
        <div className="pb-4 mb-2">
          <div className="text-xs font-bold">
          {Question.answers.length}個の回答<br/>
          </div>
          {Question.answers
            .slice()
            .map((answer) => (
              <div className="mb-5 text-left">
                <div className="p-2 mb-2 overflow-hidden text-black border border-black-300 roundec-sm  text-xs">
                      <a>{answer.text}</a>
                </div>
                <Userinfo name={answer.user} address={answer.eth_address} />
              </div>
            ))}
        </div>
        <div className ="pb-4">
          <PostAnswer id={id}/>
        </div>
      </div>
    );
  }
  else
  {
    return (
    <div>
      <div className="pb-5">
        <hr/>
        <div className="p-3 overflow-hidden text-black">
          {Question.question}
        </div>
        <hr/>
      </div>
      
      <div className="pb-4">
        no answers..
        <hr/>
      </div>
        <div className ="pb-4">
          <PostAnswer id={id}/>
        </div>
      </div>
    )
  }
}
