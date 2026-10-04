import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function Post() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPost();
  }, [id]);

  async function fetchPost() {
    try {
      setLoading(true);
      const response = await fetch(`/posts/${id}`);
      if (!response.ok) throw new Error("Post not found");
      const data = await response.json();
      setPost(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Post not found or failed to load.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm("Delete this post? This cannot be undone.")) return;
    try {
      const response = await fetch(`/posts/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete post");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Error deleting post.");
    }
  }

  if (loading) return <p className="page">Loading…</p>;
  if (error)
    return (
      <div className="page">
        <p className="error-text">{error}</p>
        <Link to="/">Back to all posts</Link>
      </div>
    );

  return (
    <div className="page">
      <article className="post-full">
        <h1>{post.title}</h1>
        <p className="post-meta">
          by {post.author || "Anonymous"} · {formatDate(post.createdAt)}
          {post.updatedAt && post.updatedAt !== post.createdAt && (
            <> · updated {formatDate(post.updatedAt)}</>
          )}
        </p>
        <div className="post-content">
          {post.content.split("\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <div className="post-card-actions">
          <Link to={`/edit/${id}`} className="btn btn-secondary">
            Edit
          </Link>
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
          <Link to="/" className="btn btn-secondary">
            Back
          </Link>
        </div>
      </article>
    </div>
  );
}
