import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import { shops } from "../../../DemoData";
import FilterComponent from "@/COMMON/FilterComponent";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
import CardComponent from "@/COMMON/Cards";

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

  // Configure shop card info items
  const shopInfoItems = [
    {
      icon: <StarIcon color="warning" />,
      content: (shop) => `${shop.ratings} (${shop.total_reviews} reviews)`
    },
    {
      icon: <LocationOnIcon color="action" />,
      content: "location"
    }
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
                <CardComponent 
                  item={shop}
                  title="name"
                  infoItems={shopInfoItems}
                  chips="offers"
                  buttonText="View Shop"
                  routePath="/Shops"
                />
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