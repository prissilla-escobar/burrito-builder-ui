import React from "react";
import "./Orders.css";

const Orders = ({ allOrders }) => {
  const orderEls = allOrders.map((order) => {
    return (
      <div className="order" key={order.id}>
        <h3>{order.name}</h3>
        <ul className="ingredient-list">
          {order.ingredients.map((ingredient) => {
            return <li>{ingredient}</li>;
          })}
        </ul>
      </div>
    );
  });

  return (
    <section className="orders-container" key={orderEls.key}>
      <div className="order-card-container">
        {orderEls.length ? orderEls : <p>No orders yet!</p>}
      </div>
    </section>
  );
};

export default Orders;
