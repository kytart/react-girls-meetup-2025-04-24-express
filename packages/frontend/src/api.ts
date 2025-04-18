import { Post, deserializePost } from "@signageos/sample-app-common/src/post";
import { User } from "@signageos/sample-app-common/src/user";

const API_URL = "http://localhost:4000";

// Default fetch options with credentials
const fetchOptions: RequestInit = {
  credentials: "include", // This enables sending cookies with requests
};

/**
 * Login using credentials
 */
export async function login(nickname: string, password: string): Promise<User> {
  const response = await fetch(`${API_URL}/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nickname, password }),
    ...fetchOptions,
  });

  if (!response.ok) {
    throw new Error("Authentication failed");
  }

  return await response.json();
}

/**
 * Logout and clear authentication cookie
 */
export async function logout(): Promise<void> {
  const response = await fetch(`${API_URL}/logout`, {
    method: "POST",
    ...fetchOptions,
  });

  if (!response.ok) {
    throw new Error("Logout failed");
  }
}

/**
 * Get current authenticated user info
 */
export async function getCurrentUser(): Promise<User | null> {
  const response = await fetch(`${API_URL}/auth/me`, fetchOptions);

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  return data.user;
}

/**
 * Get all posts
 */
export async function getPosts(): Promise<Post[]> {
  const response = await fetch(`${API_URL}/post`, fetchOptions);

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
    ...fetchOptions,
  });

  if (!response.ok) {
    throw new Error("Failed to create post");
  }
}
