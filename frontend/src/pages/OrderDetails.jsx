import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./OrderDetails.css";

const OrderDetails = () => {

  const { id } = useParams();

  const orders = useSelector((state) => state.orders.orderList);

const order = orders.find((o) => o.id === Number(id));

  if (!order) {
    return <p>Order not found</p>;
  }

  return (

    <div className="order-details-page">

      <h2>Order Details</h2>

      <div className="order-info">

        <p><b>Order ID:</b> {order.id}</p>

        <p><b>Total:</b> ${order.total}</p>

      </div>

      <div className="order-items">

        {order.items.map((item) => (

          <div key={item.id} className="order-item">

            <img src={item.image} alt={item.title} />

            <div>

              <h4>{item.title}</h4>

              <p>${item.price}</p>

              <p>Qty : {item.quantity}</p>
              

            </div>

          </div>

        ))}

      </div>

    </div>

  );

};

export default OrderDetails;