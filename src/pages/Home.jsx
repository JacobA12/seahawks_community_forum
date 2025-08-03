import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { Link } from "react-router-dom";
import PostFeed from "../components/PostFeed";
import SortOptions from "../components/SortOptions";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortValue, setSortValue] = useState("created_at_desc");
  const [searchTerm, setSearchTerm] = useState("");

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

  // Filter posts by title
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderContent = () => {
    if (loading) return <p className="loading-state">Loading posts...</p>;
    if (error) return <p className="error-state">Error: {error.message}</p>;
    if (filteredPosts.length === 0) {
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

    return <PostFeed posts={filteredPosts} />;
  };

  return (
    <div className="posts-container">
      <div className="posts-header">
        <h1 className="posts-title">🏈 Seahawks Community Forum</h1>
        <p className="posts-subtitle">Join the conversation with fellow 12s!</p>
      </div>

      <div className="forum-controls">
        <SearchBar onSearch={setSearchTerm} currentSearchTerm={searchTerm} />
        <SortOptions sortBy={sortValue} onSortChange={setSortValue} />
      </div>

      {renderContent()}
    </div>
  );
};

export default Home;
