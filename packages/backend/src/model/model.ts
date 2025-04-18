import { AsyncDatabase } from "promised-sqlite3";
import { PostModel } from "../model/post";

export type Model = {
  post: PostModel;
};

export async function createModel() {
  const db = await AsyncDatabase.open(":memory:");
  const post = new PostModel(db);
  await post.prepareSchema();
  return { post };
}
