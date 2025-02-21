import * as React from 'react';
import { useRouter } from "next/navigation";
import { Card, CardMedia, CardContent, Typography, Box, Chip, Button } from "@mui/material";

const CardComponent = ({ 
  item, 
  imageKey = "images",
  imageIndex = 0,
  placeholderImage = "/images/placeholder.jpg",
  title,
  chips,
  infoItems = [],
  buttonText = "View Details",
  buttonAction,
  routePath,
  routeIdKey = "id"
}) => {
  const router = useRouter();
  
  const handleClick = () => {
    if (buttonAction) {
      buttonAction(item);
    } else if (routePath) {
      router.push(`${routePath}/${item[routeIdKey]}`);
    }
  };

  // Get image source - can handle both array of images or single image string
  const imageSrc = Array.isArray(item[imageKey]) 
    ? (item[imageKey][imageIndex] || placeholderImage)
    : (item[imageKey] || placeholderImage);

  return (
    <Card sx={{ maxWidth: 345, borderRadius: 2, boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="180"
        image={imageSrc}
        alt={typeof title === 'function' ? title(item) : item[title] || "Item image"}
      />
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          {typeof title === 'function' ? title(item) : item[title]}
        </Typography>
        
        {infoItems.map((info, index) => (
          <Box key={index} display="flex" alignItems="center" gap={1} my={1}>
            {info.icon && React.cloneElement(info.icon, { fontSize: "small" })}
            <Typography variant="body2">
              {typeof info.content === 'function' 
                ? info.content(item) 
                : item[info.content] || info.defaultText || ''}
            </Typography>
          </Box>
        ))}
        
        {chips && (
          <Box display="flex" flexWrap="wrap" gap={1} my={1}>
            {(typeof chips === 'function' ? chips(item) : item[chips] || []).map((chipItem, index) => (
              <Chip 
                key={index} 
                label={chipItem} 
                color="primary" 
                size="small" 
              />
            ))}
          </Box>
        )}
        
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth 
          onClick={handleClick}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CardComponent;