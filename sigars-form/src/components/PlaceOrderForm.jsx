import React, { useState, useEffect } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";

const tg = window.Telegram.WebApp;

function PlaceOrderForm({ products, onSubmit }) {
  const [selectedProduct, setSelectedProduct] = useState(
    products[0]?.name || ""
  );
  const [volume, setVolume] = useState(1);
  const [orderItems, setOrderItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const newTotal = orderItems.reduce(
      (acc, item) => acc + item.price * item.volume,
      0
    );
    setTotalPrice(newTotal);
  }, [orderItems]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const order = {
      name: tg.initDataUnsafe?.user?.first_name,
      tg_owner: tg.initDataUnsafe?.user?.id,
      product: orderItems,
      phone: e.target.phone.value,
      adress: e.target.adress.value,
    };
    onSubmit(order);
    toast.success("Замовлення відправлено", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      transition: Slide,
    });
    setTimeout(() => {
      tg.close();
    }, 3000);
  };

  const handleAddProduct = () => {
    const product = products.find(
      (product) => product.name === selectedProduct
    );
    if (product) {
      setOrderItems([
        ...orderItems,
        { name: selectedProduct, volume, price: product.price },
      ]);
    }
  };

  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setVolume(Number(e.target.value));
  };

  const handleRemoveProduct = (index) => {
    const newOrderItems = orderItems.filter((_, i) => i !== index);
    setOrderItems(newOrderItems);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{ width: "300px", margin: "100px auto" }}
      >
        <ToastContainer />
        <h1>Замовлення</h1>
        <div style={{ marginBottom: "10px" }}>
          <select
            name="product"
            value={selectedProduct}
            onChange={handleProductChange}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid var(--tg-theme-hint-color)",
            }}
          >
            {products.map((product, index) => (
              <option key={index} value={product.name}>
                {product.name} - {product.price} грн.
              </option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="number"
            name="quantity"
            placeholder="Кількість"
            value={volume}
            onChange={handleQuantityChange}
            style={{
              width: "100px",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid var(--tg-theme-hint-color)",
            }}
          />{" "}
        </div>
        <div>
          <button
            type="button"
            onClick={handleAddProduct}
            style={{
              fontSize: "18px",
              width: "100%",
              backgroundColor: "var(--tg-theme-button-color)",
              color: "var(--tg-theme-button-text-color)",
              border: "none",
              padding: "10px",
              borderRadius: "5px",
              cursor: "pointer",
              marginBottom: "20px",
            }}
          >
            Додати товар
          </button>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            name="phone"
            placeholder="Ваш телефон"
            style={{
              width: "278px",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid var(--tg-theme-hint-color)",
            }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            name="adress"
            placeholder="Адреса доставки"
            style={{
              width: "278px",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid var(--tg-theme-hint-color)",
            }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <h2>Ваше замовлення:</h2>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {orderItems.map((item, index) => (
              <li
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                  borderBottom: "1px solid var(--tg-theme-hint-color)",
                }}
              >
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  {item.name} - {item.quantity} шт. -{" "}
                  {item.price * item.quantity} грн.
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveProduct(index)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "red",
                    cursor: "pointer",
                    fontSize: "16px",
                  }}
                >
                  &#x2715;
                </button>
              </li>
            ))}
          </ul>
          <p
            style={{
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            Загальна сума: {totalPrice} грн.
          </p>
        </div>
        <div>
          <button
            type="submit"
            style={{
              fontSize: "18px",
              width: "100%",
              backgroundColor: "var(--tg-theme-button-color)",
              color: "var(--tg-theme-button-text-color)",
              border: "none",
              padding: "10px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Замовити
          </button>
        </div>
      </form>
    </div>
  );
}

export default PlaceOrderForm;
