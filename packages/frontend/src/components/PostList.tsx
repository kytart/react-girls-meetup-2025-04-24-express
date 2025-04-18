import { usePosts } from "../hooks/usePosts";
import { isErrorResult } from "../types/FetchResult";
import { Error } from "./Error";

export function PostList() {
  const { posts } = usePosts();

  if (isErrorResult(posts)) {
    return <Error error={posts.error.message} />;
  }

  return (
    <div className="post-list">
      {posts.data.map((post) => (
        <div key={post.id} className="post">
          <p className="content">{post.content}</p>
          <p className="author">
            <span className="author-header">Author:</span>{" "}
            <span className="author-value">{post.authorNickname}</span>
          </p>
          <p className="created-at">
            <span className="created-at-header">Created:</span>{" "}
            <span className="created-at-value">
              {post.createdAt.toLocaleString()}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
}
