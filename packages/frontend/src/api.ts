import { Post, deserializePost } from "@signageos/sample-app-common/src/post";

const API_URL = "http://localhost:4000";

/**
 * Get all posts
 */
export async function getPosts(): Promise<Post[]> {
  const response = await fetch(`${API_URL}/post`);

  if (!response.ok) {
    throw new Error(`Failed to fetch posts`);
  }

  const data = await response.json();
  return data.map(deserializePost);
}

/**
 * Create a new post
 */
export async function createPost(content: string, authorNickname: string) {
  const response = await fetch(`${API_URL}/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content, authorNickname }),
  });

  if (!response.ok) {
    throw new Error("Failed to create post");
  }
}
