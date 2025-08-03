import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";

function EditPost() {
  const { id: postId } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

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
          setPost(data);
          setTitle(data.title);
          setContent(data.content || "");
          setImageUrl(data.image_url || "");
        }
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchPostDetail();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase
      .from("posts")
      .update({
        title,
        content,
        image_url: imageUrl,
      })
      .eq("id", postId);
    setLoading(false);
    if (error) {
      setError(error);
    } else {
      navigate(`/posts/${postId}`);
    }
  };

  if (loading) return <div>Loading post...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!post) return <div>No post found.</div>;

  return (
    <div>
      <h1>Edit Post</h1>
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
      </form>
    </div>
  );
}

export default EditPost;
