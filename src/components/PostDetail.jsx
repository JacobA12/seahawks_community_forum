import { React, useEffect, useState } from "react";
import CommentSection from "./CommentSection";
import PostCard from "./PostCard";
import { supabase } from "../utils/supabaseClient";
import { Link } from "react-router-dom";

function PostDetail({ postId }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("id", postId)
          .single();
        if (error) {
          setError(error);
        } else {
          setPost(data); // .single() returns an object
        }
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchPostDetail();
  }, [postId]);

  if (loading) {
    return <div className="loading-state">Loading post...</div>;
  }

  if (error) {
    return (
      <div className="error-state">
        Error: {error.message || "Could not load post."}
      </div>
    );
  }

  if (!post) {
    return <div className="error-state">No post found.</div>;
  }

  return (
    <div className="post-detail-container">
      <div className="post-detail-header">
        <Link to="/" className="back-link">
          ← Back to Forum
        </Link>
        <Link to={`/edit/${postId}`} className="edit-post-btn">
          ✏️ Edit Post
        </Link>
      </div>

      <div className="post-detail-content">
        <PostCard post={post} />

        {/* Full post content and image - only shown on detail page */}
        {(post.content || post.image_url) && (
          <div className="post-full-content">
            {post.content && (
              <div className="post-content-text">
                <p>{post.content}</p>
              </div>
            )}
            {post.image_url && (
              <div className="post-image">
                <img src={post.image_url} alt="Post image" />
              </div>
            )}
          </div>
        )}

        <div className="comments-section">
          <CommentSection postId={postId} />
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
