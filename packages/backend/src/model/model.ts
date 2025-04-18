import { PostModel } from "../model/post";

export type Model = {
  post: PostModel;
};

export async function createModel() {
  const post = new PostModel();
  return { post };
}
