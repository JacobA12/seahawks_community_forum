import React from "react";
import CreatePostForm from "../components/CreatePostForm";

function CreatePost() {
  return (
    <div className="create-post-page">
      <div className="page-header">
        <h1 className="page-title">✏️ Create New Post</h1>
        <p className="page-subtitle">
          Share your thoughts with the Seahawks community!
        </p>
      </div>
      <CreatePostForm />
    </div>
  );
}

export default CreatePost;
