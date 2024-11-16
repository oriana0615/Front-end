import React, { useState, useEffect } from 'react';
import ListaCategorias from '../components/ListaCategorias';
import FormularioCategoria from '../components/FormularioCategoria';
import categoriasData from '../components/data/categorias.json'; 
import {
  Container,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
} from '@mui/material';


function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [open, setOpen] = useState(false);
  const [categoriaEdit, setCategoriaEdit] = useState(null);

  useEffect(() => {
    const storedCategorias = JSON.parse(localStorage.getItem('categorias'));
    if (storedCategorias && storedCategorias.length > 0) {
      // Se houver categorias no localStorage, mesclar com as do JSON para evitar duplicações
      const mergedCategorias = mergeCategorias(storedCategorias, categoriasData);
      setCategorias(mergedCategorias);
      localStorage.setItem('categorias', JSON.stringify(mergedCategorias));
    } else {
      // Se o localStorage estiver vazio, carregar do JSON
      setCategorias(categoriasData);
      localStorage.setItem('categorias', JSON.stringify(categoriasData));
    }
  }, []);

  // Função para mesclar categorias, evitando duplicações baseadas no nome
  const mergeCategorias = (stored, json) => {
    const nomesExistentes = stored.map((categoria) => categoria.nome);
    const novasCategorias = json.filter((categoria) => !nomesExistentes.includes(categoria.nome));
    return [...stored, ...novasCategorias];
  };

  const salvarCategoria = (categoria) => {
    let data = [...categorias];
    if (categoria.id) {
      data = data.map((item) => (item.id === categoria.id ? categoria : item));
    } else {
      categoria.id = Date.now();
      data.push(categoria);
    }
    setCategorias(data);
    localStorage.setItem('categorias', JSON.stringify(data));
    setOpen(false);
    setCategoriaEdit(null);
  };

  const editarCategoria = (categoria) => {
    setCategoriaEdit(categoria);
    setOpen(true);
  };

  const excluirCategoria = (id) => {
    const data = categorias.filter((categoria) => categoria.id !== id);
    setCategorias(data);
    localStorage.setItem('categorias', JSON.stringify(data));
  };

  const handleClickOpen = () => {
    setOpen(true);
    setCategoriaEdit(null);
  };

  const handleClose = () => {
    setOpen(false);
    setCategoriaEdit(null);
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
        Lista de Categorias
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
          Nova Categoria
        </Button>
      </Box>
      <Box mb={2} display="flex" justifyContent="center">
        <ListaCategorias
          categorias={categorias}
          editarCategoria={editarCategoria}
          excluirCategoria={excluirCategoria}
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
          {categoriaEdit ? 'Editar Categoria' : 'Nova Categoria'}
        </DialogTitle>
        <DialogContent>
          <FormularioCategoria salvarCategoria={salvarCategoria} categoriaEdit={categoriaEdit} />
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default Categorias;
