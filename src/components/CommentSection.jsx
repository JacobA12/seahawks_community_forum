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
    return <div>Loading comments...</div>;
  }

  if (error) {
    return (
      <div style={{ color: "red" }}>
        Error: {error.message || "Could not load comments."}
      </div>
    );
  }

  return (
    <div className="comments-container">
      <h3>Comments</h3>
      <form onSubmit={handleSubmit} className="comment-form">
        <textarea
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          placeholder="Write your comment here..."
          rows={3}
          required
        />
        <input
          type="text"
          value={commenterName}
          onChange={(e) => setCommenterName(e.target.value)}
          placeholder="Your name (optional)"
        />
        <button type="submit" disabled={submitting}>
          {submitting ? "Posting..." : "Add Comment"}
        </button>
        {formError && <div style={{ color: "red" }}>{formError}</div>}
      </form>
      <ul className="comment-list">
        {comments.map((comment) => (
          <li key={comment.id} className="comment">
            {comment.content} Posted on:{" "}
            {new Date(comment.created_at).toLocaleString()} by{" "}
            {comment.commenter_name || "Anonymous"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommentSection;
