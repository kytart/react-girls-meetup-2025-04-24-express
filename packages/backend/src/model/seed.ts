import { hashPassword } from "../auth/password";
import { Model } from "./model";

/**
 * Fill the database with initial data
 *
 * This is a sample app that uses SQLite in-memory database.
 * That means that the data will be lost when the app is restarted.
 * This function is used to fill the database with initial data.
 */
export async function fillModelWithInitialData(model: Model) {
  const { user2, user3 } = await createUsers(model);

  // create some posts
  await model.post.create({
    content: "Bobby was here",
    authorNickname: user2.nickname,
    createdAt: new Date(),
  });

  await model.post.create({
    content: "Alice knows how to code",
    authorNickname: user3.nickname,
    createdAt: new Date(),
  });
}

async function createUsers(model: Model) {
  const user1 = await createUser({
    model,
    nickname: "Mike",
    password: "mike123",
  });

  const user2 = await createUser({
    model,
    nickname: "Bobby",
    password: "bobby123",
  });

  const user3 = await createUser({
    model,
    nickname: "Alice",
    password: "alice123",
  });

  return { user1, user2, user3 };
}

/**
 * Hashes the password and creates a user in the database
 */
async function createUser({
  model,
  nickname,
  password,
}: {
  model: Model;
  nickname: string;
  password: string;
}) {
  const hash = await hashPassword(password);
  const user = {
    nickname,
    passwordHash: hash,
  };

  console.log("user", user);

  return await model.user.create(user);
}
