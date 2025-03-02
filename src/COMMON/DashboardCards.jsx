import React, { useState } from "react";
import { Card, CardContent, Typography, Grid, Modal, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import { styled } from '@mui/material/styles';

// Styled components for reusable cards
const StyledCard = styled(Card)(({ theme, color = "#4CAF50" }) => ({
  cursor: "pointer",
  background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
  color: '#fff',
  borderRadius: '12px',
  boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 20px rgba(0,0,0,0.2)',
  },
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    width: '150px',
    height: '150px',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '50%',
    top: '-75px',
    right: '-75px',
  }
}));

const CardIcon = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '15px',
  right: '15px',
  opacity: 0.5,
  fontSize: '2rem',
}));

const CardTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1.1rem',
  marginBottom: '0.5rem',
}));

const CardValue = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '2rem',
  letterSpacing: '0.5px',
}));

// Enhanced styled modal
const StyledModal = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxWidth: '1000px',
  backgroundColor: '#fff',
  borderRadius: '12px',
  boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
  padding: '24px',
  '& .MuiTypography-h5': {
    fontWeight: 700,
    color: '#2a3b4c',
    marginBottom: '20px',
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '-8px',
      left: 0,
      width: '50px',
      height: '4px',
      background: '#4CAF50',
      borderRadius: '2px'
    }
  }
}));

// Reusable Dashboard Card Component
export const DashboardCard = ({ 
  title, 
  value, 
  icon, 
  color = "#4CAF50", 
  onClick, 
  subtitle = "Click for details"
}) => {
  return (
    <StyledCard color={color} onClick={onClick}>
      <CardContent>
        <CardIcon>{icon}</CardIcon>
        <CardTitle variant="h6">{title}</CardTitle>
        <CardValue variant="h4">{value}</CardValue>
        <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
          {subtitle}
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

// Reusable Data Modal Component
export const DataModal = ({ 
  open, 
  onClose, 
  title, 
  data, 
  excludeFields = [], 
  formatters = {} 
}) => {
  return (
    <Modal 
      open={open} 
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <StyledModal>
        <Typography variant="h5" id="modal-title">{title}</Typography>
        {data && data.length > 0 ? (
          <TableContainer 
            component={Paper} 
            sx={{ 
              boxShadow: 'none', 
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              overflow: 'hidden'
            }}
          >
            <Table>
              <TableHead sx={{ background: '#f5f5f5' }}>
                <TableRow>
                  {Object.keys(data[0])
                    .filter(key => 
                      !excludeFields.includes(key) && 
                      !Array.isArray(data[0][key]) && 
                      typeof data[0][key] !== 'object'
                    )
                    .map((key) => (
                      <TableCell 
                        key={key}
                        sx={{ 
                          fontWeight: 'bold', 
                          color: '#2a3b4c',
                          textTransform: 'capitalize'
                        }}
                      >
                        {key.replace(/_/g, ' ')}
                      </TableCell>
                    ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, index) => (
                  <TableRow 
                    key={index}
                    sx={{ 
                      '&:nth-of-type(odd)': { 
                        backgroundColor: 'rgba(0, 0, 0, 0.02)' 
                      },
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)'
                      }
                    }}
                  >
                    {Object.entries(row)
                      .filter(([key, value]) => 
                        !excludeFields.includes(key) && 
                        !Array.isArray(value) && 
                        typeof value !== 'object'
                      )
                      .map(([key, value], i) => (
                        <TableCell key={i}>
                          {formatters[key] ? formatters[key](value) : value.toString()}
                        </TableCell>
                      ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="body1">No data available</Typography>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button 
            onClick={onClose} 
            variant="contained"
            sx={{ 
              background: 'linear-gradient(45deg, #4CAF50 30%, #8BC34A 90%)',
              boxShadow: '0 3px 5px 2px rgba(76, 175, 80, .3)',
              borderRadius: '30px',
              padding: '8px 22px'
            }}
          >
            Close
          </Button>
        </Box>
      </StyledModal>
    </Modal>
  );
};

// Reusable Dashboard Grid Component
export const DashboardCardGrid = ({ 
  title = "",
  cards = [], 
  gridSpacing = 4 
}) => {
  return (
    <Box sx={{ p: 3, background: '#f5f7fa', minHeight: '100vh' }}>
      {title && (
        <Typography 
          variant="h4" 
          sx={{ 
            mb: 4, 
            fontWeight: 700, 
            color: '#2a3b4c',
            textAlign: 'center',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80px',
              height: '4px',
              background: 'linear-gradient(90deg, #4CAF50, #8BC34A)',
              borderRadius: '2px'
            }
          }}
        >
          {title}
        </Typography>
      )}
      <Grid container spacing={gridSpacing}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={card.gridSize || 4} key={index}>
            <DashboardCard {...card} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};