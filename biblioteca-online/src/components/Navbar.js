import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, useMediaQuery, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/system';

const NavbarButton = styled(Button)(({ theme }) => ({
  color: '#ffffff',
  fontWeight: 'bold',
  marginLeft: theme.spacing(2),
  '&:hover': {
    color: '#ffcc00',
    transform: 'scale(1.1)',
    transition: 'all 0.3s ease',
  },
}));

const HighlightedTypography = styled(Typography)({
  color: '#ffffff',
  fontWeight: 'bold',
  fontSize: '1.5rem',
  fontFamily: 'Roboto, sans-serif',
  letterSpacing: '0.1rem',
  transition: 'all 0.5s ease',
  '&:hover': {
    color: '#ffcc00',
    textShadow: '2px 2px 5px rgba(0,0,0,0.3)',
  },
});

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');
  const location = useLocation();

  const toggleDrawer = (open) => (event) => {
    setDrawerOpen(open);
  };

  const navItems = [
    { text: 'Dashboard', to: '/' },
    { text: 'Livros', to: '/livros' },
    { text: 'Autores', to: '/autores' },
    { text: 'Categorias', to: '/categorias' },
    { text: 'Usuários', to: '/usuarios' },
    { text: 'Aluguel e Vendas', to: '/emprestimos' },
  ];

  return (
    <AppBar position="static" sx={{ backgroundColor: '#333', boxShadow: 3 }}>
      <Toolbar>
        <HighlightedTypography variant="h6" sx={{ flexGrow: 1 }}>
          Gerenciador de Biblioteca Online
        </HighlightedTypography>

        {isMobile ? (
          <>
            <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
              <Box
                sx={{ width: 250, backgroundColor: '#333', height: '100%' }}
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
              >
                <List>
                  {navItems.map((item, index) => (
                    <ListItem
                      button
                      key={index}
                      component={Link}
                      to={item.to}
                      sx={{
                        color: location.pathname === item.to ? '#ffcc00' : '#ffffff',
                        fontWeight: location.pathname === item.to ? 'bold' : 'normal',
                      }}
                    >
                      <ListItemText primary={item.text} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Drawer>
          </>
        ) : (
          navItems.map((item, index) => (
            <NavbarButton
              key={index}
              component={Link}
              to={item.to}
              sx={{
                color: location.pathname === item.to ? '#ffcc00' : '#ffffff',
                borderBottom: location.pathname === item.to ? '2px solid #ffcc00' : 'none',
              }}
            >
              {item.text}
            </NavbarButton>
          ))
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
