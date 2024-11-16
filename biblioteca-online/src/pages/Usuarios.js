import React, { useState, useEffect } from 'react';
import ListaUsuarios from '../components/ListaUsuarios';
import FormularioUsuario from '../components/FormularioUsuario';
import {
  Container,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
} from '@mui/material';


function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [open, setOpen] = useState(false);
  const [usuarioEdit, setUsuarioEdit] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('usuarios')) || [];
    setUsuarios(data);
  }, []);

  const salvarUsuario = (usuario) => {
    let data = [...usuarios];
    if (usuario.id) {
      data = data.map((item) => (item.id === usuario.id ? usuario : item));
    } else {
      usuario.id = Date.now();
      data.push(usuario);
    }
    setUsuarios(data);
    localStorage.setItem('usuarios', JSON.stringify(data));
    setOpen(false);
    setUsuarioEdit(null);
  };

  const editarUsuario = (usuario) => {
    setUsuarioEdit(usuario);
    setOpen(true);
  };

  const excluirUsuario = (id) => {
    const data = usuarios.filter((usuario) => usuario.id !== id);
    setUsuarios(data);
    localStorage.setItem('usuarios', JSON.stringify(data));
  };

  const handleClickOpen = () => {
    setOpen(true);
    setUsuarioEdit(null);
  };

  const handleClose = () => {
    setOpen(false);
    setUsuarioEdit(null);
  };

  return (
    <Container
      sx={{
        backgroundColor: '#f7f9fc',
        borderRadius: 2,
        padding: 3,
        mt: 4,
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ fontWeight: 'bold', color: '#3a3a3a' }}
      >
        Lista de Usuários
      </Typography>
      <Box display="flex" justifyContent="center" mb={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
          sx={{
            fontWeight: 'bold',
            backgroundColor: '#4caf50',
            '&:hover': { backgroundColor: '#388e3c' },
          }}
        >
          Novo Usuário
        </Button>
      </Box>
      <Box mb={2} display="flex" justifyContent="center">
        <ListaUsuarios
          usuarios={usuarios}
          editarUsuario={editarUsuario}
          excluirUsuario={excluirUsuario}
        />
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: 3,
            boxShadow: 5,
          },
        }}
      >
        <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
          {usuarioEdit ? 'Editar Usuário' : 'Novo Usuário'}
        </DialogTitle>
        <DialogContent>
          <FormularioUsuario salvarUsuario={salvarUsuario} usuarioEdit={usuarioEdit} />
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default Usuarios;
