import React from "react";

const tg = window.Telegram.WebApp;
function PlaceOrderForm({ products, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const order = {
      name: tg.initDataUnsafe?.user?.first_name,
      tg_owner: tg.initDataUnsafe?.user?.id,
      product: formData.get("product"),
      quantity: formData.get("quantity"),
      phone: formData.get("phone"),
      adress: formData.get("adress"),
    };
    onSubmit(order);
    tg.close();
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{ width: "300px", margin: "100px auto" }}
      >
        <h1>Замовлення</h1>
        <p>User id: {tg.initDataUnsafe?.user?.id}</p>
        <div style={{ marginBottom: "10px" }}>
          <select
            name="product"
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
          <input
            type="number"
            name="quantity"
            placeholder="Кількість"
            style={{
              width: "60px",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            name="phone"
            placeholder="Ваш телефон"
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
            type="text"
            name="adress"
            placeholder="Адреса доставки"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div>
          <button
            type="submit"
            style={{
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
            Замовити
          </button>
        </div>
      </form>
    </div>
  );
}

export default PlaceOrderForm;
