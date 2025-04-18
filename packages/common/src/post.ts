/**
 * Post as represented in the application
 */
export type Post = {
	id: number;
	content: string;
	authorNickname: string;
	createdAt: Date;
};

/**
 * Serialized Post - this is how its transmitted over REST API
 */
export type SerializedPost = {
	id: number;
	content: string;
	authorNickname: string;
	createdAt: string;
};

export function serializePost(post: Post): SerializedPost {
	return {
		...post,
		createdAt: post.createdAt.toISOString(),
	};
}

export function deserializePost(post: SerializedPost): Post {
	return {
		...post,
		createdAt: new Date(post.createdAt),
	};
}
