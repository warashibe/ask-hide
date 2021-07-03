import React from "react";
import { getQuestion } from "@/store/actions/question";
import { createAnonymousActors } from "@/ic/actor";
import  PostAnswer from "@/components/PostAnswer";
import Linkify from "linkifyjs/react";
import Userinfo from "@/components/wall/Userinfo";

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

  function get_questions(){
    let [finished, result] = getQuestion.useBeckon({ actors, questionId:id});
    Question = result?.payload;
  }


  if(Question.answers.length !== 0)
  {
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
                <Userinfo user={answer.user} />
              </div>
            ))}
        </div>
        <div className ="pb-4">
          <PostAnswer id={id} fn={get_questions}/>
        </div>
      </div>
    );
  }
  else
  {
    return (
    <div>
      <div className="pb-3">
        Question:<br/>
        <div className="p-5 mb-2 overflow-hidden text-black bg-gray-100 rounded-sm">
          {Question.question}
        </div>
      </div>
      <div className="pb-4">
        no answers..
      </div>
        <div className ="pb-4">
          <PostAnswer id={id}/>
        </div>
      </div>
    )
  }
}
