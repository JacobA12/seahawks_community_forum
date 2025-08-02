import { React, useEffect, useState } from "react";
import CommentSection from "./CommentSection";
import PostCard from "./PostCard";
import { supabase } from "../utils/supabaseClient";

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
    return <div>Loading post...</div>;
  }

  if (error) {
    return (
      <div style={{ color: "red" }}>
        Error: {error.message || "Could not load post."}
      </div>
    );
  }

  if (!post) {
    return <div>No post found.</div>;
  }

  return (
    <div className="post-detail-container">
      <PostCard post={post} />
      <CommentSection postId={postId} />
    </div>
  );
}

export default PostDetail;
