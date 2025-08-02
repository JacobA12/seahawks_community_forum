import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <div className="post-card">
      <div className="post-title">
        <Link to={`/post/${post.id}`}>{post.title}</Link>
        <div className="post-content">
          <p>{post.content}</p>
          <img src={post.image_url} alt="Attached image to post" height={200} />
        </div>
        <div className="post-footer">
          <p>Upvotes: {post.upvotes}</p>
          <p>Posted on: {new Date(post.created_at).toLocaleDateString()}</p>
          <p>Created by: {post.user_id}</p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
