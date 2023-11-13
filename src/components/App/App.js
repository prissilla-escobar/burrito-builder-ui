import { useEffect, useState } from "react";
import "./App.css";
import { getOrders } from "../../apiCalls";
import Orders from "../../components/Orders/Orders";
import OrderForm from "../../components/OrderForm/OrderForm";

function App() {
  const [allOrders, setAllOrders] = useState([])

  useEffect(() => {
    getOrders()
      .then(data => setAllOrders(data.orders))
      .catch((err) => console.error("Error fetching:", err));
  }, []);

  const addOrder = (newOrder) => {
    setAllOrders([...allOrders, newOrder])
  }

  const postForm = (orderEntered) => {
    const body = {
      name: orderEntered.name,
      ingredients: orderEntered.ingredients
    }

    return fetch('http://localhost:3001/api/v1/orders', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => addOrder(data))
  }


  return (
    <main className="App">
      <header>
        <h1>Burrito Builder</h1>
        <OrderForm postForm={postForm} />
      </header>

      <Orders allOrders={allOrders} />
    </main>
  );
}

export default App;
