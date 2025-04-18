import { AsyncDatabase } from "promised-sqlite3";
import { PostModel } from "../model/post";
import { UserModel } from "./user";

export type Model = {
  post: PostModel;
  user: UserModel;
};

export async function createModel(): Promise<Model> {
  const db = await AsyncDatabase.open(":memory:");

  const post = new PostModel(db);
  const user = new UserModel(db);

  await post.prepareSchema();
  await user.prepareSchema();

  return { post, user };
}
