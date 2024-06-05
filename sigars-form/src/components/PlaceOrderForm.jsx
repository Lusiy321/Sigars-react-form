import React, { useState, useEffect } from "react";
import Select from "react-select";
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
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const newTotal = orderItems.reduce(
      (acc, item) => acc + item.price * item.volume,
      0
    );
    setTotalPrice(newTotal);
  }, [orderItems]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      const order = {
        name: tg.initDataUnsafe?.user?.first_name,
        tg_owner: tg.initDataUnsafe?.user?.id,
        product: orderItems,
        phone: phone,
        adress: address,
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
    } else {
      setErrors(validationErrors);
    }
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

  const validateForm = () => {
    const errors = {};
    if (!phone) {
      errors.phone = "Телефон обов'язковий";
    }
    if (!address) {
      errors.address = "Адреса обов'язкова";
    }
    return errors;
  };

  const handleProductChange = (selectedOption) => {
    setSelectedProduct(selectedOption.value);
  };

  const handleQuantityChange = (e) => {
    setVolume(Number(e.target.value));
  };

  const handleRemoveProduct = (index) => {
    const newOrderItems = orderItems.filter((_, i) => i !== index);
    setOrderItems(newOrderItems);
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
        {product.name} - {product.price} грн.
      </div>
    ),
  }));

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{ width: "300px", margin: "100px auto" }}
      >
        <ToastContainer />
        <h1>Замовлення</h1>
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
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{
              width: "278px",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid var(--tg-theme-hint-color)",
            }}
          />
          {errors.phone && (
            <span style={{ color: "red", fontSize: "12px" }}>
              {errors.phone}
            </span>
          )}
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            name="adress"
            placeholder="Адреса доставки"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{
              width: "278px",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid var(--tg-theme-hint-color)",
            }}
          />
          {errors.address && (
            <span style={{ color: "red", fontSize: "12px" }}>
              {errors.address}
            </span>
          )}
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
                  {item.name} - {item.volume} шт. - {item.price * item.volume}{" "}
                  грн.
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
