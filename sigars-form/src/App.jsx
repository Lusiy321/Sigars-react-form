import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddProductForm from "./components/AddProductForm";
import PlaceOrderForm from "./components/PlaceOrderForm";

const tg = window.Telegram.WebApp;
function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    tg.ready();
  }, []);

  async function response() {
    try {
      const res = await fetch("https://sigars-trade-bot.onrender.com/product");
      const data = await res.json();

      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }
  response();
  const handleAddProduct = async (product) => {
    await fetch(`https://sigars-trade-bot.onrender.com/create-product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    return;
  };

  const handlePlaceOrder = async (order) => {
    await fetch(`https://sigars-trade-bot.onrender.com/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
    return;
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/product"
            element={<AddProductForm onSubmit={handleAddProduct} />}
          />
          <Route
            path="/order"
            element={
              <PlaceOrderForm products={products} onSubmit={handlePlaceOrder} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

const Home = () => <div>Hello</div>;

export default App;
