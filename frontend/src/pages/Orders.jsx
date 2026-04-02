import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Orders.css";

const Orders = () => {
  const orders = useSelector((state) => state.orders.orderList);
  const sortOrders = [...orders].sort((a, b) =>new Date(b.createdAt)- new Date(a.createdAt));
  const navigate = useNavigate();

  return (
    <div className="orders-page">
      <h2>Your Orders</h2>

      {sortOrders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        sortOrders.map((order) => (
          <div
            key={order.id}
            className="order-card"
            onClick={() => navigate(`/orders/${order.id}`)}
          >
            <h3>Order ID : {order.id}</h3>
             <p>
              Date:{" "}
              {order.createdAt
                ? new Date(order.createdAt).toLocaleString()
                : "N/A"}
            </p>
            <p>Products: {" "}
              {order.items.map((item)=>item.title).join(", ")}
            </p>
           
            <p>Items : {order.items.length}</p>
            <p>Total : ${order.total}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
