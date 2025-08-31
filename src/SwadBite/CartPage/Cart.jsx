import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../HomePAge/Navbar";
import "./Cart.css";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  // Load cart and selections from localStorage
  useEffect(() => {
    let savedCart = JSON.parse(localStorage.getItem("swadbite_cart")) || [];
    if (!Array.isArray(savedCart) && savedCart.items) {
      savedCart = savedCart.items;
    }

    const savedSelected =
      JSON.parse(localStorage.getItem("swadbite_selectedItems")) || [];

    setCart(
      savedCart.map((item) => ({ ...item, quantity: item.quantity || 1 }))
    );
    setSelectedItems(savedSelected);
  }, []);

  // Update total price when cart or selection changes
  useEffect(() => {
    const total = selectedItems.reduce((sum, idx) => {
      const item = cart[idx];
      if (!item) return sum;
      return sum + (item.price || 0) * (item.quantity || 1);
    }, 0);
    setTotalPrice(total);
  }, [cart, selectedItems]);

  // Quantity increase/decrease
  const handleQuantityChange = (index, delta) => {
    setCart((prevCart) => {
      const updated = [...prevCart];
      const item = updated[index];
      if (!item) return prevCart;
      item.quantity = Math.max(1, (item.quantity || 1) + delta);
      localStorage.setItem("swadbite_cart", JSON.stringify(updated));
      return updated;
    });
  };

  // Remove item
  const handleRemove = (index) => {
    setCart((prevCart) => {
      const updated = prevCart.filter((_, i) => i !== index);
      localStorage.setItem("swadbite_cart", JSON.stringify(updated));
      return updated;
    });

    setSelectedItems((prevSelected) => {
      const updatedSelected = prevSelected.filter((i) => i !== index);
      localStorage.setItem(
        "swadbite_selectedItems",
        JSON.stringify(updatedSelected)
      );
      return updatedSelected;
    });
  };

  // Select / deselect items
  const handleSelectItem = (index) => {
    setSelectedItems((prevSelected) => {
      const updated = prevSelected.includes(index)
        ? prevSelected.filter((i) => i !== index)
        : [...prevSelected, index];
      localStorage.setItem("swadbite_selectedItems", JSON.stringify(updated));
      return updated;
    });
  };

  // Proceed to payment
  const handlePayment = () => {
    const itemsToPay = selectedItems.map((idx) => cart[idx]).filter(Boolean);
    if (itemsToPay.length === 0) return;

    localStorage.setItem(
      "swadbite_cart",
      JSON.stringify({ items: itemsToPay })
    );

    // Clear selected meal/plan to avoid conflicts
    localStorage.removeItem("swadbite_selectedMeal");
    localStorage.removeItem("swadbite_selectedPlan");

    navigate("/payment");
  };

  return (
    <>
      <Navbar />
      <div className="cart-page">
        <h1>Your Cart</h1>
        {cart.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          <div className="cart-table">
            <table>
              <thead>
                <tr>
                  <th>Meal</th>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr
                    key={index}
                    className={
                      selectedItems.includes(index) ? "selected-row" : ""
                    }
                    onClick={() => handleSelectItem(index)} // ✅ toggle when row is clicked
                    style={{ cursor: "pointer" }}
                  >
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(index)}
                        onClick={(e) => e.stopPropagation()} // ✅ prevent double toggle
                        onChange={() => handleSelectItem(index)}
                      />
                    </td>

                    <td className="meal-info">
                      <img
                        src={item.image || ""}
                        alt={item.mealName || "Meal"}
                        style={{ width: 50, height: 50 }}
                      />
                      <span>{item.mealName || "Unknown Meal"}</span>
                    </td>
                    <td>{item.description || "-"}</td>
                    <td>
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // ✅ avoid toggling checkbox when adjusting qty
                          handleQuantityChange(index, -1);
                        }}
                      >
                        -
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuantityChange(index, 1);
                        }}
                      >
                        +
                      </button>
                    </td>
                    <td>₹{(item.price || 0) * (item.quantity || 1)}</td>
                    <td>
                      <button
                        className="remove-btn"
                        onClick={(e) => {
                          e.stopPropagation(); // ✅ don’t toggle checkbox when removing
                          handleRemove(index);
                        }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="cart-summary">
              <h3>Total: ₹{totalPrice}</h3>
              <button
                className="checkout-btn"
                onClick={handlePayment}
                disabled={selectedItems.length === 0}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
