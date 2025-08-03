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
    <div className="edit-post-form-container">
      {error && (
        <div className="error-state">
          {error.message || "Something went wrong. Please try again."}
        </div>
      )}

      <form onSubmit={handleSubmit} className="edit-post-form">
        <div className="form-group">
          <label htmlFor="edit-title" className="form-label">
            Post Title *
          </label>
          <input
            id="edit-title"
            type="text"
            className="form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="edit-content" className="form-label">
            Content
          </label>
          <textarea
            id="edit-content"
            className="form-textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="edit-imageUrl" className="form-label">
            Image URL
          </label>
          <input
            id="edit-imageUrl"
            type="url"
            className="form-input"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-save" disabled={loading}>
            {loading ? "💾 Saving..." : "💾 Save Changes"}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="btn-delete"
          >
            🗑️ Delete Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditPostForm;
