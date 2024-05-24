import React, { useState } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";

function AddProductForm({ onSubmit }) {
  const [errors, setErrors] = useState({});

  const validateForm = (formData) => {
    const errors = {};
    if (!formData.get("name")) {
      errors.name = "Назва обов'язкова";
    }
    const quantity = parseInt(formData.get("quantity"));
    if (!formData.get("quantity") || isNaN(quantity) || quantity <= 0) {
      errors.quantity = "Кількість повинна бути позитивним числом";
    }
    const price = parseInt(formData.get("price"));
    if (!formData.get("price") || isNaN(price) || price <= 0) {
      errors.price = "Ціна повинна бути позитивним числом";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
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
    setErrors({});
    e.target.reset();
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
        {errors.name && (
          <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
            {errors.name}
          </div>
        )}
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
        {errors.quantity && (
          <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
            {errors.quantity}
          </div>
        )}
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
        {errors.price && (
          <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
            {errors.price}
          </div>
        )}
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
