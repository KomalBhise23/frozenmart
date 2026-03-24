import { useDispatch, useSelector } from "react-redux";
import products from "../data/products";
import "./Home.css";
import { addToCart } from "../features/cart/cartSlice";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Home() {
  const searchTerm = useSelector((state)=> state.search.searchTerm)
  const dispatch= useDispatch();
  const navigate = useNavigate();
  const filteredProducts = products.filter((product)=>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  )
  return (
    <div>
      {/* 🔹 Hero Section */}
     
      <div className="hero-section">
        <h1>Welcome to FrozenMart</h1>
        <p>Premium Frozen Vegetables & Fruit Pulps</p>
      </div>

      {/* 🔹 Products Section */}
      <div className="products-container">
        {filteredProducts.length === 0 ? (
  <p>No products found</p>
) :filteredProducts.map((product) => (
          <div className="product-card" key={product.id} >
            <img src={product.image} alt={product.title} onClick={()=>navigate(`/product/${product.id}`)} />

            <h3>{product.title}</h3>
            <p>₹{product.price}</p>
            <p>{product.category}</p>
{}
            <button onClick={()=>{console.log(product);dispatch(addToCart(product))}}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;