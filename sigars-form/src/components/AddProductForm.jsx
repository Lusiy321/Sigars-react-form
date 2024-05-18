import React from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";
function AddProductForm({ onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const product = {
      name: formData.get("name"),
      quantity: parseInt(formData.get("quantity")),
      price: parseInt(formData.get("price")),
    };
    onSubmit(product);
    toast.success("Товар додано", {
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
    <form
      onSubmit={handleSubmit}
      style={{
        width: "300px",
        margin: "100px auto",
      }}
    >
      <ToastContainer />
      <h1>Додати товар</h1>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          name="name"
          placeholder="Назва"
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
          type="number"
          name="quantity"
          placeholder="Кількість"
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
          type="number"
          name="price"
          placeholder="Ціна"
          style={{
            width: "278px",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid var(--tg-theme-hint-color)",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
          Додати
        </button>
      </div>
    </form>
  );
}

export default AddProductForm;
