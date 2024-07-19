// import React from 'react';
// import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
// import { Link } from 'react-router-dom';


// function AdminNavbar({handleRoleChange}) {
//   return (
//     <AppBar>
//       <Toolbar>
//         <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          
//         </IconButton>
//         <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
//           ADMIN DASHBOARD
//         </Typography>
//         <Button color="inherit" component={Link} to="/">Home</Button>
//         <Button color="inherit" component={Link} to="/admincomplaintdetails">View Complaints</Button>
//         <Button color="inherit" component={Link} to="/assignagents">Assign Agents</Button>
//         <Button color="inherit" component={Link} to="/" onClick={()=>{handleRoleChange(null);sessionStorage.removeItem('userId');sessionStorage.removeItem('userRole')}}>Logout</Button>
//       </Toolbar>
//     </AppBar>
//   );
// }

// export default AdminNavbar;

import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

function AgentNavbar({ handleLogout }) {
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
          ADMIN DASHBOARD
        </Typography>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Button color="inherit" component={Link} to="/" sx={{ ml: 2 }}>Home</Button>
          <Button color="inherit" component={Link} to="/admincomplaintdetails" sx={{ ml: 2 }}>View Complaints</Button>
          <Button color="inherit" component={Link} to="/assignagents" sx={{ ml: 2 }}>Assign Agents</Button>
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
            <MenuItem component={Link} to="/admincomplaintdetails" sx={{ color: 'inherit' }}>View Complaints</MenuItem>
            <MenuItem component={Link} to="/assignagents" sx={{ color: 'inherit' }}>Assign Agents</MenuItem>
            <MenuItem onClick={handleLogout} sx={{ color: 'inherit' }}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default AgentNavbar;
