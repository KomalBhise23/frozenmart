import React, { useState } from "react";
import products from "../data/products";
import "./ProductTab.css";
import { addToCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const ProductsTab = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Dynamic categories
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  // ✅ Filter logic
  let filteredProducts = products.filter((p) => {
    const matchCategory =
      selectedCategory === "All" || p.category === selectedCategory;

    const matchSearch = p.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchCategory && matchSearch;
  });

  // ✅ Sorting
  if (sortOption === "low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === "high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="product-page">
      <h2 className="product-title">All Products</h2>

      {/* 🔍 Search + Sort */}
   <div className="product-controls">
  <div className="controls-inner">
    
    <input
      type="text"
      placeholder="Search products..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="product-search"
    />

    <select
      value={sortOption}
      onChange={(e) => setSortOption(e.target.value)}
      className="product-sort"
    >
      <option value="">Sort By</option>
      <option value="low">Price: Low → High</option>
      <option value="high">Price: High → Low</option>
    </select>

  </div>
</div>

      {/* 📂 Category Filter */}
      <div className="category-filter">
        {categories.map((cat, index) => (
          <button
            key={index}
            onClick={() => setSelectedCategory(cat)}
            className={`category-btn ${
              selectedCategory === cat ? "active" : ""
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 🛒 Products */}
      <div className="product-grid">
        {filteredProducts.length === 0 ? (
          <p>No products found</p>
        ) : (
          filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
                onClick={() => navigate(`/product/${product.id}`)}
              />

              <h3 className="product-name">{product.title}</h3>

              <p className="product-price">₹{product.price}</p>

              <span className="product-category">
                {product.category}
              </span>

              <button
                className="add-cart-btn"
                onClick={() => dispatch(addToCart(product))}
              >
                Add to Cart
              </button>

            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductsTab;