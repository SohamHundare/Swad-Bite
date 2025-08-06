import React, { useState } from 'react';
import './Order.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../HomePAge/Navbar';
const orders = [
  {
    id: '123467',
    date: '26/06/2025',
    tiffin: ['2x Roti', '1x Rice', '1x Paneer Curry'],
    mess: 'Maa Annapurna Mess',
    status: 'Delivered',
    amount: '₹200',
    rating: 5,
  },
  {
    id: '123468',
    date: '27/06/2025',
    tiffin: ['3x Roti', '1x Dal', '1x Aloo Sabji'],
    mess: 'Shree Sai Mess',
    status: 'Delivered',
    amount: '₹180',
    rating: 4,
  },
  {
    id: '1123468',
    date: '24/06/2025',
    tiffin: ['Evening snacks'],
    mess: 'Sai Krupa Mess',
    status: 'Delivered',
    amount: '₹120',
  },
  {
    id: '1123469',
    date: '22/06/2025',
    tiffin: ['Dinner special'],
    mess: 'Ghar Ka Khana',
    status: 'Cancelled',
    amount: '₹320',
  }
];

const Order = () => {
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 3;
  const navigate = useNavigate();

  const filteredOrders = orders.filter(
    (order) =>
      order.id.includes(search) ||
      order.mess.toLowerCase().includes(search.toLowerCase()) ||
      order.tiffin.join(', ').toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSelectedOrder(null);
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  return (
    <>
    <Navbar/>
    <div className="orders-page">
        <div className="order-history-wrapper">
        <h1 className='order-history'>Order History</h1>

        <input
            className="search-bar"
            type="text"
            placeholder="Search by Tiffin, Mess or Order ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />

        <div className="table-card">
            <table>
            <thead>
                <tr>
                <th>Date</th>
                <th>Tiffin</th>
                <th>Mess</th>
                <th>Status</th>
                <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                {currentOrders.map((order) => (
                <tr key={order.id} onClick={() => handleOrderClick(order)} style={{ cursor: 'pointer' }}>
                    <td>{order.date}</td>
                    <td>{Array.isArray(order.tiffin) ? order.tiffin.join(', ') : order.tiffin}</td>
                    <td>{order.mess}</td>
                    <td>{order.status}</td>
                    <td>{order.amount}</td>
                </tr>
                ))}
            </tbody>
            </table>

            {/* Pagination Buttons */}
            <div style={{ marginTop: '10px', textAlign: 'center' }}>
            {[...Array(totalPages)].map((_, index) => (
                <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                >
                {index + 1}
                </button>
            ))}
            </div>
        </div>

        {selectedOrder && (
            <div className="order-details">
            <h2>Order Details</h2>
            <p><strong>Order ID:</strong> {selectedOrder.id}</p>
            <p><strong>Date:</strong> {selectedOrder.date}</p>
            <p><strong>Mess:</strong> {selectedOrder.mess}</p>
            <p><strong>Items:</strong></p>
            <ul>
                {(Array.isArray(selectedOrder.tiffin) ? selectedOrder.tiffin : [selectedOrder.tiffin]).map((item, index) => (
                <li key={index}>{item}</li>
                ))}
            </ul>
            <p><strong>Amount:</strong> {selectedOrder.amount}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            {selectedOrder.rating && (
                <p><strong>Rating:</strong> {'⭐'.repeat(selectedOrder.rating)}</p>
            )}

            <div className="order-buttons">
                <button className="feedback" onClick={() => navigate('/feedback')}>Give Feedback</button>
                <button className="reorder">Reorder</button>
            </div>
            </div>
        )}
        </div>
    </div>
    </>
  );
};

export default Order;
