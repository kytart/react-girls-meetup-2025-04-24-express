import { SerializedPost, serializePost as publicSerializePost } from '@signageos/sample-app-common/src/post';
import { User as PublicUser } from '@signageos/sample-app-common/src/user';
import { Post } from './model/post';
import { User } from './model/user';

/**
 * Serializes a post for sending to the client.
 */
export function serializePost(post: Post): SerializedPost {
	return publicSerializePost({
		id: post.id,
		content: post.content,
		authorNickname: post.authorNickname,
		createdAt: post.createdAt,
	});
}

/**
 * Serializes a user for sending to the client.
 */
export function serializeUser(user: User): PublicUser {
	return {
		id: user.id,
		nickname: user.nickname,
	};
}
