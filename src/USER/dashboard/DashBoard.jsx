import React, { useState } from "react";
import { Card, CardContent, Typography, Grid, Modal, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

export const users = [
    {
      id: "user1",
      name: "John Doe",
      email: "john@example.com",
      password: "hashed_password",
      role: "consumer",
      address: "456 Elm Street, Floral City",
      phone: "+1234567890",
    },
    {
      id: "user2",
      name: "Emma Smith",
      email: "emma@example.com",
      password: "hashed_password",
      role: "business",
      business_id: "shop1",
      phone: "+1987654321",
    },
    {
      id: "user3",
      name: "Alice Johnson",
      email: "alice@example.com",
      password: "hashed_password",
      role: "consumer",
      address: "789 Oak Street, Green Valley",
      phone: "+1122334455",
    },
    {
      id: "user4",
      name: "Bob Brown",
      email: "bob@example.com",
      password: "hashed_password",
      role: "business",
      business_id: "shop2",
      phone: "+5566778899",
    },
    {
      id: "user5",
      name: "Charlie Davis",
      email: "charlie@example.com",
      password: "hashed_password",
      role: "consumer",
      address: "321 Pine Street, Sunnyville",
      phone: "+9988776655",
    },
    {
      id: "user6",
      name: "Diana Evans",
      email: "diana@example.com",
      password: "hashed_password",
      role: "business",
      business_id: "shop3",
      phone: "+1122334466",
    },
  ];
  
  export const shops = [
    {
      id: "shop1",
      owner_id: "user2",
      name: "Blossom Flower Shop",
      category: "Flowers & Gardening",
      location: "123 Rose Street, Floral City",
      ratings: 4.8,
      total_reviews: 120,
      status: "open",
      offers: ["10% off first order", "Buy 2 get 1 free"],
      images: ["https://plus.unsplash.com/premium_photo-1668540335595-68ea789d4ee2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zmxvd2VyJTIwc2hvcHxlbnwwfHwwfHx8MA%3D%3D"],
      created_at: "2025-02-18",
    },
    {
      id: "shop2",
      owner_id: "user4",
      name: "Green Thumb Nursery",
      category: "Plants & Gardening",
      location: "456 Garden Lane, Green Valley",
      ratings: 4.5,
      total_reviews: 90,
      status: "open",
      offers: ["Free delivery on orders above $50"],
      images: ["https://images.unsplash.com/photo-1558861122-40aa75d3a841?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Zmxvd2VyJTIwc2hvcHxlbnwwfHwwfHx8MA%3D%3D"],
      created_at: "2025-03-01",
    },
    {
      id: "shop3",
      owner_id: "user6",
      name: "Sunny Gardens",
      category: "Plants & Landscaping",
      location: "789 Sunshine Avenue, Sunnyville",
      ratings: 4.7,
      total_reviews: 80,
      status: "open",
      offers: ["20% off on bulk orders"],
      images: ["https://plus.unsplash.com/premium_photo-1718360706543-f753344840ee?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGZsb3dlciUyMHNob3B8ZW58MHx8MHx8fDA%3D"],
      created_at: "2025-03-10",
    },
  ];
  
  export const products = [
    {
      id: "product1",
      shop_id: "shop1",
      name: "Rose",
      category: "Flowers",
      price: 5.99,
      discount: 10,
      gst: 5,
      stock: 50,
      description: "Fresh and fragrant roses perfect for any occasion.",
      images: ["https://plus.unsplash.com/premium_photo-1673716788461-0aa43e5d2015?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cm9zZXxlbnwwfHwwfHx8MA%3D%3D"],
      variants: [
        { variant_id: "var1", name: "Red Rose", price: 5.99, stock: 20 },
        { variant_id: "var2", name: "White Rose", price: 6.49, stock: 15 },
        { variant_id: "var3", name: "Pink Rose", price: 6.99, stock: 15 },
      ],
    },
    {
      id: "product2",
      shop_id: "shop1",
      name: "Grass",
      category: "Gardening",
      price: 9.99,
      discount: 5,
      gst: 2,
      stock: 30,
      description: "High-quality grass for landscaping and gardening.",
      images: ["https://images.unsplash.com/photo-1533460004989-cef01064af7e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3Jhc3N8ZW58MHx8MHx8fDA%3D"],
      variants: [
        { variant_id: "var4", name: "Bermuda Grass", price: 9.99, stock: 15 },
        { variant_id: "var5", name: "Fescue Grass", price: 10.49, stock: 15 },
      ],
    },
    {
      id: "product3",
      shop_id: "shop2",
      name: "Succulent Plant",
      category: "Plants",
      price: 12.99,
      discount: 15,
      gst: 5,
      stock: 40,
      description: "https://plus.unsplash.com/premium_photo-1672998563388-5976b020f4a2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3VjY3VsZW50fGVufDB8fDB8fHww",
      images: ["/images/succulent.jpg"],
      variants: [
        { variant_id: "var6", name: "Small Succulent", price: 12.99, stock: 20 },
        { variant_id: "var7", name: "Large Succulent", price: 15.99, stock: 20 },
      ],
    },
    {
      id: "product4",
      shop_id: "shop2",
      name: "Gardening Tools Set",
      category: "Gardening Tools",
      price: 29.99,
      discount: 10,
      gst: 7,
      stock: 25,
      description: "A complete set of gardening tools for all your needs.",
      images: ["https://img.freepik.com/free-photo/tidy-gardening-elements_23-2147997158.jpg?ga=GA1.1.327444496.1698230023&semt=ais_hybrid"],
      variants: [],
    },
    {
      id: "product5",
      shop_id: "shop3",
      name: "Outdoor Fountain",
      category: "Landscaping",
      price: 199.99,
      discount: 20,
      gst: 10,
      stock: 10,
      description: "Elegant outdoor fountain for garden decoration.",
      images: ["https://plus.unsplash.com/premium_photo-1677340568921-91bef1f07d24?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm91bnRhaW58ZW58MHx8MHx8fDA%3D"],
      variants: [],
    },
    {
      id: "product6",
      shop_id: "shop3",
      name: "Garden Bench",
      category: "Furniture",
      price: 149.99,
      discount: 15,
      gst: 12,
      stock: 15,
      description: "Durable wooden garden bench for outdoor seating.",
      images: ["https://images.unsplash.com/photo-1591383496652-db773e57b1d0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2FyZGVuJTIwYmVuY2h8ZW58MHx8MHx8fDA%3D"],
      variants: [],
    },
  ];
  
  export const orders = [
    {
      id: "order1",
      user_id: "user1",
      shop_id: "shop1",
      products: [
        { product_id: "product1", variant_id: "var1", quantity: 2, price: 5.99 },
        { product_id: "product2", variant_id: "var5", quantity: 1, price: 10.49 },
      ],
      total_price: 22.47,
      payment_status: "Paid",
      order_status: "Processing",
      created_at: "2025-02-18",
    },
    {
      id: "order2",
      user_id: "user3",
      shop_id: "shop2",
      products: [
        { product_id: "product3", variant_id: "var6", quantity: 3, price: 12.99 },
        { product_id: "product4", quantity: 1, price: 29.99 },
      ],
      total_price: 68.96,
      payment_status: "Paid",
      order_status: "Shipped",
      created_at: "2025-03-05",
    },
    {
      id: "order3",
      user_id: "user5",
      shop_id: "shop3",
      products: [
        { product_id: "product5", quantity: 1, price: 199.99 },
        { product_id: "product6", quantity: 2, price: 149.99 },
      ],
      total_price: 499.97,
      payment_status: "Pending",
      order_status: "Pending",
      created_at: "2025-03-15",
    },
  ];
  
  export const payments = [
    {
      id: "payment1",
      order_id: "order1",
      user_id: "user1",
      amount: 22.47,
      method: "UPI",
      status: "Success",
      transaction_id: "txn_abc123",
      created_at: "2025-02-18",
    },
    {
      id: "payment2",
      order_id: "order2",
      user_id: "user3",
      amount: 68.96,
      method: "Credit Card",
      status: "Success",
      transaction_id: "txn_xyz456",
      created_at: "2025-03-05",
    },
    {
      id: "payment3",
      order_id: "order3",
      user_id: "user5",
      amount: 499.97,
      method: "PayPal",
      status: "Pending",
      transaction_id: "txn_pqr789",
      created_at: "2025-03-15",
    },
  ];
const Dashboard1 = () => {
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [modalTitle, setModalTitle] = useState("");

  // Calculate summary stats
  const totalOrders = orders.length;
  const totalPurchase = payments.reduce((acc, curr) => acc + curr.amount, 0);
  const totalShops = shops.length;

  // Function to handle modal open
  const handleOpen = (title, data) => {
    setModalTitle(title);
    setModalData(data);
    setOpen(true);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Summary Cards */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ cursor: "pointer" }} onClick={() => handleOpen("Orders by Shops", data.orders)}>
            <CardContent>
              <Typography variant="h6">Total Orders</Typography>
              <Typography variant="h4">{totalOrders}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ cursor: "pointer" }} onClick={() => handleOpen("Payments by Shops", data.payments)}>
            <CardContent>
              <Typography variant="h6">Total Purchased</Typography>
              <Typography variant="h4">${totalPurchase.toFixed(2)}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ cursor: "pointer" }} onClick={() => handleOpen("Shops", data.shops)}>
            <CardContent>
              <Typography variant="h6">Total Shops</Typography>
              <Typography variant="h4">{totalShops}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Modal for Shop-wise Data */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{ p: 4, background: "#fff", margin: "5% auto", width: "80%", borderRadius: 2 }}>
          <Typography variant="h5" mb={2}>{modalTitle}</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {modalData.length > 0 && Object.keys(modalData[0]).map((key) => (
                    <TableCell key={key}>{key}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {modalData.map((row, index) => (
                  <TableRow key={index}>
                    {Object.values(row).map((value, i) => (
                      <TableCell key={i}>{value.toString()}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button onClick={() => setOpen(false)} sx={{ mt: 2 }}>Close</Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Dashboard1;
