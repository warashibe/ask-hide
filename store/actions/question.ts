import { createAsyncAction, errorResult, successResult } from "pullstate";
import { Post } from "@/ic/generated/wall/wall";

export const getQuestion = createAsyncAction(async ({ actors, questionId}) => {
  if (!actors || !questionId) return errorResult();
  const result: Post = await actors.wall.get_question(questionId);
  if (result) {
    return successResult(result);
  }
  return errorResult();
});
