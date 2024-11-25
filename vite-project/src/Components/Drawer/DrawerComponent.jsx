import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import { IconButton, ListItemText, ListItemIcon, Divider, Box, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { ListItemButton } from '@mui/material';
import CottageIcon from '@mui/icons-material/Cottage';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import Logo from '../../../Public/Assets/metro-logo.png';
import { Link, useNavigate } from 'react-router-dom';

import LogoutIcon from '@mui/icons-material/Logout';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';

const DrawerComponent = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const isLoggedIn = !!localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('email')
    navigate('/');
  };
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  const pages = [
    { name: 'Home', icon: <CottageIcon />, url: '/' },
    { name: 'Store', icon: <StorefrontIcon />, url: '/store' },
    { name: 'Cart', icon: <ShoppingCartIcon />, url: '/cart' },
    { name: isLoggedIn ? 'Logout' : 'Login', icon: isLoggedIn ? <LogoutIcon /> : <LoginIcon />, url: isLoggedIn ? '/' : '/login' },
  ];
  
  if (isAdmin) {
    pages.push({ name: 'admin', icon: <SettingsSuggestIcon />, url: '/admin' });
  } else if (isLoggedIn) {
    pages.push({ name: 'Profile', icon: <SettingsSuggestIcon />, url: '/profile' });
  }
  
  return (
    <React.Fragment>
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        sx={{ '& .MuiDrawer-paper': { width: 300, display: 'flex', flexDirection: 'column' } }}
      >
        <IconButton
          onClick={() => setOpenDrawer(false)}
          sx={{ position: 'absolute', top: 0, left: 0 }}
        >
          <CloseIcon />
        </IconButton>
        <List sx={{ marginTop: '64px', marginLeft: '20px' }}>
          {pages.map((page, index) => (
            <Link to={page.url} key={index} style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemButton
                disableRipple
                onClick={() => {
                  if (page.name === 'Logout') {
                    handleLogout();
                  }
                  setOpenDrawer(false);
                }}
                sx={{
                  '& .MuiListItemIcon-root, & .MuiListItemText-root': {
                    opacity: 0.8,
                  },
                  '&:hover': {
                    backgroundColor: 'transparent',
                    '& .MuiListItemIcon-root, & .MuiListItemText-root': {
                      opacity: 1,
                    },
                  },
                }}
              >
                <ListItemIcon>{page.icon}</ListItemIcon>
                <ListItemText>{page.name}</ListItemText>
              </ListItemButton>
            </Link>
          ))}
        </List>
        <Box sx={{ flexGrow: 1 }} />
        <Divider />
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '40px' }}>
          <Box sx={{ marginBottom: '0px' }}>
            <IconButton>
              <InstagramIcon />
            </IconButton>
            <IconButton>
              <TwitterIcon />
            </IconButton>
            <IconButton>
              <FacebookIcon />
            </IconButton>
          </Box>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src={Logo} alt="Logo" style={{ width: '250px', height: 'auto' }} />
          </Link>
          <Typography variant="subtitle1" sx={{ marginTop: '1px', fontSize: '9px' }}>
            © 2023 Metro 2023. All rights reserved.
          </Typography>
        </Box>

      </Drawer>
      <IconButton
        sx={{ color: 'black', marginRight: 'right', position: 'absolute', right: '0' }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon color="black" />
      </IconButton>
    </React.Fragment>
  );
};

export default DrawerComponent;
