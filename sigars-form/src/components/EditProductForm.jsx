import React, { useEffect, useState } from "react";

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
    tg.close();
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{ width: "300px", margin: "100px auto" }}
      >
        <h1
          style={{
            marginLeft: "10px",
            padding: "10px",
            paddingLeft: "40px",
            borderRadius: "5px",
            marginBottom: "20px",
            backgroundColor: "#007bff",
            color: "#ffffff",
          }}
        >
          Редагування
        </h1>
        <div style={{ marginBottom: "10px" }}>
          <select
            name="product"
            value={selectedProduct}
            onChange={handleProductChange}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
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
          <p>Кількість:</p>
          <input
            type="number"
            name="quantity"
            placeholder={`Кількість: ${volume}`}
            defaultValue={volume}
            style={{
              width: "60px",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          шт.
        </div>
        <div style={{ marginBottom: "20px" }}>
          <p>Ціна:</p>
          <input
            type="number"
            name="price"
            placeholder={`Ціна: ${price}`}
            defaultValue={price}
            style={{
              width: "60px",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          грн.
        </div>
        <div>
          <button
            type="submit"
            style={{
              fontSize: "18px",
              marginLeft: "10px",
              width: "100%",
              backgroundColor: "#007bff",
              color: "white",
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
