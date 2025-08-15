import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../HomePAge/Navbar";
import './Cart.css';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("swadbite_cart")) || [];
    const savedSelected = JSON.parse(localStorage.getItem("swadbite_selectedItems")) || [];
    setCart(savedCart.map(item => ({ ...item, quantity: item.quantity || 1 })));
    setSelectedItems(savedSelected);
  }, []);

  useEffect(() => {
    const total = selectedItems.reduce((sum, idx) => {
      const item = cart[idx];
      return item && typeof item.price === "number" ? sum + item.price * (item.quantity || 1) : sum;
    }, 0);
    setTotalPrice(total);
  }, [cart, selectedItems]);

  const handleQuantityChange = (index, delta) => {
    setCart(prevCart => {
      const updatedCart = [...prevCart];
      updatedCart[index].quantity = Math.max(1, updatedCart[index].quantity + delta);
      localStorage.setItem("swadbite_cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleRemove = (index) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter((_, i) => i !== index);
      localStorage.setItem("swadbite_cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
    setSelectedItems(prevSelected => prevSelected.filter(i => i !== index));
    localStorage.setItem("swadbite_selectedItems", JSON.stringify(selectedItems.filter(i => i !== index)));
  };

  const handleSelectItem = (index) => {
  setSelectedItems(prevSelected => {
    const updatedSelection = prevSelected.includes(index) 
      ? prevSelected.filter(i => i !== index) 
      : [...prevSelected, index];
    localStorage.setItem("swadbite_selectedItems", JSON.stringify(updatedSelection));
    return updatedSelection;
  });
};


  const handlePayment = () => {
  // Store actual selected item objects
  const itemsToPay = selectedItems.map(idx => cart[idx]).filter(item => item);

  localStorage.setItem("swadbite_payment_data", JSON.stringify({
    items: itemsToPay,
    baseFee: itemsToPay.reduce((sum, item) => sum + item.price * item.quantity, 0),
    gst: itemsToPay.reduce((sum, item) => sum + item.price * item.quantity, 0) * 0.18,
    maintenanceFee: 50,
    total: itemsToPay.reduce((sum, item) => sum + item.price * item.quantity, 0) * 1.18 + 50
  }));

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
                    className={selectedItems.includes(index) ? 'selected-row' : ''}
                    onClick={() => handleSelectItem(index)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td className="meal-info">
                      <img src={item.image} alt={item.mealName} />
                      <span>{item.mealName}</span>
                    </td>
                    <td>{item.description}</td>
                    <td>
                      <button onClick={(e) => { e.stopPropagation(); handleQuantityChange(index, -1); }}>-</button>
                      <span className="quantity">{item.quantity}</span>
                      <button onClick={(e) => { e.stopPropagation(); handleQuantityChange(index, 1); }}>+</button>
                    </td>
                    <td>₹{item.price * item.quantity}</td>
                    <td>
                      <button className="remove-btn" onClick={(e) => { e.stopPropagation(); handleRemove(index); }}>
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
