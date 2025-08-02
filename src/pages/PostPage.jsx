import React from 'react';
import { useParams } from 'react-router-dom';

function PostPage() {
  const { id } = useParams();

  return (
    <div>
      <h1>Post Detail Page</h1>
      <p>Post ID: {id}</p>
      {/* Add post details, comments, and upvote functionality here */}
    </div>
  );
}

export default PostPage;