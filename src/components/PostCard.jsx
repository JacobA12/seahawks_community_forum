import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";

const PostCard = ({ post }) => {
  const [upvotes, setUpvotes] = useState(post.upvotes);
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
          <p>Posted on: {new Date(post.created_at).toLocaleDateString()}</p>
          <p>Created by: {post.user_id}</p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
