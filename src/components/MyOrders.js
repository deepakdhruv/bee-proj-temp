import React, { useEffect, useState } from "react";
import './MyOrders.css';
import Navbar from '../components/Navbar';
import { jsPDF } from "jspdf";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [showPastOrders, setShowPastOrders] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [customerDetails, setCustomerDetails] = useState({
    email: localStorage.getItem("userEmail"),
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("authToken");
      const email = localStorage.getItem("userEmail");

      if (!email) {
        throw new Error("User email not found");
      }

      const response = await fetch("http://localhost:5000/api/orders/myorderData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.orderData && data.orderData.order_data.length > 0) {
        const allOrders = data.orderData.order_data;
        const reversedOrders = allOrders.reverse();
        setOrders(reversedOrders);
        setCurrentOrder(reversedOrders[0]);
      } else {
        setError("You have no orders yet.");
      }
    } catch (err) {
      setError("Failed to fetch orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleShowPastOrders = () => {
    setShowPastOrders(!showPastOrders);
  };

  const calculateTotalAmount = (order) => {
    return order.slice(1).reduce((total, item) => total + item.price * item.qty, 0).toFixed(2);
  };

  const downloadBill = (order) => {
    const orderDate = order[0].Order_date;
    const totalAmount = calculateTotalAmount(order);

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("uCampus - Order Bill", 14, 20);
    doc.setFontSize(12);
    doc.text(`Customer Email: ${customerDetails.email}`, 14, 35);
    doc.text(`Order Date: ${orderDate}`, 14, 40);
    doc.text("Order Details:", 14, 50);

    let yPosition = 55;
    order.slice(1).forEach(item => {
      doc.text(`${item.name} - ${item.price} x ${item.qty} (${item.size})`, 14, yPosition);
      yPosition += 6;
    });

    doc.text(`Total: Rs. ${totalAmount}`, 14, yPosition + 10);
    const footerText = "Thank you for shopping with uCampus!\nFor any queries, contact us at dhruvgrover533@gmail.com";
    doc.text(footerText, 14, yPosition + 20);

    doc.save(`Order_${orderDate.replace(/[^a-zA-Z0-9]/g, "_")}_Bill.pdf`);
  };

  return (
    <div>
      <Navbar />
      <div className="my-orders">
        {loading && <p>Loading your orders...</p>}
        {error && <p>{error}</p>}
        {currentOrder ? (
          <div className="current-order">
            <h3>Current Order</h3>
            <p><strong>Order Date:</strong> {currentOrder[0].Order_date}</p>
            <ul>
              {currentOrder.slice(1).map((item, index) => (
                <li key={index}>
                  {item.name} - {item.price} x {item.qty} ({item.size})
                </li>
              ))}
            </ul>
            <p><strong>Total: </strong>Rs. {calculateTotalAmount(currentOrder)}</p>
            <button onClick={() => downloadBill(currentOrder)}>Download Bill</button>
          </div>
        ) : (
          <p>No current order found</p>
        )}
        <button onClick={handleShowPastOrders}>
          {showPastOrders ? "Hide Past Orders" : "Show Past Orders"}
        </button>
        {showPastOrders && orders.length > 1 && (
          <div className="past-orders">
            <h3>Past Orders</h3>
            {orders.slice(1).map((order, index) => (
              <div key={index} className="order">
                <p><strong>Order Date:</strong> {order[0].Order_date}</p>
                <ul>
                  {order.slice(1).map((item, itemIndex) => (
                    <li key={itemIndex}>
                      {item.name} - {item.price} x {item.qty} ({item.size})
                    </li>
                  ))}
                </ul>
                <p><strong>Total: </strong>Rs. {calculateTotalAmount(order)}</p>
                <button onClick={() => downloadBill(order)}>Download Bill</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
