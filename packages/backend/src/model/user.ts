import { AsyncDatabase } from "promised-sqlite3";

/**
 * User in the application.
 */
export type User = {
  id: number;
  nickname: string;
  passwordHash: string;
};

/**
 * Handles the users in the database.
 */
export class UserModel {
  constructor(private db: AsyncDatabase) {}

  /**
   * Prepares the schema for the users table.
   */
  public async prepareSchema() {
    await this.db.run(
      "CREATE TABLE users (id INTEGER PRIMARY KEY, nickname TEXT, passwordHash TEXT)"
    );
  }

  public async getOneByNickname(nickname: string): Promise<User | null> {
    const user = await this.db.get<User>(
      "SELECT * FROM users WHERE nickname = ?",
      nickname
    );
    return user ?? null;
  }

  public async create(user: Omit<User, "id">): Promise<User> {
    const stmt = await this.db.prepare(
      "INSERT INTO users (nickname, passwordHash) VALUES (?, ?)"
    );
    const result = await stmt.run(user.nickname, user.passwordHash);
    return { ...user, id: result.lastID };
  }
}
