import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Orders.css";

const Orders = () => {

  const orders = useSelector((state) => state.orders.orderList);
  const navigate = useNavigate();

  return (

    <div className="orders-page">

      <h2>Your Orders</h2>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (

        orders.map((order) => (

          <div
            key={order.id}
            className="order-card"
            onClick={() => navigate(`/orders/${order.id}`)}
          >

            <h3>Order ID : {order.id}</h3>

            <p>Items : {order.items.length}</p>
            <p>Total : ${order.total}</p>
          

          </div>

        ))

      )}

    </div>

  );

};

export default Orders;