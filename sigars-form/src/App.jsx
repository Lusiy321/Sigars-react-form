import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddProductForm from "./components/AddProductForm";
import PlaceOrderForm from "./components/PlaceOrderForm";

const tg = window.Telegram.WebApp;
function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    try {
      const response = async () =>
        await fetch("https://sigars-trade-bot.onrender.com/product");
      const data = response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }

    tg.ready();
  }, []);
  const handleAddProduct = async (product) => {
    console.log(product);
    await fetch(`https://sigars-trade-bot.onrender.com/create-product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    return;
  };

  const handlePlaceOrder = (order) => {
    // Handle placing order logic here
    console.log("Placing order:", order);
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

const Home = () => (
  <div>
    Hello
    <Link to="/product">Add Product</Link>
    <Link to="/order">Place Order</Link>
  </div>
);

export default App;
