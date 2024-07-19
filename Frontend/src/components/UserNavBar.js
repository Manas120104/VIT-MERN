import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

function UserNavBar({ handleLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          USER DASHBOARD
        </Typography>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Button color="inherit" component={Link} to="/" sx={{ ml: 2 }}>Home</Button>
          <Button color="inherit" component={Link} to="/submitcomplaint" sx={{ ml: 2 }}>Submit Complaint</Button>
          <Button color="inherit" component={Link} to="/usercomplaintdetails" sx={{ ml: 2 }}>View Complaints</Button>
          <Button color="inherit" component={Link} to="/userprofile" sx={{ ml: 2 }}>My Profile</Button>
          <Button color="inherit" onClick={handleLogout} sx={{ ml: 2 }}>Logout</Button>
        </Box>
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
            sx={{ ml: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={null}
            open={menuOpen}
            onClose={handleMenuClose}
            onClick={handleMenuClose}
          >
            <MenuItem component={Link} to="/" sx={{ color: 'inherit' }}>Home</MenuItem>
            <MenuItem component={Link} to="/submitcomplaint" sx={{ color: 'inherit' }}>Submit Complaint</MenuItem>
            <MenuItem component={Link} to="/usercomplaintdetails" sx={{ color: 'inherit' }}>View Complaints</MenuItem>
            <MenuItem component={Link} to="/userprofile" sx={{ color: 'inherit' }}>My Profile</MenuItem>
            <MenuItem onClick={handleLogout} sx={{ color: 'inherit' }}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default UserNavBar;
