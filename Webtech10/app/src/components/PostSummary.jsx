import { Link } from "react-router-dom";

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function excerpt(text, maxLen = 140) {
  if (!text) return "";
  return text.length > maxLen ? text.slice(0, maxLen).trim() + "…" : text;
}

export default function PostSummary({ post, onDelete }) {
  const id = post._id;

  return (
    <article className="post-card">
      <div className="post-card-header">
        <h3>
          <Link to={`/post/${id}`}>{post.title}</Link>
        </h3>
        <span className="post-date">{formatDate(post.createdAt)}</span>
      </div>
      <p className="post-author">by {post.author || "Anonymous"}</p>
      <p className="post-excerpt">{excerpt(post.content)}</p>
      <div className="post-card-actions">
        <Link to={`/post/${id}`} className="btn btn-secondary">
          Read
        </Link>
        <Link to={`/edit/${id}`} className="btn btn-secondary">
          Edit
        </Link>
        {onDelete && (
          <button className="btn btn-danger" onClick={() => onDelete(id)}>
            Delete
          </button>
        )}
      </div>
    </article>
  );
}
