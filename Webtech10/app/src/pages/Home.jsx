import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostSummary from "../components/PostSummary.jsx";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      setLoading(true);
      const response = await fetch("/posts");
      if (!response.ok) throw new Error("Failed to load posts");
      const data = await response.json();
      setPosts(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Could not load posts. Is the API server running?");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this post? This cannot be undone.")) return;
    try {
      const response = await fetch(`/posts/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete post");
      setPosts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting post.");
    }
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>All Posts</h1>
        <Link to="/create" className="btn btn-primary">
          + New Post
        </Link>
      </div>

      {loading && <p>Loading posts…</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && !error && posts.length === 0 && (
        <p className="empty-state">
          No posts yet. <Link to="/create">Create the first one!</Link>
        </p>
      )}

      <div className="post-list">
        {posts.map((post) => (
          <PostSummary key={post._id} post={post} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}
