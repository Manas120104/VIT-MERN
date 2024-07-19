import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';


function NavBar() {
  return (
    <AppBar>
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          
        </IconButton>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          Consult Ease
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/Sign-in">Sign in</Button>
        <Button color="inherit" component={Link} to="/Sign-up">Sign up</Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;