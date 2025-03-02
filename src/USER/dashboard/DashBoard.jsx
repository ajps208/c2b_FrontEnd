import { DashboardCardGrid, DataModal } from "@/COMMON/DashboardCards";
import React from "react";
import { useState } from "react";

const Dashboard1 = () => {
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [modalTitle, setModalTitle] = useState("");
  
  // Sample data (this would be your actual data in a real app)
  const orders = [
    { id: "order1", customer: "John Doe", total: 100.50, status: "Processing" },
    { id: "order2", customer: "Jane Smith", total: 75.25, status: "Shipped" },
  ];
  
  const payments = [
    { id: "payment1", order_id: "order1", amount: 100.50, method: "Credit Card" },
    { id: "payment2", order_id: "order2", amount: 75.25, method: "PayPal" },
  ];
  
  const shops = [
    { id: "shop1", name: "Garden Shop", location: "New York", ratings: 4.8 },
    { id: "shop2", name: "Flower Paradise", location: "Los Angeles", ratings: 4.6 },
  ];

  // Calculate totals for cards
  const totalOrders = orders.length;
  const totalRevenue = payments.reduce((acc, curr) => acc + curr.amount, 0);
  const totalShops = shops.length;

  // Prepare data formatters
  const formatters = {
    total: (value) => `$${parseFloat(value).toFixed(2)}`,
    amount: (value) => `$${parseFloat(value).toFixed(2)}`,
    ratings: (value) => `${value} ⭐`
  };

  // Handler for card clicks
  const handleCardClick = (title, data) => {
    setModalTitle(title);
    setModalData(data);
    setOpen(true);
  };
  
  // Dashboard cards configuration
  const dashboardCards = [
    {
      title: "Total Orders",
      value: totalOrders,
      icon: "📦",
      color: "#4CAF50",
      onClick: () => handleCardClick("Orders", orders)
    },
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toFixed(2)}`,
      icon: "💰",
      color: "#2196F3",
      onClick: () => handleCardClick("Payments", payments)
    },
    {
      title: "Total Shops",
      value: totalShops,
      icon: "🏪",
      color: "#9C27B0",
      onClick: () => handleCardClick("Shops", shops)
    }
  ];

  return (
    <>
      <DashboardCardGrid 
        title="Analytics Dashboard" 
        cards={dashboardCards} 
      />
      
      <DataModal
        open={open}
        onClose={() => setOpen(false)}
        title={modalTitle}
        data={modalData}
        formatters={formatters}
        excludeFields={["password"]} // Fields to exclude from display
      />
    </>
  );
};

export default Dashboard1;