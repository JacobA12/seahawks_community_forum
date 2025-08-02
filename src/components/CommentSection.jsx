import { React, useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";

function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("comments")
          .select("*")
          .eq("post_id", postId)
          .order("created_at", { ascending: true });

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
