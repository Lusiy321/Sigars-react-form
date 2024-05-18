import React from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";
const tg = window.Telegram.WebApp;
function PlaceOrderForm({ products, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const selectedProduct = products.find(
      (product) => product.name === formData.get("product")
    );
    const order = {
      name: tg.initDataUnsafe?.user?.first_name,
      tg_owner: tg.initDataUnsafe?.user?.id,
      product: [
        {
          name: formData.get("product"),
          volume: formData.get("quantity"),
          price: selectedProduct ? selectedProduct.price : 0,
        },
      ],
      quantity: formData.get("quantity"),
      phone: formData.get("phone"),
      adress: formData.get("adress"),
    };
    onSubmit(order);
    toast.success("Замовлення виконано", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      transition: Slide,
    });
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
            style={{
              width: "100px",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid var(--tg-theme-hint-color)",
            }}
          />{" "}
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
