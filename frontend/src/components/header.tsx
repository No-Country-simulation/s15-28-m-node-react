import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleIconClick = () => {
    navigate('/register');
  };

  return (
    <AppBar position="fixed" color="primary">
      <Toolbar>
        <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
          {/* Logo */}
          <Box display="flex" alignItems="center">
            <img src="/path/to/your/logo.png" alt="Logo" style={{ height: 40, marginRight: 10 }} />
            <Typography variant="h6" component="div">
              Time Keeper
            </Typography>
          </Box>
          {/* Login Icon */}
          <IconButton edge="end" color="inherit" aria-label="login" onClick={handleIconClick}>
            <AccountCircleIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
