import React from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import Header from '../components/header';
import Sidebar from '../components/sidebar/sidebar';
import { useAuth } from '../context/auth-context';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoggedIn } = useAuth();

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header />
      {isLoggedIn && <Sidebar />}
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, ml: isLoggedIn ? 30 : 0 }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
