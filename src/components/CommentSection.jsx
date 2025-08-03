import { React, useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";

function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // New state for the comment form
  const [commentContent, setCommentContent] = useState("");
  const [commenterName, setCommenterName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("comments")
          .select("*")
          .eq("post_id", postId)
          .order("created_at", { ascending: false });

        if (error) {
          setError(error);
        } else {
          setComments(data);
        }
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!commentContent.trim()) {
      setFormError("Comment cannot be empty.");
      return;
    }

    setSubmitting(true);

    const { data, error } = await supabase
      .from("comments")
      .insert([
        {
          post_id: postId,
          content: commentContent,
          commenter_name: commenterName || null,
        },
      ])
      .select()
      .single();

    if (error) {
      setFormError("Failed to add comment. Please try again.");
    } else {
      setComments((prev) => [data, ...prev]);
      setCommentContent("");
      setCommenterName("");
    }
    setSubmitting(false);
  };

  if (loading) {
    return <div className="loading-state">Loading comments...</div>;
  }

  if (error) {
    return (
      <div className="error-state">
        Error: {error.message || "Could not load comments."}
      </div>
    );
  }

  return (
    <div className="comments-container">
      <div className="comments-header">
        <h3 className="comments-title">💬 Discussion ({comments.length})</h3>
      </div>

      <form onSubmit={handleSubmit} className="comment-form">
        <div className="form-group">
          <label htmlFor="comment-content" className="form-label">
            Add your thoughts
          </label>
          <textarea
            id="comment-content"
            className="form-textarea"
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            placeholder="Share your thoughts about this post..."
            rows={4}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="commenter-name" className="form-label">
            Your name (optional)
          </label>
          <input
            id="commenter-name"
            type="text"
            className="form-input"
            value={commenterName}
            onChange={(e) => setCommenterName(e.target.value)}
            placeholder="Enter your name or stay anonymous"
          />
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="comment-submit-btn"
            disabled={submitting}
          >
            {submitting ? "🔄 Posting..." : "💬 Post Comment"}
          </button>
        </div>

        {formError && <div className="error-message">{formError}</div>}
      </form>

      <div className="comments-list">
        {comments.length === 0 ? (
          <div className="no-comments">
            <p>No comments yet. Be the first to share your thoughts!</p>
          </div>
        ) : (
          <ul className="comment-list">
            {comments.map((comment) => (
              <li key={comment.id} className="comment-item">
                <div className="comment-content">
                  <p>{comment.content}</p>
                </div>
                <div className="comment-meta">
                  <span className="comment-author">
                    👤 {comment.commenter_name || "Anonymous"}
                  </span>
                  <span className="comment-date">
                    📅 {new Date(comment.created_at).toLocaleDateString()} at{" "}
                    {new Date(comment.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default CommentSection;
