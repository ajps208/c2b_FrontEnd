"use client";
import { useParams } from "next/navigation";
import { Grid, Typography, Paper, Box, Avatar, Rating, Divider, Chip as MuiChip, Container } from "@mui/material";
import { useState } from "react";
import { products, shops } from "../../../../DemoData";
import FilterComponent from "@/COMMON/FilterComponent";
import CardComponent from "@/COMMON/Cards";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CategoryIcon from '@mui/icons-material/Category';
import StoreIcon from '@mui/icons-material/Store';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import InventoryIcon from '@mui/icons-material/Inventory';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const ShopDetails = () => {
  const { shopId } = useParams();
  const shop = shops.find((s) => s.id === shopId);
  const shopProducts = products.filter((p) => p.shop_id === shopId);

  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [inStock, setInStock] = useState(false);
  const [showFilters, setShowFilters] = useState(true);

  // Extract unique product categories
  const productCategories = [...new Set(shopProducts.map(product => product.category))];
  
  // Create price ranges
  const priceRanges = [
    { min: 0, max: 10, label: "Under $10" },
    { min: 10, max: 25, label: "$10 - $25" },
    { min: 25, max: 50, label: "$25 - $50" },
    { min: 50, max: 100, label: "$50 - $100" },
    { min: 100, max: Infinity, label: "Over $100" }
  ];

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
    // You could add a toast notification here
  };

  const filteredProducts = shopProducts.filter((product) => {
    const matchesCategory = selectedCategory === "" || product.category === selectedCategory;
    const matchesPrice = (minPrice === "" || product.price >= Number(minPrice)) &&
                         (maxPrice === "" || product.price <= Number(maxPrice));
    const matchesStock = !inStock || product.stock > 0;
    
    return matchesCategory && matchesPrice && matchesStock;
  });

  // Product-based filters
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
      options: priceRanges.map(range => range.label),
      state: minPrice ? `${minPrice} - ${maxPrice === "Infinity" ? "+" : maxPrice}` : "",
      setState: (value) => {
        const selectedRange = priceRanges.find(range => range.label === value);
        if (selectedRange) {
          setMinPrice(selectedRange.min);
          setMaxPrice(selectedRange.max);
        } else {
          setMinPrice("");
          setMaxPrice("");
        }
      }
    },
    {
      label: "Availability",
      type: "checkbox",
      options: ["In Stock"],
      state: inStock ? "In Stock" : "",
      setState: (value) => setInStock(value === "In Stock"),
    }
  ];

  // Define product card info items based on CardComponent structure
  const productInfoItems = [
    { 
      icon: <AttachMoneyIcon color="primary" />,
      content: (item) => `$${item.price.toFixed(2)}${item.discount ? ` (-${item.discount}%)` : ''}` 
    },
    { 
      icon: <CategoryIcon color="secondary" />,
      content: 'category'
    },
    { 
      icon: <InventoryIcon color="success" />,
      content: (item) => `${item.stock} in stock` 
    }
  ];

  if (!shop) {
    return <Typography variant="h6">Shop not found!</Typography>;
  }

  return (
    <Grid  sx={{ mt: 1,width:"100%",padding:"40px"}}>
      {/* Shop Information Grid */}
      <Paper 
        elevation={3} 
        sx={{ 
          p: 3, 
          mt: 3, 
          borderRadius: 2,
          background: 'linear-gradient(to right, #f5f7fa, #c3cfe2)',
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={2} sx={{ display: 'flex', justifyContent: {xs: 'center', md: 'flex-start'} }}>
            <Avatar 
              src={shop.image || "/images/shop-placeholder.jpg"} 
              sx={{ 
                width: 100, 
                height: 100, 
                border: '3px solid white',
                boxShadow: '0px 4px 10px rgba(0,0,0,0.1)'
              }}
              alt={shop.name}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {shop.name}
            </Typography>
            
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <LocationOnIcon color="error" />
              <Typography variant="body1">
                {shop.location || "Location not available"}
              </Typography>
            </Box>
            
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <CategoryIcon color="primary" />
              <Typography variant="body1">
                {shop.category || "Category not available"}
              </Typography>
            </Box>
            
            {shop.description && (
              <Typography variant="body2" color="text.secondary" mt={1}>
                {shop.description}
              </Typography>
            )}
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box display="flex" justifyContent="flex-end" alignItems="center" mb={2}>
              <Rating value={shop.ratings || 0} precision={0.1} readOnly />
              <Typography ml={1}>
                ({shop.ratings || 0})
              </Typography>
            </Box>
            
            <Box display="flex" flexWrap="wrap" gap={1} justifyContent="flex-end">
              {shop.offers && shop.offers.map((offer, index) => (
                <MuiChip 
                  key={index}
                  label={offer}
                  color="primary"
                  variant="filled"
                  size="medium"
                  icon={<LocalOfferIcon />}
                  sx={{ fontWeight: 'bold' }}
                />
              ))}
            </Box>
            
            <Box mt={2} sx={{ textAlign: 'right' }}>
              <Typography variant="body2" color="text.secondary">
                {shopProducts.length} products available
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      
      <Divider sx={{ my: 3 }} />
      
      {/* Filters and Products Section */}
      <Grid sx={{padding:"20px"}}   container spacing={3}>
        <FilterComponent
          filters={filters}
          showFilters={showFilters}
          toggleFilters={toggleFilters}
        />
        
        <Grid item xs={12} sm={9} md={10}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h5" fontWeight="bold">
              Products ({filteredProducts.length})
            </Typography>
            
            <Box>
              {selectedCategory && (
                <MuiChip 
                  label={`Category: ${selectedCategory}`}
                  onDelete={() => setSelectedCategory("")}
                  sx={{ mr: 1 }}
                />
              )}
              {(minPrice || maxPrice) && (
                <MuiChip 
                  label={`Price: $${minPrice} - ${maxPrice === "Infinity" ? "+" : "$" + maxPrice}`}
                  onDelete={() => { setMinPrice(""); setMaxPrice(""); }}
                  sx={{ mr: 1 }}
                />
              )}
              {inStock && (
                <MuiChip 
                  label="In Stock Only"
                  onDelete={() => setInStock(false)}
                />
              )}
            </Box>
          </Box>
          
          <Grid container spacing={3}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                  <CardComponent
                    item={product}
                    title="name"
                    infoItems={productInfoItems}
                    chips={(item) => item.variants && item.variants.length > 0 ? 
                      [`${item.variants.length} variants available`] : []}
                    buttonText="Add to Cart"
                    buttonAction={() => addToCart(product)}
                    imageKey="images"
                  />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
                  <Typography variant="h6" color="text.secondary">
                    No products found with selected filters.
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    Try adjusting your filter criteria.
                  </Typography>
                </Paper>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ShopDetails;