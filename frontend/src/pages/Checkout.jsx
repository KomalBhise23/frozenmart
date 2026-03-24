import { useDispatch, useSelector } from "react-redux";
import "./Checkout.css";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../features/cart/cartSlice";
import { addOrder } from "../features/cart/orderSlice";
import { useEffect, useState } from "react";

const Checkout = () => {

  const cartItems = useSelector((state)=>state.cart.cartItems);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    if(cartItems.length === 0 && !orderPlaced){
      navigate("/cart");
    }
  }, [cartItems, navigate, orderPlaced]);

  const totalAmount = cartItems.reduce((total,item)=>{
    return total + item.price * item.quantity;
  },0)


  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if(cartItems.length === 0){
      alert("Your cart is empty");
      return;
    }

    const order = {
      id: Date.now(),
      items: cartItems,
      total: totalAmount,
       date: new Date().toLocaleString()
    };

    console.log("Order placed:", order);

    dispatch(addOrder(order));

    setOrderPlaced(true);

    dispatch(clearCart());

    alert("Order placed successfully!");

    navigate("/ordersuccess");
  };


  return (

    <div className="checkout-page">

      <h2 className="checkout-title">Checkout</h2>

      <div className="checkout-container">

        {/* Shipping Form */}
        <form className="shipping-card" onSubmit={handlePlaceOrder}>

          <h3>Shipping Details</h3>

          <input type="text" placeholder="Full Name" required/>

          <input type="text" placeholder="Address" required/>

          <input type="text" placeholder="City" required/>

          <input type="text" placeholder="Pincode" required/>

          <input type="text" placeholder="Phone Number" required/>

          <button type="submit" className="place-order-btn">
            Place Order
          </button>

        </form>


        {/* Order Summary */}
        <div className="summary-card">

          <h3>Order Summary</h3>

          {cartItems.map((item)=>(
            <div key={item.id} className="summary-item">
               <span>{item.date}</span>
              <span>{item.title}</span>

              <span>
                ${item.price} × {item.quantity}
              </span>
              

            </div>
          ))}

          <div className="summary-total">
            Total : ${totalAmount}
          </div>

        </div>

      </div>

    </div>
  );
};

export default Checkout;