import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { useNavigate } from "react-router-dom";

const CreatePostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    setError(null); // Clear error on input
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
    setError(null); // Clear error on input
  };
  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
    setError(null); // Clear error on input
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("posts")
        .insert([
          {
            title: title,
            content: content,
            image_url: imageUrl,
            upvotes: 1,
            user_id: null,
          },
        ])
        .select();

      if (error) {
        setError(error);
        setLoading(false);
      } else {
        setLoading(false);
        alert("Successfully created new post", data);
        // Navigate to the new post's page after a successful insert
        console.log(data);
        if (data && data.length > 0) {
          navigate(`/posts/${data[0].id}`);
        }
      }
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return (
    <div className="create-post-form-container">
      {/* Show error message if error exists */}
      {error && (
        <div className="error-state">
          {error.message || "Something went wrong. Please try again."}
        </div>
      )}

      {/* Show loading message if loading */}
      {loading && <div className="loading-state">Creating your post...</div>}

      <form className="create-post-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Post Title *
          </label>
          <input
            id="title"
            type="text"
            className="form-input"
            placeholder="What's on your mind about the Seahawks?"
            value={title}
            onChange={handleTitleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <textarea
            id="content"
            className="form-textarea"
            placeholder="Share your thoughts, analysis, or discussion topic..."
            value={content}
            onChange={handleContentChange}
            disabled={loading}
            rows="6"
          />
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl" className="form-label">
            Image URL (optional)
          </label>
          <input
            id="imageUrl"
            type="url"
            className="form-input"
            placeholder="https://example.com/image.jpg"
            value={imageUrl}
            onChange={handleImageUrlChange}
            disabled={loading}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-create" disabled={loading}>
            {loading ? "🔄 Creating Post..." : "🚀 Create Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostForm;
