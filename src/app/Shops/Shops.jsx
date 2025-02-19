import React, { useState } from "react";
import { Grid, Typography, FormControlLabel, Checkbox, Select, MenuItem, Box, Button } from "@mui/material";
import { shops } from "../../../DemoData";
import ShopCard from "../../USER/Components/ShopCards";

// Extract unique categories and locations
const categories = [...new Set(shops.map((shop) => shop.category))];
const locations = [...new Set(shops.map((shop) => shop.location))];

const Shops = () => {
  // State for filters
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [minRating, setMinRating] = useState("");
  const [showFilters, setShowFilters] = useState(window.innerWidth > 600); 

  // Toggle Filters on Small Devices
  const toggleFilters = () => setShowFilters(!showFilters);

  // Filtered shops
  const filteredShops = shops.filter((shop) => {
    return (
      (category === "" || shop.category === category) &&
      (location === "" || shop.location === location) &&
      (minRating === "" || shop.ratings >= Number(minRating))
    );
  });

  return (
    <Grid container spacing={2} sx={{ mt: 1,}}>
      {/* Show Filter Button on Small Screens */}
      <Grid item xs={12} sx={{ display: { xs: "block", sm: "none" }, mb: 1}}>
        <Button variant="contained" onClick={toggleFilters} fullWidth>
          {showFilters ? "Hide Filters" : "Show Filters"}
        </Button>
      </Grid>

      {/* Sidebar Filter Section */}
      {showFilters && (
        <Grid
          item
          xs={12}
          sm={3}
          md={2}
          sx={{
            p: 2,
            border: "1px solid #ccc",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
            display: { xs: showFilters ? "block" : "none", sm: "block" },
          }}
        >
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Filters
          </Typography>

          {/* Category Filter */}
          <Typography variant="subtitle1">Category</Typography>
          {categories.map((cat) => (
            <FormControlLabel
              key={cat}
              control={<Checkbox checked={category === cat} onChange={() => setCategory(cat === category ? "" : cat)} />}
              label={cat}
            />
          ))}

          {/* Location Filter */}
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Location
          </Typography>
          <Select fullWidth size="small" value={location} onChange={(e) => setLocation(e.target.value)} displayEmpty>
            <MenuItem value="">All</MenuItem>
            {locations.map((loc) => (
              <MenuItem key={loc} value={loc}>
                {loc}
              </MenuItem>
            ))}
          </Select>

          {/* Ratings Filter */}
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Ratings
          </Typography>
          {[4.0, 4.5, 4.7, 4.8, 5.0].map((rating) => (
            <FormControlLabel
              key={rating}
              control={<Checkbox checked={minRating === rating.toString()} onChange={() => setMinRating(minRating === rating.toString() ? "" : rating.toString())} />}
              label={`${rating}+`}
            />
          ))}
        </Grid>
      )}

      {/* Shops Display Section */}
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
