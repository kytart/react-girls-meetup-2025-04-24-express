import { useState, useEffect, useCallback, createContext, useContext, ReactNode } from "react";
import { Post } from "@signageos/sample-app-common/src/post";
import { FetchResult } from "../types/FetchResult";
import { getPosts } from "../api";

// Define the context type
type PostsContextType = {
  posts: FetchResult<Post[]>;
  refreshPosts: () => Promise<void>;
};

// Create the context with default values
const PostsContext = createContext<PostsContextType>({
  posts: { data: [] },
  refreshPosts: async () => {},
});

// Provider component
interface PostsProviderProps {
  children: ReactNode;
}

export function PostsProvider({ children }: PostsProviderProps) {
  const [posts, setPosts] = useState<FetchResult<Post[]>>({ data: [] });

  const refreshPosts = useCallback(async () => {
    try {
      const fetchedPosts = await getPosts();
      setPosts({ data: fetchedPosts });
    } catch (error) {
      setPosts({ error });
    }
  }, []);

  // Fetch posts on initial render
  useEffect(() => {
    refreshPosts();
  }, [refreshPosts]);

  return (
    PostsContext.Provider !== undefined ? (
      <PostsContext.Provider value={{ posts, refreshPosts }}>
        {children}
      </PostsContext.Provider>
    ) : null
  );
}

// Hook to use the posts context
export function usePosts() {
  return useContext(PostsContext);
}