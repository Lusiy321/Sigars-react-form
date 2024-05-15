import React from "react";

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
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: "300px",
        margin: "100px auto",
      }}
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
        Додати товар
      </h1>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          name="name"
          placeholder="Назва"
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="number"
          name="quantity"
          placeholder="Кількість"
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="number"
          name="price"
          placeholder="Ціна"
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
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
            width: "200px",
            backgroundColor: "#007bff",
            color: "white",
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
