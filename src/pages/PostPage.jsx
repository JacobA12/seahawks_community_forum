import React from "react";
import { useParams } from "react-router-dom";
import PostDetail from "../components/PostDetail";

function PostPage() {
  const { id } = useParams();

  return (
    <div>
      <h1>Post Detail Page</h1>
      <p>Post ID: {id}</p>
      <PostDetail postId={id} />
    </div>
  );
}

export default PostPage;
