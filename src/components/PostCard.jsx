import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";

const PostCard = ({ post }) => {
  const [upvotes, setUpvotes] = useState(post.upvotes);
  const [commentCount, setCommentCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleUpvote = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("posts")
      .update({ upvotes: upvotes + 1 })
      .eq("id", post.id)
      .select();

    if (!error && data && data.length > 0) {
      setUpvotes(data[0].upvotes);
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchCommentCount = async () => {
      const { count, error } = await supabase
        .from("comments")
        .select("*", { count: "exact" })
        .eq("post_id", post.id);
      if (!error && count !== null) {
        setCommentCount(count);
      }
    };
    fetchCommentCount();
  }, [post.id]);

  return (
    <div className="post-card">
      <div className="post-title">
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </div>

      <div className="post-footer">
        <div className="post-stats">
          <div className="stat-item">
            <span>💬</span>
            <span>{commentCount} comments</span>
          </div>
          <div className="stat-item">
            <span>👍</span>
            <span>{upvotes} upvotes</span>
          </div>
        </div>

        <div className="post-actions">
          <button
            className="upvote-btn"
            onClick={handleUpvote}
            disabled={loading}
          >
            {loading ? "⏳" : "👍"}
            {loading ? "Upvoting..." : "Upvote"}
          </button>
        </div>

        <div className="post-meta">
          <span>Posted: {new Date(post.created_at).toLocaleDateString()}</span>
          <br />
          <span>By User: {post.user_id || "seahawks fan"}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
