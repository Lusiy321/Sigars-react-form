import React, { useState } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";

function AddProductForm({ onSubmit }) {
  const [errors, setErrors] = useState({});
  const [category, setCategory] = useState("sigars");
  const [imageUrl, setImageUrl] = useState("");

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
    if (!formData.get("category")) {
      errors.category = "Категорія обов'язкова";
    }
    if (!imageUrl) {
      errors.image = "Зображення обов'язкове";
    }
    return errors;
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload", "products");

    try {
      const response = await axios.post(
        "https://sigars-trade-bot.onrender.com/upload/",
        formData
      );

      setImageUrl(...response.data);
      toast.success("Зображення завантажено", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
      });
    } catch (error) {
      toast.error("Помилка завантаження зображення", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
      });
    }
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
      category: formData.get("category"),
      url: imageUrl,
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
    setCategory("sigars");
    setImageUrl("");
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
      <div style={{ marginBottom: "10px" }}>
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            width: "278px",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid var(--tg-theme-hint-color)",
          }}
        >
          <option value="sigars">Тютюн</option>
          <option value="alco">Алкоголь</option>
          <option value="elf">Ельфбари</option>
        </select>
        {errors.category && (
          <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
            {errors.category}
          </div>
        )}
      </div>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{
            width: "278px",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid var(--tg-theme-hint-color)",
          }}
        />
        {errors.image && (
          <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
            {errors.image}
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
