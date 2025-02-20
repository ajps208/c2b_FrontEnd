import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import { shops } from "../../../DemoData";
import ShopCard from "../../USER/Components/ShopCards";
import FilterComponent from "@/COMMON/FilterComponent";

// Extract unique categories and locations
const categories = [...new Set(shops.map((shop) => shop.category))];
const locations = [...new Set(shops.map((shop) => shop.location))];

const Shops = () => {
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [minRating, setMinRating] = useState("");
  const [showFilters, setShowFilters] = useState(window.innerWidth > 600);

  const toggleFilters = () => setShowFilters(!showFilters);

  const filteredShops = shops.filter((shop) => {
    return (
      (category === "" || shop.category === category) &&
      (location === "" || shop.location === location) &&
      (minRating === "" || shop.ratings >= Number(minRating))
    );
  });

  const filters = [
    { label: "Category", type: "checkbox", options: categories, state: category, setState: setCategory },
    { label: "Location", type: "select", options: locations, state: location, setState: setLocation },
    { label: "Ratings", type: "checkbox", options: [4.0, 4.5, 4.7, 4.8, 5.0], state: minRating, setState: setMinRating },
  ];

  return (
    <Grid container spacing={2} sx={{ mt: 1 }}>
      <FilterComponent filters={filters} showFilters={showFilters} toggleFilters={toggleFilters} />

      <Grid item xs={12} sm={9} md={10}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Explore Shops
        </Typography>

        <Grid container spacing={2}>
          {filteredShops.length > 0 ? (
            filteredShops.map((shop) => (
              <Grid item key={shop.id} xs={12} sm={6} md={3}>
                <ShopCard shop={shop} />
              </Grid>
            ))
          ) : (
            <Typography variant="h6" sx={{ mt: 2 }}>
              No shops found with selected filters.
            </Typography>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Shops;
