import { Box, Divider, Grid, Card, CardContent, Typography, IconButton, Radio, RadioGroup, FormControlLabel, TextField, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";

const orders = [
  { id: 1, name: "Product A", qty: 2, price: 50, image: "https://via.placeholder.com/50" },
  { id: 2, name: "Product B", qty: 1, price: 30, image: "https://via.placeholder.com/50" },
  { id: 3, name: "Product C", qty: 3, price: 75, image: "https://via.placeholder.com/50" },
  { id: 3, name: "Product C", qty: 3, price: 75, image: "https://via.placeholder.com/50" },
  { id: 3, name: "Product C", qty: 3, price: 75, image: "https://via.placeholder.com/50" },
  { id: 3, name: "Product C", qty: 3, price: 75, image: "https://via.placeholder.com/50" },
  { id: 3, name: "Product C", qty: 3, price: 75, image: "https://via.placeholder.com/50" },
  { id: 3, name: "Product C", qty: 3, price: 75, image: "https://via.placeholder.com/50" },
  { id: 3, name: "Product C", qty: 3, price: 75, image: "https://via.placeholder.com/50" },
  { id: 3, name: "Product C", qty: 3, price: 75, image: "https://via.placeholder.com/50" },
];

const BuyList = () => {
  const [paymentType, setPaymentType] = useState("debit");
  const [debit, setDebit] = useState(0);
  const [credit, setCredit] = useState(0);
  const totalAmount = orders.reduce((sum, order) => sum + order.price * order.qty, 0);
  const isValid = parseFloat(debit) + parseFloat(credit) === totalAmount;

  return (
    <Grid sx={{ width: "100%", height: "100%", backgroundColor: "#f8f9fa", p: 1, borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "normal", color: "#333" }}>
        Orders
      </Typography>
      <Divider />

      <Box
        sx={{
          width: "100%",
          height: "33vh",
          overflow: "auto",
          backgroundColor: "#ffffff",
          p: 1,
          borderRadius: 2,
          boxShadow: 2,
          "&::-webkit-scrollbar": { width: "6px" },
          "&::-webkit-scrollbar-thumb": { backgroundColor: "#888", borderRadius: "4px" },
        }}
      >
        {orders.map((order) => (
          <Card key={order.id} sx={{ width: "100%", height: "8vh", display: "flex", alignItems: "center", mb: 1, p: 1, borderRadius: 2, boxShadow: 1 }}>
            <Box sx={{ width: "20%", display: "flex", justifyContent: "center" }}>
              <img src={order.image} alt={order.name} style={{ width: 60, height: 60, borderRadius: 8 }} />
            </Box>
            <CardContent sx={{ width: "60%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>{order.name}</Typography>
              <Typography variant="body2" sx={{ color: "gray" }}>Qty: {order.qty} | Price: ${order.price}</Typography>
            </CardContent>
            <Box sx={{ width: "20%", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <IconButton color="error">
                <DeleteIcon />
              </IconButton>
            </Box>
          </Card>
        ))}
      </Box>

      <Box sx={{ width: "100%", p:1, backgroundColor: "#fff", borderRadius: 2, boxShadow: 2, mt: 1 }}>
        <RadioGroup row value={paymentType} onChange={(e) => setPaymentType(e.target.value)}>
          <FormControlLabel value="debit" control={<Radio />} label="Debit" />
          <FormControlLabel value="credit" control={<Radio />} label="Credit" />
          <FormControlLabel value="both" control={<Radio />} label="Debit & Credit" />
        </RadioGroup>
        {paymentType === "debit" || paymentType === "credit" ? (
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>Total: ${totalAmount}</Typography>
        ) : (
          <Box sx={{ display: "flex", gap: 2, mt: 1}}>
            <TextField label="Debit" type="number" value={debit} onChange={(e) => setDebit(e.target.value)} fullWidth sx={{ "& .MuiInputBase-root": { height: 36 } }} />
            <TextField label="Credit" type="number" value={credit} onChange={(e) => setCredit(e.target.value)} fullWidth sx={{ "& .MuiInputBase-root": { height: 36 } }} />
            <TextField label="Total" type="number" value={totalAmount} disabled fullWidth sx={{ "& .MuiInputBase-root": { height: 36 } }} />
          </Box>
        )}
        {!isValid && paymentType === "both" && (
          <Typography color="error" sx={{ mt: 1 }}>Debit + Credit must equal Total</Typography>
        )}
        <Button variant="contained" color="primary" fullWidth sx={{py: 1.5, fontSize: "1rem", fontWeight: "semibold", height:36 }}>
          Place Order
        </Button>
      </Box>
    </Grid>
  );
};

export default BuyList;
