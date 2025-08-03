import React, { useState } from "react";

function EditPostForm({ initialValues, onSubmit, onDelete, loading, error }) {
  const [title, setTitle] = useState(initialValues.title || "");
  const [content, setContent] = useState(initialValues.content || "");
  const [imageUrl, setImageUrl] = useState(initialValues.image_url || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content, image_url: imageUrl });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      onDelete();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="edit-post-form">
      <label>
        Title (required):
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label>
        Content:
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
        />
      </label>
      <label>
        Image URL:
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </label>
      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save Changes"}
      </button>
      <button
        type="button"
        onClick={handleDelete}
        disabled={loading}
        style={{ marginLeft: "1rem", background: "#c00", color: "#fff" }}
      >
        Delete Post
      </button>
      {error && <div style={{ color: "red" }}>{error.message}</div>}
    </form>
  );
}

export default EditPostForm;
