import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { logout } from "../features/auth/authSlice";
import { setSearchTerm } from "../features/search/searchSlice";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const token = useSelector((state) => state.auth.token);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("USER:", user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className="navbar">
        {/* Left Section */}
        <div className="nav-left">
          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </div>

          <h2 className="logo">FrozenMart</h2>
          <div
            className="mobile-search"
            onClick={() => setShowSearch(!showSearch)}
          >
            🔍
          </div>
          {/* Mobile Cart */}
          <div className="mobile-cart">
            <Link to="/cart" className="cart">
              🛒
              <span className="cart-badge">{totalQuantity}</span>
            </Link>
          </div>

          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/category">Category</Link>
          </div>
        </div>

        {/* Center Section */}
        <div className="nav-center">
          <input
            type="text"
            placeholder="Search products..."
            onChange={(e) => {
              setSearch(e.target.value);
              dispatch(setSearchTerm(e.target.value));
            }}
          />
        </div>

        {/* Right Section */}
        <div className="nav-right">
          {token ? (
            <>
              <span className="user-name"> Hi, {user?.name || "User"}</span>
              <Link to="/login" onClick={handleLogout}>
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
          {token && <Link to="/orders">Orders</Link>}

          <Link to="/cart" className="cart">
            Cart
            <span className="cart-badge">{totalQuantity}</span>
          </Link>
        </div>
      </nav>

      {showSearch && (
        <div className="mobile-search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              dispatch(setSearchTerm(e.target.value));
            }}
          />
        </div>
      )}

      {/* Mobile Drawer */}
      <div className={`mobile-menu ${menuOpen ? "active" : ""}`}>
        <h3 className="mobile-title">FrozenMart</h3>

        <Link to="/" onClick={closeMenu}>
          Home
        </Link>
        <Link to="/products" onClick={closeMenu}>
          Products
        </Link>
        <Link to="/category" onClick={closeMenu}>
          Category
        </Link>
        {token ? (
          <>
            <span className="user-name"> Hi, {user?.name || "User"}</span>
            <Link
              to="/login"
              onClick={() => {
                handleLogout();
                closeMenu();
              }}
            >
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" onClick={closeMenu}>
              Login
            </Link>
            <Link to="/register" onClick={closeMenu}>
              Register
            </Link>
          </>
        )}
        {token && (
          <Link to="/orders" onClick={closeMenu}>
            Orders
          </Link>
        )}
        <Link to="/cart" onClick={closeMenu}>
          Cart ({totalQuantity})
        </Link>
      </div>

      {menuOpen && <div className="overlay" onClick={closeMenu}></div>}
    </>
  );
};

export default Navbar;
