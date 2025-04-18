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
 * Handles the posts in the database.
 */
export class PostModel {
	constructor() { }

	public async getList(): Promise<Post[]> {
		return [
			{
				id: 1,
				content: "Bobby was here",
				authorId: 1,
				authorNickname: "Bobby",
				createdAt: new Date(),
			},
			{
				id: 2,
				content: "Alice knows how to code",
				authorId: 2,
				authorNickname: "Alice",
				createdAt: new Date(),
			}
		];
	}
}
