import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#333',
        color: '#fff',
        py: 3,
        mt: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Sección de redes sociales */}
      <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
        <IconButton href="https://facebook.com" target="_blank" color="inherit">
          <Facebook />
        </IconButton>
        <IconButton href="https://twitter.com" target="_blank" color="inherit">
          <Twitter />
        </IconButton>
        <IconButton href="https://instagram.com" target="_blank" color="inherit">
          <Instagram />
        </IconButton>
      </Box>

      {/* Nombre del aplicativo y derechos reservados */}
      <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
        Gerenciador de Biblioteca Online
      </Typography>
      <Typography variant="body2" sx={{ opacity: 0.7 }}>
        © 2024 Todos os direitos reservados.
      </Typography>
    </Box>
  );
}

export default Footer;
