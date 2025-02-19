import { useRouter } from "next/navigation";
import { Card, CardMedia, CardContent, Typography, Box, Chip, Button } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";

const ShopCard = ({ shop }) => {
  const router = useRouter();

  const handleShopClick = () => {
    router.push(`/Shops/${shop.id}`);
  };

  return (
    <Card sx={{ maxWidth: 345, borderRadius: 2, boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="180"
        image={shop.images[0] || "/images/placeholder.jpg"}
        alt={shop.name}
      />
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          {shop.name}
        </Typography>

        <Box display="flex" alignItems="center" gap={1} my={1}>
          <StarIcon color="warning" fontSize="small" />
          <Typography variant="body2">
            {shop.ratings} ({shop.total_reviews} reviews)
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1} my={1}>
          <LocationOnIcon color="action" fontSize="small" />
          <Typography variant="body2">{shop.location}</Typography>
        </Box>

        <Box display="flex" flexWrap="wrap" gap={1} my={1}>
          {shop.offers.map((offer, index) => (
            <Chip key={index} label={offer} color="primary" size="small" />
          ))}
        </Box>

        <Button variant="contained" color="primary" fullWidth onClick={handleShopClick}>
          View Shop
        </Button>
      </CardContent>
    </Card>
  );
};

export default ShopCard;
