"use client";
import { useParams } from "next/navigation";
import {
  Grid,
  Typography,
  Paper,
  Box,
  Button,
  Avatar,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Chip,
  Tooltip,
} from "@mui/material";
import { useState, useEffect } from "react";
import FilterComponent from "@/COMMON/FilterComponent";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InventoryIcon from "@mui/icons-material/Inventory";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CategoryIcon from "@mui/icons-material/Category";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import StoreIcon from "@mui/icons-material/Store";
import { products, shops } from "../../../DemoData";

const Products = () => {
//   const { shopId } = useParams();
  const shopId = "shop1";
  const shop = shops.find((s) => s.id === shopId);
  const [shopProducts, setShopProducts] = useState(
    products.filter((p) => p.shop_id === shopId)
  );

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [lowStock, setLowStock] = useState(false);
  const [showFilters, setShowFilters] = useState(true);

  // Product form modal states
  const [openModal, setOpenModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    id: "",
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    images: ["/images/product-placeholder.jpg"],
    shop_id: shopId,
  });

  // Extract unique product categories
  const productCategories = [
    ...new Set(shopProducts.map((product) => product.category)),
  ];

  // Create price ranges
  const priceRanges = [
    { min: 0, max: 10, label: "Under $10" },
    { min: 10, max: 25, label: "$10 - $25" },
    { min: 25, max: 50, label: "$25 - $50" },
    { min: 50, max: 100, label: "$50 - $100" },
    { min: 100, max: Infinity, label: "Over $100" },
  ];

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    // Reset form
    setNewProduct({
      id: "",
      name: "",
      category: "",
      price: "",
      stock: "",
      description: "",
      images: ["/images/product-placeholder.jpg"],
      shop_id: shopId,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Convert price and stock to numbers if needed
    if (name === "price" || name === "stock") {
      const numValue = value === "" ? "" : Number(value);
      setNewProduct({ ...newProduct, [name]: numValue });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  const handleAddProduct = () => {
    // Generate a unique ID
    const productId = `prod_${Date.now()}`;
    
    // Create the new product with proper data types
    const productToAdd = {
      ...newProduct,
      id: productId,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
      rating: 0,
      reviews: 0,
      sales: 0,
      date_added: new Date().toISOString().split('T')[0],
    };
    
    // Add to products array
    setShopProducts([...shopProducts, productToAdd]);
    
    // Close modal
    handleCloseModal();
  };

  const handleDeleteProduct = (productId) => {
    // Filter out the product to delete
    const updatedProducts = shopProducts.filter((p) => p.id !== productId);
    setShopProducts(updatedProducts);
  };

  const filteredProducts = shopProducts.filter((product) => {
    const matchesCategory =
      selectedCategory === "" || product.category === selectedCategory;
    const matchesPrice =
      (minPrice === "" || product.price >= Number(minPrice)) &&
      (maxPrice === "" || product.price <= Number(maxPrice));
    // For shop owner, low stock is important to highlight
    const matchesStock = !lowStock || product.stock < 10;

    return matchesCategory && matchesPrice && matchesStock;
  });

  // Product-based filters for shop owner
  const filters = [
    {
      label: "Category",
      type: "checkbox",
      options: productCategories,
      state: selectedCategory,
      setState: setSelectedCategory,
    },
    {
      label: "Price Range",
      type: "select",
      options: priceRanges.map((range) => range.label),
      state: minPrice
        ? `${minPrice} - ${maxPrice === "Infinity" ? "+" : maxPrice}`
        : "",
      setState: (value) => {
        const selectedRange = priceRanges.find(
          (range) => range.label === value
        );
        if (selectedRange) {
          setMinPrice(selectedRange.min);
          setMaxPrice(selectedRange.max);
        } else {
          setMinPrice("");
          setMaxPrice("");
        }
      },
    },
    {
      label: "Stock",
      type: "checkbox",
      options: ["Low Stock"],
      state: lowStock ? "Low Stock" : "",
      setState: (value) => setLowStock(value === "Low Stock"),
    },
  ];

  if (!shop) {
    return <Typography variant="h6">Shop not found!</Typography>;
  }

  return (
    <Grid
      sx={{
        mt: 1,
        width: "100%",
        padding: "0px 20px",
      }}
    >
      {/* Shop Information Summary */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mt: 3,
          borderRadius: 2,
          background: "linear-gradient(to right, #f5f7fa, #c3cfe2)",
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid
            item
            xs={12}
            md={2}
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "flex-start" },
            }}
          >
            <Avatar
              src={shop.image || "/images/shop-placeholder.jpg"}
              sx={{
                width: 100,
                height: 100,
                border: "3px solid white",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
              }}
              alt={shop.name}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {shop.name} - Owner Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage your products, track inventory, and grow your business
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="flex-end"
              gap={1}
            >
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleOpenModal}
                sx={{ fontWeight: "bold" }}
              >
                Add New Product
              </Button>
              <Typography variant="subtitle2" color="text.secondary">
                {shopProducts.length} products in inventory
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Divider sx={{ my: 3 }} />

      {/* Filters and Products Section */}
      <Grid  container spacing={2}>
        {/* Left-side filters */}
        <Grid  item xs={12} md={3}>
         <Grid>
              <FilterComponent
                filters={filters}
                showFilters={showFilters}
                toggleFilters={toggleFilters}
                defaultMd={12}
              />
         </Grid>

          {/* Inventory Summary Card */}
         <Grid  >
              <Paper elevation={3} sx={{ p: 2, mt: 3, borderRadius: 2 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Inventory Summary
                </Typography>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">Total Products:</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {shopProducts.length}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">Low Stock Items:</Typography>
                  <Typography 
                    variant="body2" 
                    fontWeight="bold"
                    color={shopProducts.filter(p => p.stock < 10).length > 0 ? "error" : "inherit"}
                  >
                    {shopProducts.filter(p => p.stock < 10).length}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">Out of Stock:</Typography>
                  <Typography 
                    variant="body2" 
                    fontWeight="bold"
                    color={shopProducts.filter(p => p.stock === 0).length > 0 ? "error" : "inherit"}
                  >
                    {shopProducts.filter(p => p.stock === 0).length}
                  </Typography>
                </Box>
              </Paper>
         </Grid>
        </Grid>

        {/* Products Grid */}
        <Grid item xs={12} md={9}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography variant="h5" fontWeight="bold">
              Your Products ({filteredProducts.length})
            </Typography>

            <Box>
              {selectedCategory && (
                <Chip
                  label={`Category: ${selectedCategory}`}
                  onDelete={() => setSelectedCategory("")}
                  sx={{ mr: 1 }}
                />
              )}
              {(minPrice || maxPrice) && (
                <Chip
                  label={`Price: $${minPrice} - ${
                    maxPrice === "Infinity" ? "+" : "$" + maxPrice
                  }`}
                  onDelete={() => {
                    setMinPrice("");
                    setMaxPrice("");
                  }}
                  sx={{ mr: 1 }}
                />
              )}
              {lowStock && (
                <Chip
                  label="Low Stock Only"
                  color="error"
                  onDelete={() => setLowStock(false)}
                />
              )}
            </Box>
          </Box>

          <Grid container spacing={3}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4}>
                  <Card 
                    sx={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column',
                      position: 'relative'
                    }}
                  >
                    {product.stock < 10 && (
                      <Chip
                        label={product.stock === 0 ? "Out of Stock" : "Low Stock"}
                        color="error"
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 10,
                          right: 10,
                          zIndex: 1
                        }}
                      />
                    )}
                    <CardMedia
                      component="img"
                      height="140"
                      image={product.images?.[0] || "/images/product-placeholder.jpg"}
                      alt={product.name}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" component="div" gutterBottom>
                        {product.name}
                      </Typography>
                      <Box display="flex" alignItems="center" gap={1} mb={1}>
                        <AttachMoneyIcon color="primary" fontSize="small" />
                        <Typography variant="body1">
                          ${product.price.toFixed(2)}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap={1} mb={1}>
                        <CategoryIcon color="secondary" fontSize="small" />
                        <Typography variant="body2">
                          {product.category}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap={1} mb={1}>
                        <InventoryIcon 
                          color={product.stock < 10 ? "error" : "success"} 
                          fontSize="small" 
                        />
                        <Typography 
                          variant="body2"
                          color={product.stock < 10 ? "error" : "text.primary"}
                        >
                          {product.stock} in stock
                        </Typography>
                      </Box>
                      {product.description && (
                        <Typography variant="body2" color="text.secondary">
                          {product.description.length > 70 
                            ? product.description.substring(0, 70) + "..." 
                            : product.description}
                        </Typography>
                      )}
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
                      <Tooltip title="Edit Product">
                        <IconButton color="primary">
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Product">
                        <IconButton 
                          color="error"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Paper sx={{ p: 4, textAlign: "center", borderRadius: 2 }}>
                  <Typography variant="h6" color="text.secondary">
                    No products found with selected filters.
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    Try adjusting your filter criteria or add new products.
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleOpenModal}
                    sx={{ mt: 2 }}
                  >
                    Add Product
                  </Button>
                </Paper>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>

      {/* Add Product Modal */}
      <Dialog 
        open={openModal} 
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6" fontWeight="bold">
            Add New Product
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="name"
                label="Product Name"
                value={newProduct.name}
                onChange={handleInputChange}
                fullWidth
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal" required>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={newProduct.category}
                  onChange={handleInputChange}
                  label="Category"
                >
                  {productCategories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                  <MenuItem value="new">+ Add New Category</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="price"
                label="Price ($)"
                type="number"
                inputProps={{ min: 0, step: 0.01 }}
                value={newProduct.price}
                onChange={handleInputChange}
                fullWidth
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="stock"
                label="Stock Quantity"
                type="number"
                inputProps={{ min: 0, step: 1 }}
                value={newProduct.stock}
                onChange={handleInputChange}
                fullWidth
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label="Product Description"
                value={newProduct.description}
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={4}
                margin="normal"
              />
            </Grid>
            {/* Image upload would go here in a real app */}
            <Grid item xs={12}>
              <Box
                sx={{
                  p: 2,
                  border: '1px dashed grey',
                  borderRadius: 1,
                  textAlign: 'center',
                  bgcolor: '#f8f8f8'
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Product Image Upload (Not functional in demo)
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleCloseModal} 
            color="inherit"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleAddProduct} 
            variant="contained" 
            color="primary"
            disabled={!newProduct.name || !newProduct.category || !newProduct.price || !newProduct.stock}
          >
            Add Product
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default Products;