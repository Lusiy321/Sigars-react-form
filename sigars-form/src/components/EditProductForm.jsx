import React, { useEffect, useState } from "react";
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

  const handleProductChange = (e) => {
    const selectedName = e.target.value;
    setSelectedProduct(selectedName);
    const product = products.find((product) => product.name === selectedName);
    if (product) {
      setPrice(product.price);
      setVolume(product.quantity);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const editProduct = {
      name: formData.get("product"),
      quantity: formData.get("quantity"),
      price: formData.get("price"),
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
  };

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
                {product.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>Кількість:</h3>
          <input
            type="number"
            name="quantity"
            placeholder={`Кількість: ${volume}`}
            defaultValue={volume}
            style={{
              width: "100px",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid var(--tg-theme-hint-color)",
            }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <h3>Ціна:</h3>
          <input
            type="number"
            name="price"
            placeholder={`Ціна: ${price}`}
            defaultValue={price}
            style={{
              width: "100px",
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
            Редагувати
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProductForm;
