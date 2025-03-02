import { DashboardCardGrid, DataModal } from "@/COMMON/DashboardCards";
import React, { useState } from "react";

const Dashboard2 = () => {
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [modalTitle, setModalTitle] = useState("");
  
  // Shop owner information
  const shopInfo = {
    id: "shop1",
    name: "Garden Shop",
    owner: "Maria Johnson",
    location: "New York",
    established: "2018-05-15",
    ratings: 4.8
  };
  
  // Product inventory data
  const products = [
    { id: "prod1", name: "Organic Soil", category: "Gardening", price: 15.99, stock: 42, reorderPoint: 10 },
    { id: "prod2", name: "Rose Bush", category: "Plants", price: 24.99, stock: 18, reorderPoint: 5 },
    { id: "prod3", name: "Garden Shears", category: "Tools", price: 19.95, stock: 15, reorderPoint: 5 },
    { id: "prod4", name: "Ceramic Pot (Large)", category: "Containers", price: 34.50, stock: 7, reorderPoint: 5 },
    { id: "prod5", name: "Fertilizer", category: "Gardening", price: 12.75, stock: 3, reorderPoint: 10 }
  ];
  
  // Order data for this shop
  const orders = [
    { id: "ord1", date: "2025-03-01", customer: "John Smith", total: 64.98, status: "Completed", items: 3 },
    { id: "ord2", date: "2025-03-01", customer: "Lisa Wong", total: 24.99, status: "Shipped", items: 1 },
    { id: "ord3", date: "2025-02-28", customer: "Robert Chen", total: 87.45, status: "Processing", items: 4 },
    { id: "ord4", date: "2025-02-27", customer: "Sarah Davis", total: 152.75, status: "Completed", items: 6 },
    { id: "ord5", date: "2025-02-26", customer: "James Wilson", total: 19.95, status: "Shipped", items: 1 }
  ];
  
  // Customer reviews
  const reviews = [
    { id: "rev1", customer: "John Smith", rating: 5, date: "2025-03-01", comment: "Great products and fast shipping!" },
    { id: "rev2", customer: "Lisa Wong", rating: 4, date: "2025-02-28", comment: "Quality items but delivery was a bit slow." },
    { id: "rev3", customer: "Robert Chen", rating: 5, date: "2025-02-25", comment: "Very knowledgeable staff. Will buy again!" },
    { id: "rev4", customer: "Sarah Davis", rating: 3, date: "2025-02-22", comment: "Products are good but expensive." }
  ];

  // Calculate metrics for dashboard cards
  const lowStockItems = products.filter(product => product.stock <= product.reorderPoint);
  const totalRevenue = orders.reduce((acc, curr) => acc + curr.total, 0);
  const averageOrderValue = totalRevenue / orders.length;
  const averageRating = reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length;
  
  // Recent orders (last 7 days)
  const recentOrders = orders.filter(order => {
    const orderDate = new Date(order.date);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return orderDate >= weekAgo;
  });

  // Prepare data formatters
  const formatters = {
    price: (value) => `$${parseFloat(value).toFixed(2)}`,
    total: (value) => `$${parseFloat(value).toFixed(2)}`,
    rating: (value) => `${value} ⭐`,
    ratings: (value) => `${value} ⭐`,
    stock: (value, row) => value <= row.reorderPoint ? `${value} (Low)` : value.toString()
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
      title: "Shop Rating",
      value: `${shopInfo.ratings} ⭐`,
      icon: "⭐",
      color: "#FFC107",
      onClick: () => handleCardClick("Customer Reviews", reviews)
    },
    {
      title: "Recent Orders",
      value: recentOrders.length,
      icon: "📦",
      color: "#4CAF50",
      onClick: () => handleCardClick("Recent Orders", orders)
    },
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toFixed(2)}`,
      icon: "💰",
      color: "#2196F3",
      onClick: () => handleCardClick("All Orders", orders)
    },
    {
      title: "Avg Order Value",
      value: `$${averageOrderValue.toFixed(2)}`,
      icon: "📊",
      color: "#9C27B0",
      onClick: () => handleCardClick("Orders", orders)
    },
    {
      title: "Low Stock Items",
      value: lowStockItems.length,
      icon: "⚠️",
      color: lowStockItems.length > 0 ? "#F44336" : "#4CAF50",
      onClick: () => handleCardClick("Low Stock Products", lowStockItems)
    },
    {
      title: "All Products",
      value: products.length,
      icon: "🌱",
      color: "#FF9800",
      onClick: () => handleCardClick("Inventory", products)
    }
  ];

  return (
    <>
      <DashboardCardGrid
        title={`${shopInfo.name} Dashboard`}
        subtitle={`Welcome back, ${shopInfo.owner}!`}
        cards={dashboardCards}
      />
      
      <DataModal
        open={open}
        onClose={() => setOpen(false)}
        title={modalTitle}
        data={modalData}
        formatters={formatters}
        excludeFields={["id", "reorderPoint"]}
      />
    </>
  );
};

export default Dashboard2;