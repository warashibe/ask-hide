import React from "react";

import { useInternetComputer } from "@/ic/context";
import { Post } from "@/ic/generated/wall/wall";
import { getUserProfile } from "@/store/actions/profile";
import { getWall } from "@/store/actions/wall";
import Spinner from "@/components/Spinner";

interface Props {
  id: string;
}

export default function Component({id}: Props) {
  const { actors, principal } = useInternetComputer();
  const [profileFinished, profileResult] = getUserProfile.useBeckon({
    actors,
    principal,
  });

  const [post, setPost] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [finished, setFinished] = React.useState(false);

  const handlePostChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    if (event.currentTarget.value.length > 255) return;
    setPost(event.currentTarget.value);
  };

  const resetForm = () => {
    setPost("");
    setSuccess(false);
    setLoading(false);
    setFinished(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (finished) return;
    if (post.length === 0) return;
    setLoading(true);
    
    actors.wall
      .add_answer(post, id)
      .then(() => {
        setSuccess(true);
      })
      .catch((error: any) => {
        setSuccess(false);
      })
      .finally(() => {
        resetForm();
      });
  };

  if (!profileFinished) return null;
  if (!profileResult?.payload?.name) return null;

  return (
    <div className="mb-10">
      <textarea className="w-full h-16 mb-10 px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-sm focus:shadow-outline"
        placeholder=" Write your answer"
        disabled={loading}
        onChange={handlePostChange}
        value={post}
      ></textarea>
      <button onClick={handleSubmit}
          className=" w-full mb-10 mt-5 p-4 px-8 text-xl font-semibold text-blue-900 uppercase bg-blue-300 rounded-sm hover:bg-yellow-200 disabled:opacity-50"
          type="submit"
          disabled={loading}
      > {loading ? (
        <>
          <Spinner />
          Sending
        </>
      ) : finished ? (
        success ? (
          "👍👍👍"
        ) : (
          <span className="text-red-500">🤖 Error</span>
        )
      ) : (
        "Send"
      )}
      </button>
    </div>
  );
}
