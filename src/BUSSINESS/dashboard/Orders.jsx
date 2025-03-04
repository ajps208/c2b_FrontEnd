"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Card,
  CardMedia,
  CardContent,
  IconButton
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PrintIcon from "@mui/icons-material/Print";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

// Assuming these are imported from your data sources
import { orders, products, users } from "../../../DemoData";

const ShopOrdersPage = () => {
  const [shopOrders, setShopOrders] = useState([]);
  const [filters, setFilters] = useState({
    user: "",
    startDate: "",
    endDate: "",
    sortBy: "date",
    sortOrder: "desc",
    status: ""
  });

  useEffect(() => {
    // Fetch orders for the current shop (you'd replace this with actual shop ID)
    const currentShopId = "shop1";
    const filteredOrders = orders.filter(order => order.shop_id === currentShopId);
    setShopOrders(filteredOrders);
  }, []);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const toggleSortOrder = () => {
    setFilters(prev => ({ 
      ...prev, 
      sortOrder: prev.sortOrder === "asc" ? "desc" : "asc" 
    }));
  };

  const approveOrder = (orderId) => {
    // Update order status
    const updatedOrders = shopOrders.map(order => 
      order.id === orderId 
        ? { ...order, order_status: "confirmed" } 
        : order
    );
    setShopOrders(updatedOrders);
  };

  const generateBill = (order) => {
    // Implement bill generation logic
    // This could open a modal, generate a PDF, or send to a billing system
    console.log("Generating bill for order:", order);
  };

  const applyFilters = () => {
    let filteredOrders = [...shopOrders];

    // Filter by user
    if (filters.user) {
      filteredOrders = filteredOrders.filter(order => order.user_id === filters.user);
    }

    // Filter by date range
    if (filters.startDate && filters.endDate) {
      filteredOrders = filteredOrders.filter(order => {
        const orderDate = new Date(order.created_at);
        return orderDate >= new Date(filters.startDate) && 
               orderDate <= new Date(filters.endDate);
      });
    }

    // Filter by status
    if (filters.status) {
      filteredOrders = filteredOrders.filter(order => order.order_status === filters.status);
    }

    // Sort orders
    filteredOrders.sort((a, b) => {
      if (filters.sortBy === "date") {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return filters.sortOrder === "asc" 
          ? dateA.getTime() - dateB.getTime() 
          : dateB.getTime() - dateA.getTime();
      }
      if (filters.sortBy === "amount") {
        return filters.sortOrder === "asc"
          ? a.total_price - b.total_price
          : b.total_price - a.total_price;
      }
      return 0;
    });

    return filteredOrders;
  };

  const filteredOrders = applyFilters();

  return (
    <Box sx={{ p: 3, minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      <Typography variant="h4" gutterBottom textAlign="center" fontWeight="bold">
        Shop Orders Management
      </Typography>

      {/* Filters Section */}
      <Grid container justifyContent="center" sx={{ mb: 3 }}>
        <Grid item xs={12} md={10}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Grid container spacing={2} alignItems="center">
              {/* User Filter */}
              <Grid item xs={12} sm={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Customer</InputLabel>
                  <Select
                    name="user"
                    value={filters.user}
                    onChange={handleFilterChange}
                    label="Customer"
                  >
                    <MenuItem value="">All Customers</MenuItem>
                    {users.map((user) => (
                      <MenuItem key={user.id} value={user.id}>
                        {user.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Date Filters */}
              <Grid item xs={12} sm={2}>
                <TextField
                  fullWidth
                  type="date"
                  name="startDate"
                  value={filters.startDate}
                  onChange={handleFilterChange}
                  label="Start Date"
                  InputLabelProps={{ shrink: true }}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  fullWidth
                  type="date"
                  name="endDate"
                  value={filters.endDate}
                  onChange={handleFilterChange}
                  label="End Date"
                  InputLabelProps={{ shrink: true }}
                  size="small"
                />
              </Grid>

              {/* Status Filter */}
              <Grid item xs={12} sm={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                    label="Status"
                  >
                    <MenuItem value="">All Statuses</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="confirmed">Confirmed</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Sort Filters */}
              <Grid item xs={12} sm={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Sort By</InputLabel>
                  <Select
                    name="sortBy"
                    value={filters.sortBy}
                    onChange={handleFilterChange}
                    label="Sort By"
                  >
                    <MenuItem value="date">Date</MenuItem>
                    <MenuItem value="amount">Amount</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Sort Order Toggle */}
              <Grid item xs={12} sm={1}>
                <IconButton 
                  onClick={toggleSortOrder} 
                  sx={{ border: "1px solid #ccc", borderRadius: 1 }}
                >
                  {filters.sortOrder === "asc" ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                </IconButton>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* Orders List */}
      <Grid container justifyContent="center">
        <Grid item xs={12} md={10}>
          {filteredOrders.map((order) => {
            const customer = users.find(user => user.id === order.user_id);
            const totalProducts = order.products.reduce((sum, item) => sum + item.quantity, 0);

            return (
              <Paper key={order.id} elevation={3} sx={{ mb: 2, p: 2, borderRadius: 2 }}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Grid container alignItems="center" spacing={2}>
                      <Grid item xs={3}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          Order #{order.id}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {customer.name}
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography variant="body1">
                          {new Date(order.created_at).toLocaleDateString()}
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography variant="h6" color="secondary">
                          ${order.total_price.toFixed(2)}
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Chip
                          label={order.order_status}
                          color={
                            order.order_status === "confirmed" 
                              ? "success" 
                              : order.order_status === "pending" 
                              ? "warning" 
                              : "default"
                          }
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                  </AccordionSummary>

                  <AccordionDetails>
                    <Grid container spacing={2}>
                      {order.products.map(({ product_id, variant_id, quantity, price }) => {
                        const product = products.find(p => p.id === product_id);
                        const variant = product.variants?.find(v => v.variant_id === variant_id);

                        return (
                          <Grid item xs={12} sm={6} md={4} key={product_id + variant_id}>
                            <Card sx={{ display: "flex", alignItems: "center", p: 1 }}>
                              <CardMedia
                                component="img"
                                image={product.images[0]}
                                alt={product.name}
                                sx={{ width: 60, height: 60, mr: 2 }}
                              />
                              <CardContent sx={{ flex: 1 }}>
                                <Typography variant="body1" fontWeight="bold">
                                  {variant ? variant.name : product.name}
                                </Typography>
                                <Typography variant="body2">
                                  Qty: {quantity} | ${(price * quantity).toFixed(2)}
                                </Typography>
                              </CardContent>
                            </Card>
                          </Grid>
                        );
                      })}
                    </Grid>

                    {/* Order Actions */}
                    <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
                      {order.order_status !== "confirmed" && (
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<CheckCircleIcon />}
                          onClick={() => approveOrder(order.id)}
                        >
                          Approve Order
                        </Button>
                      )}
                      {order.order_status === "confirmed" && (
                        <Button
                          variant="contained"
                          color="secondary"
                          startIcon={<PrintIcon />}
                          onClick={() => generateBill(order)}
                        >
                          Generate Bill
                        </Button>
                      )}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Paper>
            );
          })}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShopOrdersPage;