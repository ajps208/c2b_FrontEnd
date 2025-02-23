"use client";

import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Chip,
  Paper,
  Box,
  Divider,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Image from "next/image";
import { orders, products, shops } from "../../../DemoData";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const loggedUserId = "user1"; // Replace with actual logged-in user ID

const OrdersPage = () => {
  const [userOrders, setUserOrders] = useState({});
  const [filters, setFilters] = useState({
    shop: "",
    startDate: "",
    endDate: "",
    sortBy: "date",
    sortOrder: "desc", // Default to descending order
  });

  useEffect(() => {
    const filteredOrders = orders.filter((order) => order.user_id === loggedUserId);
    const groupedOrders = filteredOrders.reduce((acc, order) => {
      const date = new Date(order.created_at).toLocaleDateString();
      if (!acc[date]) acc[date] = [];
      acc[date].push(order);
      return acc;
    }, {});
    setUserOrders(groupedOrders);
  }, []);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  const toggleSortOrder = () => {
    setFilters({ ...filters, sortOrder: filters.sortOrder === "asc" ? "desc" : "asc" });
  };

  const applyFilters = (orders) => {
    let filtered = Object.entries(orders);

    // Filter by shop
    if (filters.shop) {
      filtered = filtered.map(([date, orders]) => [
        date,
        orders.filter((order) => order.shop_id === filters.shop),
      ]).filter(([date, orders]) => orders.length > 0);
    }

    // Filter by date range
    if (filters.startDate && filters.endDate) {
      filtered = filtered.map(([date, orders]) => [
        date,
        orders.filter((order) => {
          const orderDate = new Date(order.created_at);
          return orderDate >= new Date(filters.startDate) && orderDate <= new Date(filters.endDate);
        }),
      ]).filter(([date, orders]) => orders.length > 0);
    }

    // Sort by date or amount
    if (filters.sortBy === "date") {
      filtered.sort(([dateA], [dateB]) => {
        const date1 = new Date(dateA);
        const date2 = new Date(dateB);
        return filters.sortOrder === "asc" ? date1 - date2 : date2 - date1;
      });
    } else if (filters.sortBy === "amount") {
      filtered.sort(([_, ordersA], [__, ordersB]) => {
        const totalA = ordersA.reduce((sum, order) => sum + order.total_price, 0);
        const totalB = ordersB.reduce((sum, order) => sum + order.total_price, 0);
        return filters.sortOrder === "asc" ? totalA - totalB : totalB - totalA;
      });
    }

    return Object.fromEntries(filtered);
  };

  const filteredOrders = applyFilters(userOrders);

  return (
    <Box sx={{ p: 3, minHeight: "100vh", width: "100%", bgcolor: "#f5f5f5" }}>
      <Typography variant="h4" gutterBottom textAlign="center" fontWeight="bold">
        My Orders
      </Typography>

      {/* Filter Section */}
      <Grid container justifyContent="center" sx={{ mb: 3 }}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
            <Grid container spacing={2} alignItems="center">
              {/* Shop Filter */}
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Shop</InputLabel>
                  <Select
                    name="shop"
                    value={filters.shop}
                    onChange={handleFilterChange}
                    label="Shop"
                  >
                    <MenuItem value="">All Shops</MenuItem>
                    {shops.map((shop) => (
                      <MenuItem key={shop.id} value={shop.id}>
                        {shop.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Date Range Filter */}
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  type="date"
                  name="startDate"
                  value={filters.startDate}
                  onChange={handleFilterChange}
                  label="Start Date"
                  InputLabelProps={{ shrink: true }}
                  size="small"
                  sx={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  type="date"
                  name="endDate"
                  value={filters.endDate}
                  onChange={handleFilterChange}
                  label="End Date"
                  InputLabelProps={{ shrink: true }}
                  size="small"
                  sx={{ width: "100%" }}
                />
              </Grid>

              {/* Sort By Filter */}
              <Grid item xs={12} sm={2} gap={1} sx={{ display: "flex", alignItems: "center" }}>
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
                <IconButton onClick={toggleSortOrder} sx={{ border: "1px solid #ccc", borderRadius: 1 }}>
                  {filters.sortOrder === "asc" ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                </IconButton>
              </Grid>

              {/* Sort Order Toggle */}
              {/* <Grid item xs={12} sm={1}>
                <IconButton onClick={toggleSortOrder} sx={{ border: "1px solid #ccc", borderRadius: 1 }}>
                  {filters.sortOrder === "asc" ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                </IconButton>
              </Grid> */}
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* Orders List */}
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          {Object.entries(filteredOrders).map(([date, orders]) => (
            <Paper elevation={3} sx={{ p: 2, mb: 3, borderRadius: 2 }} key={date}>
              <Typography variant="h6" fontWeight="bold" color="primary" gutterBottom>
                {date}
              </Typography>
              <Divider sx={{ mb: 2 }} />

              {orders.map((order) => {
                const shop = shops.find((s) => s.id === order.shop_id);
                const totalProducts = order.products.reduce((sum, item) => sum + item.quantity, 0);

                return (
                    <Accordion key={order.id} sx={{ borderRadius: 2, mb: 1 }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: "#e3f2fd" }}>
                      <Grid container alignItems="center" spacing={2}>
                        <Grid item>
                          <Image
                            src={shop.images[0]}
                            alt={shop.name}
                            width={60}
                            height={60}
                            style={{ borderRadius: "8px" }}
                          />
                        </Grid>
                        <Grid item xs>
                          <Typography variant="h6" fontWeight="bold">
                            {shop.name}
                          </Typography>
                          <Typography variant="h6" color="text.secondary">
                            {totalProducts} items - ${order.total_price.toFixed(2)}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Chip
                            label={order.order_status}
                            color={order.order_status === "confirmed" ? "success" : "warning"}
                            variant="outlined"
                          />
                        </Grid>
                      </Grid>
                    </AccordionSummary>
                  
                    <AccordionDetails sx={{ bgcolor: "#fafafa", p: 2 }}>
                      <Grid container spacing={2}>
                        {order.products.map(({ product_id, variant_id, quantity, price }) => {
                          const product = products.find((p) => p.id === product_id);
                          const variant = product.variants?.find((v) => v.variant_id === variant_id);
                  
                          return (
                            <Grid item xs={12} sm={6} md={4} key={product_id + variant_id}>
                              <Card sx={{ display: "flex", alignItems: "center", p: 1, borderRadius: 2 }}>
                                <CardMedia
                                  component="img"
                                  image={product.images[0]}
                                  alt={product.name}
                                  sx={{ width: 60, height: 60, borderRadius: "8px" }}
                                />
                                <CardContent sx={{ flex: 1 }}>
                                  <Typography variant="body1" fontWeight="bold">
                                    {variant ? variant.name : product.name}
                                  </Typography>
                                  <Typography variant="body2">Qty: {quantity}</Typography>
                                  <Typography variant="body2" color="secondary">${(price * quantity).toFixed(2)}</Typography>
                                </CardContent>
                              </Card>
                            </Grid>
                          );
                        })}
                      </Grid>
                  
                      <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                        {order.payment_status === "confirmed" && (
                          <Button variant="contained" color="primary" size="small" startIcon={<ShoppingCartIcon />}>
                            Generate Bill
                          </Button>
                        )}
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                  
                );
              })}
            </Paper>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrdersPage;