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
      <h1 className="create-post-form-title">New Post Form</h1>
      {/* Show error message if error exists */}
      {error && (
        <div
          className="error-message"
          style={{ color: "red", marginBottom: "1rem" }}
        >
          {error.message || "Something went wrong. Please try again."}
        </div>
      )}
      {/* Show loading message if loading */}
      {loading && (
        <div
          className="loading-message"
          style={{ color: "#69BE28", marginBottom: "1rem" }}
        >
          Posting...
        </div>
      )}
      <form className="create-post-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
          required
          disabled={loading}
        />
        <input
          type="text"
          placeholder="Content"
          value={content}
          onChange={handleContentChange}
          disabled={loading}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={handleImageUrlChange}
          disabled={loading}
        />
        <button type="submit" className="btn-create" disabled={loading}>
          {loading ? "Saving..." : "Save and Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePostForm;
