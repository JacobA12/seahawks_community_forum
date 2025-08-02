import PostCard from "./PostCard";
import { Link, Navigate } from "react-router-dom";

const PostFeed = ({ posts }) => {
  return (
    <div className="posts-grid">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostFeed;
