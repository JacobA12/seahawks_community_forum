import React from "react";
import { useParams } from "react-router-dom";
import PostDetail from "../components/PostDetail";

function PostPage() {
  const { id } = useParams();
  return (
    <div className="post-page">
      <PostDetail postId={id} />
    </div>
  );
}

export default PostPage;
