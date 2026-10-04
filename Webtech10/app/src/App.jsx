import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Create from "./pages/Create.jsx";
import Post from "./pages/Post.jsx";
import Archive from "./pages/Archive.jsx";

export default function App() {
  return (
    <div className="app-shell">
      <header className="navbar">
        <div className="navbar-inner">
          <NavLink to="/" className="brand">
            📝 Blog Manager
          </NavLink>
          <nav className="nav-links">
            <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
              Home
            </NavLink>
            <NavLink to="/create" className={({ isActive }) => (isActive ? "active" : "")}>
              New Post
            </NavLink>
            <NavLink to="/archive" className={({ isActive }) => (isActive ? "active" : "")}>
              Archive
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/edit/:id" element={<Create />} />
          <Route path="/archive" element={<Archive />} />
        </Routes>
      </main>
    </div>
  );
}
