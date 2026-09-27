import { useState } from "react";
import "./App.css";
import { products, categories } from "./products.js";
import Cart from "./components/Cart.jsx";
import TodoApp from "./components/TodoApp.jsx";

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(60000);
  const [darkMode, setDarkMode] = useState(false);

  // Shopping cart state: array of { id, name, price, qty }
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || p.category === category) &&
      p.price <= maxPrice
  );

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setMaxPrice(60000);
  };

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, qty: 1 }];
    });
    setCartOpen(true);
  };

  const increaseQty = (id) => {
    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, qty: item.qty + 1 } : item)));
  };

  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.qty * item.price, 0);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <header className="navbar">
        <div className="brand">
          <div className="brand-mark">Y</div>
          <div>
            <h1>Your Neighbourhood Market</h1>
            <p>Everyday essentials, thoughtfully collected</p>
          </div>
        </div>
        <div className="nav-actions">
          <button className="cart-toggle" onClick={() => setCartOpen(true)}>
            🛒 Cart <span className="cart-count">{cartCount}</span>
          </button>
          <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "Dark" : "Light"}
            <span className="toggle"><span></span></span>
          </button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div>
            <p className="eyebrow">THE NEIGHBOURHOOD COLLECTION</p>
            <h2>Everything you need,<br /><em>closer to home.</em></h2>
            <p className="hero-copy">Explore everyday finds across technology, fashion, home, beauty, groceries and stationery.</p>
            <div className="stats">
              <div><strong>{products.length}</strong><span>Products</span></div>
              <div><strong>6</strong><span>Categories</span></div>
              <div><strong>{filteredProducts.length}</strong><span>Showing</span></div>
            </div>
          </div>
          <div className="hero-art">
            <div className="shape big">YNM</div>
            <div className="shape small">LOCAL<br />FINDS</div>
          </div>
        </section>

        <section className="catalog">
          <div className="section-title">
            <div>
              <p className="eyebrow">BROWSE THE MARKET</p>
              <h2>Product Catalog</h2>
            </div>
            <p>Search, select a category or adjust your budget.</p>
          </div>
          <div className="filters">
            <div className="search-row">
              <input placeholder="Search the market..." value={search} onChange={(e) => setSearch(e.target.value)} />
              <button onClick={resetFilters}>Reset filters</button>
            </div>
            <div className="filter-grid">
              <div>
                <label>CATEGORY</label>
                <div className="chips">
                  {categories.map((c) => (
                    <button key={c} className={category === c ? "chip active" : "chip"} onClick={() => setCategory(c)}>{c}</button>
                  ))}
                </div>
              </div>
              <div className="price-box">
                <div><label>MAXIMUM PRICE</label><strong>₹{maxPrice.toLocaleString("en-IN")}</strong></div>
                <input type="range" min="0" max="60000" step="500" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
                <small><span>₹0</span><span>₹60,000</span></small>
              </div>
            </div>
          </div>

          <div className="results">
            <span><strong>{filteredProducts.length}</strong> products</span>
            <span>{category === "All" ? "All categories" : category}</span>
          </div>

          {filteredProducts.length ? (
            <div className="grid">
              {filteredProducts.map((p, index) => (
                <article className="card" key={p.id}>
                  <div className={`visual v${index % 4}`}>
                    <span className="num">{String(p.id).padStart(3, "0")}</span>
                    <div className="code">{p.code}</div>
                    <span className="tag">{p.category}</span>
                  </div>
                  <div className="info">
                    <p className="cat">{p.category}</p>
                    <div className="name-price">
                      <h3>{p.name}</h3>
                      <strong>₹{p.price.toLocaleString("en-IN")}</strong>
                    </div>
                    <div className="bottom">
                      <span className={p.quantity === 0 ? "stock out" : "stock"}>
                        <i></i>{p.quantity === 0 ? "Out of Stock" : `${p.quantity} available`}
                      </span>
                      <button
                        className="add-to-cart"
                        disabled={p.quantity === 0}
                        onClick={() => addToCart(p)}
                      >
                        {p.quantity === 0 ? "Unavailable" : "Add to cart"}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty">
              <h3>No products found</h3>
              <p>Try changing your filters.</p>
              <button onClick={resetFilters}>View all products</button>
            </div>
          )}
        </section>

        <TodoApp />
      </main>

      <footer>
        <strong>Your Neighbourhood Market</strong>
        <span>Online Shopping Product Catalog · MERN Stack Lab</span>
      </footer>

      {cartOpen && (
        <Cart
          items={cartItems}
          onClose={() => setCartOpen(false)}
          onIncrease={increaseQty}
          onDecrease={decreaseQty}
          onRemove={removeFromCart}
          total={cartTotal}
        />
      )}
    </div>
  );
}

export default App;
