import React, { useEffect, useState } from "react";
import Select from "react-select";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";

const tg = window.Telegram.WebApp;

function EditProductForm({ products, onSubmit }) {
  useEffect(() => {
    tg.ready();
  }, []);

  const [volume, setVolume] = useState("");
  const [price, setPrice] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(
    products[0]?.name || ""
  );
  const [errors, setErrors] = useState({});

  const handleProductChange = (selectedOption) => {
    const selectedName = selectedOption.value;
    setSelectedProduct(selectedName);
    const product = products.find((product) => product.name === selectedName);
    if (product) {
      setPrice(product.price);
      setVolume(product.quantity);
    }
  };

  const validateForm = () => {
    const errors = {};
    const quantity = parseFloat(volume);
    const priceValue = parseFloat(price);

    if (isNaN(quantity) || quantity <= 0) {
      errors.quantity = "Кількість має бути позитивним числом";
    }
    if (isNaN(priceValue) || priceValue <= 0) {
      errors.price = "Ціна має бути позитивним числом";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      const editProduct = {
        name: selectedProduct,
        quantity: volume,
        price: price,
      };

      onSubmit(editProduct);
      toast.success("Товар оновлено", {
        position: "top-center",
        autoClose: 3000,
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
    } else {
      setErrors(validationErrors);
    }
  };

  const productOptions = products.map((product) => ({
    value: product.name,
    label: (
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={product.url}
          alt={product.name}
          style={{ width: "50px", marginRight: "10px" }}
        />
        {product.name}
      </div>
    ),
  }));

  return (
    <div
      style={{
        backgroundColor: "var(--tg-theme-bg-color)",
        color: "var(--tg-theme-text-color)",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{ width: "300px", margin: "80px auto" }}
      >
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar
          closeOnClick
          pauseOnHover
          draggable
          transition={Slide}
          style={{ width: "400px" }}
        />
        <h1>Редагування</h1>
        <div style={{ marginBottom: "10px" }}>
          <Select
            name="product"
            placeholder="Оберіть товар"
            value={productOptions.find(
              (option) => option.value === selectedProduct
            )}
            onChange={handleProductChange}
            options={productOptions}
            styles={{
              control: (base) => ({
                ...base,
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid var(--tg-theme-hint-color)",
              }),
              option: (base) => ({
                ...base,
                display: "flex",
                alignItems: "center",
                color: "#000000",
              }),
              singleValue: (base) => ({
                ...base,
                display: "flex",
                alignItems: "center",
              }),
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>Кількість:</h3>
          <input
            type="number"
            name="quantity"
            placeholder={`Кількість: ${volume}`}
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            style={{
              width: "100px",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid var(--tg-theme-hint-color)",
            }}
          />
          <div>
            {errors.quantity && (
              <span style={{ color: "red", fontSize: "12px" }}>
                {errors.quantity}
              </span>
            )}
          </div>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <h3>Ціна:</h3>
          <input
            type="number"
            name="price"
            placeholder={`Ціна: ${price}`}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={{
              width: "100px",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid var(--tg-theme-hint-color)",
            }}
          />
          <div>
            {errors.price && (
              <span style={{ color: "red", fontSize: "12px" }}>
                {errors.price}
              </span>
            )}
          </div>
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
            Редагувати
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProductForm;
