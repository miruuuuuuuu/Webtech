import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Create() {
  const { id } = useParams(); // present when editing (/edit/:id)
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({ title: "", author: "", content: "" });
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isEditing) return;

    async function fetchPost() {
      try {
        const response = await fetch(`/posts/${id}`);
        if (!response.ok) throw new Error("Post not found");
        const data = await response.json();
        setForm({
          title: data.title || "",
          author: data.author || "",
          content: data.content || "",
        });
      } catch (err) {
        console.error(err);
        setError("Could not load post for editing.");
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id, isEditing]);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.title.trim() || !form.content.trim()) {
      setError("Title and content are required.");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const url = isEditing ? `/posts/${id}` : "/posts";
      const method = isEditing ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Failed to save post");

      navigate(isEditing ? `/post/${id}` : "/");
    } catch (err) {
      console.error(err);
      setError("Something went wrong saving the post.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="page">Loading…</p>;

  return (
    <div className="page">
      <h1>{isEditing ? "Edit Post" : "Create New Post"}</h1>

      {error && <p className="error-text">{error}</p>}

      <form onSubmit={handleSubmit} className="post-form">
        <label>
          Title
          <input
            type="text"
            value={form.title}
            onChange={(e) => updateField("title", e.target.value)}
            placeholder="Post title"
            required
          />
        </label>

        <label>
          Author
          <input
            type="text"
            value={form.author}
            onChange={(e) => updateField("author", e.target.value)}
            placeholder="Your name (optional)"
          />
        </label>

        <label>
          Content
          <textarea
            value={form.content}
            onChange={(e) => updateField("content", e.target.value)}
            placeholder="Write your post here..."
            rows={12}
            required
          />
        </label>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? "Saving…" : isEditing ? "Update Post" : "Publish Post"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
