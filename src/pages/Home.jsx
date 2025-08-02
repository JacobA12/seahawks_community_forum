import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { Link } from "react-router-dom";
import PostFeed from "../components/PostFeed";
import SortOptions from "../components/SortOptions";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortValue, setSortValue] = useState("created_at_desc");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);

      let orderColumn = "created_at";
      let ascending = false;
      if (sortValue === "created_at_asc") {
        orderColumn = "created_at";
        ascending = true;
      } else if (sortValue === "upvotes_desc") {
        orderColumn = "upvotes";
        ascending = false;
      }

      try {
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .order(orderColumn, { ascending });

        if (error) {
          setError(error);
          setLoading(false);
        } else {
          setPosts(data);
          setLoading(false);
        }
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [sortValue]);

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
      <SortOptions sortBy={sortValue} onSortChange={setSortValue} />
      {renderContent()}
    </div>
  );
};

export default Home;
