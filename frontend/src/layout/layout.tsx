// Layout.tsx
import React from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import Header from '../components/header';
import Sidebar from '../components/sidebar/sidebar';


const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header />
     <Sidebar/>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, ml: 30 }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
