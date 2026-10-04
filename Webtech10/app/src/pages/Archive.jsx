import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function groupByMonth(posts) {
  const groups = {};
  for (const post of posts) {
    const d = post.createdAt ? new Date(post.createdAt) : new Date();
    const key = d.toLocaleDateString(undefined, { year: "numeric", month: "long" });
    if (!groups[key]) groups[key] = [];
    groups[key].push(post);
  }
  return groups;
}

export default function Archive() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("/posts");
        if (!response.ok) throw new Error("Failed to load posts");
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error(err);
        setError("Could not load the archive.");
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  if (loading) return <p className="page">Loading…</p>;
  if (error) return <p className="page error-text">{error}</p>;

  const groups = groupByMonth(posts);
  const monthKeys = Object.keys(groups);

  return (
    <div className="page">
      <h1>Archive</h1>
      {monthKeys.length === 0 && <p className="empty-state">No posts yet.</p>}

      {monthKeys.map((month) => (
        <section key={month} className="archive-group">
          <h2>{month}</h2>
          <ul className="archive-list">
            {groups[month].map((post) => (
              <li key={post._id}>
                <Link to={`/post/${post._id}`}>{post.title}</Link>
                <span className="archive-author"> — {post.author || "Anonymous"}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
