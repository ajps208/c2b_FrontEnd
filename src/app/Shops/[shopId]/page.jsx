"use client"; // Required in Next.js App Router
import { useParams } from "next/navigation";
import { Grid, Typography, Card, CardMedia, CardContent, Button } from "@mui/material";
import { useState } from "react";
import { products, shops } from "../../../../DemoData";

const ShopDetails = () => {
  const { shopId } = useParams();
  const shop = shops.find((s) => s.id === shopId);
  const shopProducts = products.filter((p) => p.shop_id === shopId);

  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  if (!shop) {
    return <Typography variant="h6">Shop not found!</Typography>;
  }

  return (
    <Grid container spacing={2} sx={{ mt: 3 }}>
      <Grid item xs={12}>
        <Typography variant="h4" fontWeight="bold">{shop.name}</Typography>
        <Typography variant="subtitle1" color="textSecondary">{shop.location}</Typography>
      </Grid>

      {shopProducts.length > 0 ? (
        shopProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia component="img" height="200" image={product.images[0]} alt={product.name} />
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body1">${product.price.toFixed(2)}</Typography>
                <Button variant="contained" color="primary" fullWidth onClick={() => addToCart(product)}>
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        <Typography variant="h6">No products available.</Typography>
      )}
    </Grid>
  );
};

export default ShopDetails;
