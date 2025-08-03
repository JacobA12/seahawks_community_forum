import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import EditPostForm from "../components/EditPostForm";

function EditPost() {
  const { id: postId } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostDetail = async () => {
      setLoading(true);
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
        }
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchPostDetail();
  }, [postId]);

  // Handle form submission (update post)
  const handleUpdate = async (updatedFields) => {
    setLoading(true);
    const { error } = await supabase
      .from("posts")
      .update(updatedFields)
      .eq("id", postId);
    setLoading(false);
    if (error) {
      setError(error);
    } else {
      navigate(`/posts/${postId}`);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    const { error } = await supabase.from("posts").delete().eq("id", postId);
    setLoading(false);
    if (error) {
      setError(error);
    } else {
      navigate("/");
    }
  };

  if (loading) return <div>Loading post...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error.message}</div>;
  if (!post) return <div>No post found.</div>;

  return (
    <div>
      <h1>Edit Post</h1>
      <EditPostForm
        initialValues={post}
        onSubmit={handleUpdate}
        onDelete={handleDelete}
        loading={loading}
        error={error}
      />
    </div>
  );
}

export default EditPost;
