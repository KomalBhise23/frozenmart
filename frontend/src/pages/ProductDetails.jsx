import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import products from "../data/products";
import { addToCart } from "../features/cart/cartSlice";
import "./ProductDetails.css"
import { useState } from "react";

const ProductDetails = () => {
  const [added, setAdded] = useState(false);
const {id} = useParams()
const dispatch= useDispatch();
const navigate =useNavigate();
const product = products.find((product)=>product.id === Number(id))
const handleAddToCart =()=>{
    dispatch(addToCart(product))
    setAdded(true);
      setTimeout(() => {
    setAdded(false);
  }, 5000);

}
if (!product) {
  return <p>Product not found</p>;
}
  return (
  <div className="page-container">
  <div className="product-details">
  <img src={product.image} alt={product.name} />

  <div className="product-info">
    <h2>{product.title}</h2>
    <h3>${product.price}</h3>
    <p>{product.description}</p>

    {!added && (
      <button className="add-cart-btn" onClick={handleAddToCart}>
        Add to Cart
      </button>
    )}

    {added && (
      <div className="cart-success">
        <p>✔ Product added to cart</p>

        <div className="cart-actions">
          <button
            className="continue-btn"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>

          <button
            className="cart-btn"
            onClick={() => navigate("/cart")}
          >
            Go to Cart
          </button>
        </div>
      </div>
    )}
  </div>
</div>
</div>
)
}

export default ProductDetails
