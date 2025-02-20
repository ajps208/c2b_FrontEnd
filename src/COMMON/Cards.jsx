import { Card, CardMedia, CardContent, Typography, Box, Chip, Button } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";

const GeneralCard = ({
  image,
  title,
  rating,
  totalReviews,
  location,
  tags,
  actionButtonText,
  onActionButtonClick,
}) => {
  return (
    <Card sx={{ maxWidth: 345, borderRadius: 2, boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="180"
        image={image || "/images/placeholder.jpg"}
        alt={title}
      />
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          {title}
        </Typography>

        {rating && (
          <Box display="flex" alignItems="center" gap={1} my={1}>
            <StarIcon color="warning" fontSize="small" />
            <Typography variant="body2">
              {rating} ({totalReviews} reviews)
            </Typography>
          </Box>
        )}

        {location && (
          <Box display="flex" alignItems="center" gap={1} my={1}>
            <LocationOnIcon color="action" fontSize="small" />
            <Typography variant="body2">{location}</Typography>
          </Box>
        )}

        {tags && tags.length > 0 && (
          <Box display="flex" flexWrap="wrap" gap={1} my={1}>
            {tags.map((tag, index) => (
              <Chip key={index} label={tag} color="primary" size="small" />
            ))}
          </Box>
        )}

        {actionButtonText && (
          <Button variant="contained" color="primary" fullWidth onClick={onActionButtonClick}>
            {actionButtonText}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default GeneralCard;