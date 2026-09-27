function Cart({ items, onClose, onIncrease, onDecrease, onRemove, total }) {
  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h3>Your Cart</h3>
          <button className="cart-close" onClick={onClose}>✕</button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty.</p>
          </div>
        ) : (
          <div className="cart-items">
            {items.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-info">
                  <strong>{item.name}</strong>
                  <span>₹{item.price.toLocaleString("en-IN")} each</span>
                </div>
                <div className="cart-item-controls">
                  <button onClick={() => onDecrease(item.id)}>−</button>
                  <span>{item.qty}</span>
                  <button onClick={() => onIncrease(item.id)}>+</button>
                </div>
                <div className="cart-item-subtotal">
                  ₹{(item.price * item.qty).toLocaleString("en-IN")}
                </div>
                <button className="cart-item-remove" onClick={() => onRemove(item.id)}>Remove</button>
              </div>
            ))}
          </div>
        )}

        <div className="cart-footer">
          <div className="cart-total">
            <span>Total</span>
            <strong>₹{total.toLocaleString("en-IN")}</strong>
          </div>
          <button className="cart-checkout" disabled={items.length === 0}>Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
