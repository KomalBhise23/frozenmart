import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../features/cart/cartSlice"; 
import "./Cart.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const deliveryFee = subtotal > 0 ? 40 : 0;
  const totalAmount = subtotal + deliveryFee;

 if(cartItems.length === 0){
  return (
    <div className="empty-cart">
      <h2>Your Cart is Empty 🛒</h2>
      <button onClick={() => navigate("/")}>
        Continue Shopping
      </button>
    </div>
  );
}

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      <div className="cart-layout">
        {/* LEFT SIDE - CART ITEMS */}
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-left">
                <img src={item.image} alt={item.title} />
              </div>

              <div className="cart-item-details">
                <h4>{item.title}</h4>
                <p>Price: ₹{item.price}</p>

                <div className="quantity-control">
                  <button onClick={() => dispatch(decreaseQuantity(item.id))}>
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button onClick={() => dispatch(increaseQuantity(item.id))}>
                    +
                  </button>
                </div>
              </div>

              <div className="cart-item-actions">
                <p className="item-subtotal">
                  ₹{item.price * item.quantity}
                </p>

                <button
                  className="remove-btn"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE - ORDER SUMMARY */}
        <div className="cart-summary">
          <h3>Order Summary</h3>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="summary-row">
            <span>Delivery</span>
            <span>₹{deliveryFee}</span>
          </div>

          <hr />

          <div className="summary-row total">
            <span>Total</span>
            <span>₹{totalAmount}</span>
          </div>

          <button className="checkout-btn" onClick={()=>navigate("/checkout")}>
            Proceed to Checkout
          </button>

          <button
            className="clear-cart-btn"
            onClick={() => dispatch(clearCart())}
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;