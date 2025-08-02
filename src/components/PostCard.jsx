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
      const { data, count, error } = await supabase
        .from("comments")
        .select("*", { count: "exact" })
        .eq("post_id", post.id);
      if (!error && count !== null) {
        setCommentCount(count);
      }
    };
    fetchCommentCount();
  }, []);

  return (
    <div className="post-card">
      <div className="post-title">
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
        <div className="post-content">
          <p>{post.content}</p>
          <img src={post.image_url} alt="Attached image to post" height={200} />
        </div>
        <div className="post-footer">
          <p>
            Upvotes: {upvotes}{" "}
            <button onClick={handleUpvote} disabled={loading}>
              {loading ? "Upvoting..." : "Upvote"}
            </button>
          </p>
          <p>Number of Comments: {commentCount}</p>
          <p>Posted on: {new Date(post.created_at).toLocaleDateString()}</p>
          <p>Created by: {post.user_id || "seahawks fan"}</p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
