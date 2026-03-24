import { useNavigate } from "react-router-dom";
import "./OrderSuccess.css";

function OrderSuccess() {

    const navigate = useNavigate();

    return (
        <div className="order-success-page">

            <div className="success-card">

                <h2>✅ Order Placed Successfully</h2>

                <p>Your frozen veggies will be delivered soon.</p>

                <div className="success-buttons">

                    <button onClick={() => navigate("/orders")}>
                        View Orders
                    </button>

                    <button onClick={() => navigate("/")}>
                        Continue Shopping
                    </button>

                </div>

            </div>

        </div>
    );
}

export default OrderSuccess;