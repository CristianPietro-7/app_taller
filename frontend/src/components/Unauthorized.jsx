// src/pages/Unauthorized.jsx
import React from 'react';
import { Typography, Box } from '@mui/material';

const Unauthorized = () => (
  <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
    <Typography variant="h4" color="error">
      Acceso no autorizado
    </Typography>
  </Box>
);

export default Unauthorized;
