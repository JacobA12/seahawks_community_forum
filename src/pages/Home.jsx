import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { Link } from "react-router-dom";
import PostFeed from "../components/PostFeed";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase.from("posts").select("*");
        if (error) {
          setError(error);
          setLoading(false);
        } else {
          setLoading(false);
          setPosts(data);
          setError(null);
          console.log(`Post Data:`, data);
        }
      } catch (error) {
        setError(error);
      }
    };

    fetchPosts();
  }, []);

  const renderContent = () => {
    if (loading) return <p className="loading-state">Loading posts...</p>;
    if (error) return <p className="error-state">Error: {error.message}</p>;
    if (posts.length === 0) {
      return (
        <div className="empty-state">
          <h3>No posts created yet!</h3>
          <p>Create a post to see them here!</p>
          <Link to="/create" className="btn-create-first-post">
            Create Your First Post
          </Link>
        </div>
      );
    }

    return <PostFeed posts={posts} />;
  };

  return (
    <div className="posts-container">
      <div className="posts-header">
        <h1 className="posts-header"></h1>
        <p className="posts-subtitle"></p>
      </div>
      {renderContent()}
    </div>
  );
};

export default Home;
