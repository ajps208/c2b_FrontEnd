import React from "react";
import { Grid, Typography, FormControlLabel, Checkbox, Select, MenuItem, Button } from "@mui/material";

const FilterComponent = ({ filters, showFilters, toggleFilters }) => {
  return (
    <Grid
      item
      xs={12}
      sm={3}
      md={2}
      sx={{
        p: 2,
        border: "1px solid black",
        borderRadius: "8px",
        height: "fit-content", // Will adjust to content height
        maxHeight: "500px", // Maximum height constraint
        overflowY: "auto", // Enables scrolling if content exceeds maxHeight
      }}
    >
      {/* Show Filter Button on Small Screens */}
      <Button
        variant="contained"
        onClick={toggleFilters}
        fullWidth
        sx={{ display: { xs: "block", sm: "none" }, mb: 1 }}
      >
        {showFilters ? "Hide Filters" : "Show Filters"}
      </Button>
      {/* Filters Section */}
      {showFilters && (
        <>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Filters
          </Typography>
          {filters.map((filter, index) => (
            <div key={index}>
              <Typography variant="subtitle1">{filter.label}</Typography>
              {filter.type === "checkbox" ? (
                filter.options.map((option) => (
                  <FormControlLabel
                    key={option}
                    control={
                      <Checkbox
                        checked={filter.state === option}
                        onChange={() =>
                          filter.setState(filter.state === option ? "" : option)
                        }
                      />
                    }
                    label={option}
                  />
                ))
              ) : (
                <Select
                  fullWidth
                  size="small"
                  value={filter.state}
                  onChange={(e) => filter.setState(e.target.value)}
                  displayEmpty
                >
                  <MenuItem value="">All</MenuItem>
                  {filter.options.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              )}
            </div>
          ))}
        </>
      )}
    </Grid>
  );
};

export default FilterComponent;