import React, { useState, useEffect } from "react";
import Navbar from "../HomePAge/Navbar";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const ordersPerPage = 5;
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const customerName = storedUser?.name;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          "https://swadbite-backend-2.onrender.com/api/orders/getallorders"
        );
        if (!response.ok) throw new Error("Failed to fetch orders");

        const data = await response.json();
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Could not load orders.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Filter orders for logged-in user
  const filteredOrders = orders.filter((order) => {
    const orderNameWords = order.customerName?.toLowerCase().split(" ") || [];
    const userNameWords = customerName?.toLowerCase().split(" ") || [];
    return userNameWords.some((word) => orderNameWords.includes(word));
  });

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  return (
    <>
      <Navbar />

      <div className="relative min-h-screen">
        {/* Background image */}
        <img
          src="/path-to-your-image/70ee6e1c-e741-4613-af8f-f462003b8b11.png"
          alt="Background"
          className="fixed inset-0 w-full h-full object-cover -z-10 filter blur-sm"
        />

        {/* Overlay */}
        <div className="fixed inset-0 bg-black/25 -z-5"></div>

        {/* Content */}
        <div className="relative z-10 p-6 pt-28 flex justify-center">
          <div className="backdrop-blur-md bg-white/70 shadow-2xl rounded-2xl p-8 w-full max-w-6xl">
            <h2 className="text-3xl font-extrabold text-amber-700 mb-6 drop-shadow-lg">
              {customerName}’s Orders
            </h2>

            {/* Loading / Error / Empty States */}
            {loading ? (
              <p className="text-center mt-10 text-amber-600 text-lg">
                Loading orders...
              </p>
            ) : error ? (
              <p className="text-center mt-10 text-red-600 text-lg">{error}</p>
            ) : filteredOrders.length === 0 ? (
              <p className="text-gray-700 text-center">
                No orders found for {customerName}.
              </p>
            ) : (
              <>
                {/* Orders Table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-xl shadow-lg overflow-hidden">
                    <thead className="bg-gradient-to-r from-amber-600 to-amber-500 text-white">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold">
                          Customer
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">
                          Total Price
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {currentOrders.map((order) => (
                        <tr
                          key={order._id}
                          className="hover:bg-amber-50 transition cursor-pointer"
                        >
                          <td className="px-6 py-4 text-sm font-medium text-gray-800">
                            {order.customerName}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {new Date(order.createdAt).toLocaleString("en-IN", {
                              dateStyle: "medium",
                              timeStyle: "short",
                            })}
                          </td>
                          <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                            ₹
                            {order.items.reduce(
                              (acc, item) => acc + item.price * item.quantity,
                              0
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() =>
                                setSelectedOrder(
                                  selectedOrder?._id === order._id
                                    ? null
                                    : order
                                )
                              }
                              className="px-4 py-2 text-sm font-semibold rounded-lg shadow-md bg-amber-500 hover:bg-amber-600 text-white transition"
                            >
                              {selectedOrder?._id === order._id
                                ? "Hide Details"
                                : "View Details"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center mt-6 space-x-3">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 rounded-lg bg-white shadow-md border hover:bg-amber-100 transition disabled:opacity-50"
                  >
                    ⬅ Prev
                  </button>
                  <span className="px-4 py-2 bg-white shadow-md rounded-lg text-sm font-medium">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(p + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 rounded-lg bg-white shadow-md border hover:bg-amber-100 transition disabled:opacity-50"
                  >
                    Next ➡
                  </button>
                </div>

                {/* Order Details */}
                {selectedOrder && (
                  <div className="mt-8 p-6 bg-gradient-to-br from-white to-amber-50 rounded-xl shadow-2xl animate-slide-in">
                    <h3 className="text-xl font-bold text-amber-700 mb-4 drop-shadow">
                      Order Details
                    </h3>
                    <ul className="space-y-2">
                      {selectedOrder.items.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition"
                        >
                          <span className="font-medium">{item.name}</span>
                          <span className="text-gray-600">
                            {item.quantity} × ₹{item.price}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 font-bold text-lg text-right text-amber-700">
                      Total: ₹
                      {selectedOrder.items.reduce(
                        (acc, item) => acc + item.price * item.quantity,
                        0
                      )}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <style>{`
          @keyframes slide-in {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-slide-in {
            animation: slide-in 0.5s ease-out;
          }
        `}</style>
      </div>
    </>
  );
}

export default OrdersPage;
