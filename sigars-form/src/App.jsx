import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddProductForm from "./components/AddProductForm";
import PlaceOrderForm from "./components/PlaceOrderForm";

const tg = window.Telegram.WebApp;
function App() {
  tg.ready();
  const handleAddProduct = (product) => {
    console.log(product);
  };
  const products = [
    { name: "Malboro" },
    { name: "Winston" },
    { name: "Davidoff" },
  ];
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
// function App() {
// useEffect(() => {
//   tg.ready();
// }, []);

//   const onClose = () => {
//     tg.close();
//   };

//   return (
//     <div className="App">
//       <Button onClick={onClose} />
//     </div>
//   );
// }

// export default App;
