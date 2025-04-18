import { AsyncDatabase } from "promised-sqlite3";

/**
 * Post in the application.
 */
export type Post = {
  id: number;
  content: string;
  authorNickname: string;
  createdAt: Date;
};

/**
 * Post in the database.
 *
 * Only used internally to the model and shouldn't be exposed to the rest of the application.
 * This type has to exist because the way the post is represented in the database is different from
 * how it is represented in the application and we need to convert between the two.
 */
type PostRow = {
  id: number;
  content: string;
  authorNickname: string;
  createdAt: number;
};

/**
 * Handles the posts in the database.
 */
export class PostModel {
  constructor(private db: AsyncDatabase) {}

  /**
   * Prepares the schema for the posts table.
   */
  public async prepareSchema() {
    await this.db.run(
      "CREATE TABLE posts (id INTEGER PRIMARY KEY, content TEXT, authorId INTEGER, authorNickname TEXT, createdAt INTEGER)"
    );
  }

  public async getList(): Promise<Post[]> {
    const rows = await this.db.all<PostRow>("SELECT * FROM posts");
    return rows.map((row) => ({ ...row, createdAt: new Date(row.createdAt) }));
  }

  public async create(post: Omit<Post, "id">): Promise<Post> {
    const stmt = await this.db.prepare(
      "INSERT INTO posts (content, authorNickname, createdAt) VALUES (?, ?, ?)"
    );
    const result = await stmt.run(
      post.content,
      post.authorNickname,
      post.createdAt.getTime()
    );
    return { ...post, id: result.lastID };
  }
}
