import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddProductForm from "./components/AddProductForm";
import PlaceOrderForm from "./components/PlaceOrderForm";
import EditProductForm from "./components/EditProductForm";

const tg = window.Telegram.WebApp;
function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    tg.ready();
    response();
  }, []);
  async function response() {
    try {
      const res = await fetch("https://sigars-trade-bot.onrender.com/product");
      const data = await res.json();

      return setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

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
    setTimeout(() => {
      tg.close();
    }, 3000);
    return;
  };

  const handleEditProduct = async (order) => {
    await fetch(`https://sigars-trade-bot.onrender.com/edit-product`, {
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
          <Route
            path="/edit"
            element={
              <EditProductForm
                products={products}
                onSubmit={handleEditProduct}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

const Home = () => <div>Server loading...</div>;

export default App;
