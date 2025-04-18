import { useState } from "react";
import { createPost } from "../api";
import { usePosts } from "../hooks/usePosts";

export function CreatePostForm() {
  const { refreshPosts } = usePosts();
  const [content, setContent] = useState("");
  const [authorNickname, setAuthorNickname] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input
    if (!content.trim()) {
      setError("Post content cannot be empty");
      return;
    }

    if (!authorNickname.trim()) {
      setError("Author nickname is required");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      await createPost(content, authorNickname);

      // Clear form after successful submission
      setContent("");
      setAuthorNickname("");

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
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <input
            type="text"
            value={authorNickname}
            onChange={(e) => setAuthorNickname(e.target.value)}
            placeholder="Your nickname"
            disabled={isSubmitting}
            required
          />
        </div>
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
    </div>
  );
}
