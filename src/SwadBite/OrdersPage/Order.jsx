import React, { useEffect, useState } from 'react';
import './Order.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../HomePAge/Navbar';
import { saveOrder, getAllOrders } from '../services/api';

const Order = () => {
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderItems, setOrderItems] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ Loading state
  const ordersPerPage = 3;
  const navigate = useNavigate();

  // Fetch orders from backend
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data } = await getAllOrders();
      setOrders(data);
      localStorage.setItem("swadbite_orders", JSON.stringify(data));
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Save a new order to backend
  const handleNewOrder = async (orderData) => {
    try {
      await saveOrder(orderData);
    } catch (err) {
      console.error("Error saving order:", err);
    }
  };

  // Filter orders for search
  const filteredOrders = orders.filter(order =>
    order.id?.toString().includes(search) ||
    (order.items &&
      order.items.some(item =>
        (item.mealName && item.mealName.toLowerCase().includes(search.toLowerCase())) ||
        (item.planName && item.planName.toLowerCase().includes(search.toLowerCase()))
      )
    )
  );

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSelectedOrder(null);
  };

  const handleOrderClick = (order) => setSelectedOrder(order);

  // ✅ Place order handler
  const handlePlaceOrder = async () => {
    // Get cart & selections
    const cart = JSON.parse(localStorage.getItem("swadbite_cart")) || [];
    const selectedMeal = JSON.parse(localStorage.getItem("swadbite_selectedMeal"));
    const selectedPlan = JSON.parse(localStorage.getItem("swadbite_selectedPlan"));

    let itemsToOrder = [];
    if (cart.length > 0) itemsToOrder = cart;
    else if (selectedMeal) itemsToOrder = [selectedMeal];
    else if (selectedPlan) itemsToOrder = [selectedPlan];
    else {
      alert("No items in cart or selected meal/plan!");
      return;
    }

    const orderData = {
      items: itemsToOrder.map(item => ({
        mealName: item.mealName || "",
        planName: item.planName || "",
        price: item.price || 0,
        quantity: item.quantity || 1,
      })),
      amount: itemsToOrder.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0),
      date: new Date().toISOString(),
      status: "Pending",
    };

    await handleNewOrder(orderData);

    // Clear cart & selections
    // localStorage.removeItem("swadbite_cart");
    // localStorage.removeItem("swadbite_selectedMeal");
    // localStorage.removeItem("swadbite_selectedPlan");
    setOrderItems([]);
+    setOrderPlaced(true);
    // Refresh orders immediately
    await fetchOrders();

    alert("Order placed successfully!");
  };

  return (
    <>
      <Navbar />
      <div className="orders-page">
        <div className="order-history-wrapper">
          <h1 className="order-history">Order History</h1>

          <input
            className="search-bar"
            type="text"
            placeholder="Search by Meal, Plan or Order ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {loading ? (
            <p style={{ textAlign: 'center', marginTop: '20px' }}>Loading orders...</p>
          ) : filteredOrders.length === 0 ? (
            <div className="empty-orders">
              <p>No orders found yet. Place your first order to see it here!</p>
              <button className="go-home-btn" onClick={() => navigate("/")}>
                Go to Home
              </button>
            </div>
          ) : (
            <>
              <div className="table-card">
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Items</th>
                      <th>Status</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentOrders.map((order) => (
                      <tr
                        key={order.id || order._id}
                        onClick={() => handleOrderClick(order)}
                        style={{ cursor: 'pointer' }}
                      >
                        <td>{new Date(order.date).toLocaleString()}</td>
                        <td>
                          {order.items?.length > 0
                            ? order.items.map(item => item.mealName || item.planName).join(", ")
                            : "N/A"}
                        </td>
                        <td>{order.status || "Pending"}</td>
                        <td>₹{order.amount || "0"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination */}
                <div style={{ marginTop: '10px', textAlign: 'center' }}>
                  <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="pagination-button"
                  >
                    &lt;
                  </button>

                  {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                    let startPage;
                    if (currentPage === 1) startPage = 1;
                    else if (currentPage === totalPages) startPage = Math.max(totalPages - 2, 1);
                    else startPage = currentPage - 1;

                    const pageNumber = startPage + i;
                    if (pageNumber > totalPages) return null;

                    return (
                      <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`pagination-button ${currentPage === pageNumber ? 'active' : ''}`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="pagination-button"
                  >
                    &gt;
                  </button>
                </div>

                {/* Place Order button */}
                <button className="place-order-btn" onClick={handlePlaceOrder}>
                  Place Orders
                </button>
              </div>
            </>
          )}

          {/* Selected order details */}
          {selectedOrder && (
            <div className="order-details">
              <h2>Order Details</h2>
              <p><strong>Order ID:</strong> {selectedOrder.id || selectedOrder._id}</p>
              <p><strong>Date:</strong> {new Date(selectedOrder.date).toLocaleString()}</p>

              <p><strong>Items:</strong></p>
              <ul>
                {selectedOrder.items?.length > 0 ? (
                  selectedOrder.items.map((item, index) => (
                    <li key={index}>
                      {item.mealName || item.planName} - ₹{item.price} x {item.quantity}
                    </li>
                  ))
                ) : (
                  <li>N/A</li>
                )}
              </ul>

              <p><strong>Total Amount:</strong> ₹{selectedOrder.amount}</p>
              <p><strong>Status:</strong> {selectedOrder.status || "Pending"}</p>

              <div className="order-buttons">
                <button className="feedback" onClick={() => navigate('/feedback')}>
                  Give Feedback
                </button>
                <button className="reorder" onClick={() => navigate('/WeeklyMenu')}>
                  Reorder
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Order;
