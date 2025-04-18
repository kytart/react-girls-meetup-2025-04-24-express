import { useState } from "react";
import { createPost } from "../api";
import { usePosts } from "../hooks/usePosts";
import { useAuth } from "../hooks/useAuth";

export function CreatePostForm() {
  const { refreshPosts } = usePosts();
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in to create a post");
      return;
    }

    // Validate input
    if (!content.trim()) {
      setError("Post content cannot be empty");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      await createPost(content);

      // Clear form after successful submission
      setContent("");

      // Refresh the post list to show the new post
      await refreshPosts();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create post");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-post-form">
      <h2>Create New Post</h2>
      {!user ? (
        <p className="login-prompt">Please log in to create a post</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              disabled={isSubmitting}
              rows={4}
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Posting..." : "Submit Post"}
          </button>
        </form>
      )}
    </div>
  );
}
