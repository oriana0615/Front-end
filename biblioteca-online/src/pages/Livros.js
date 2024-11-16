import React, { useState, useEffect } from 'react';
import ListaLivros from '../components/ListaLivros';
import FormularioLivro from '../components/FormularioLivro';
import { getLivros } from '../services/livroService';
import {
  Container,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
} from '@mui/material';


function Livros() {
  const [livros, setLivros] = useState([]);
  const [emprestimos, setEmprestimos] = useState([]);
  const [open, setOpen] = useState(false);
  const [livroEdit, setLivroEdit] = useState(null);

  useEffect(() => {
    // Carregar livros
    const storedLivros = getLivros();
    console.log('Livros carregados:', storedLivros);
    setLivros(storedLivros);

    // Carregar empréstimos
    const storedEmprestimos = JSON.parse(localStorage.getItem('emprestimos')) || [];
    console.log('Empréstimos carregados:', storedEmprestimos);
    setEmprestimos(storedEmprestimos);
  }, []);

  // Função para salvar ou atualizar um livro
  const salvarLivro = (livro) => {
    let data = [...livros];
    if (livro.id) {
      data = data.map((item) => (item.id === livro.id ? livro : item));
    } else {
      livro.id = Date.now();
      data.push(livro);
    }
    setLivros(data);
    localStorage.setItem('livros', JSON.stringify(data));
    console.log('Livros salvos no localStorage:', data);
    setOpen(false);
    setLivroEdit(null);
  };

  // Função para editar um livro
  const editarLivro = (livro) => {
    setLivroEdit(livro);
    setOpen(true);
  };

  // Função para excluir um livro
  const excluirLivro = (id) => {
    // Antes de excluir, verificar se o livro está emprestado
    const livroEmprestado = emprestimos.some(
      (emprestimo) => emprestimo.livroId === id && !emprestimo.devuelto
    );
    if (livroEmprestado) {
      alert('Não é possível excluir um livro que está emprestado.');
      return;
    }

    const data = livros.filter((livro) => livro.id !== id);
    setLivros(data);
    localStorage.setItem('livros', JSON.stringify(data));
    console.log('Livro excluído. Livros atualizados no localStorage:', data);
  };

  const handleClickOpen = () => {
    setOpen(true);
    setLivroEdit(null);
  };

  const handleClose = () => {
    setOpen(false);
    setLivroEdit(null);
  };

  return (
    <Container
      sx={{
        backgroundColor: '#f7f9fc',
        borderRadius: 2,
        padding: 3,
        mt: 4,
        boxShadow: 3,
        maxWidth: '90%', // Ajuste conforme necessário
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ fontWeight: 'bold', color: '#3a3a3a' }}
      >
        Catálogo de Livros
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
          Adicionar Novo Livro
        </Button>
      </Box>
      <Box
        mb={2}
        display="flex"
        justifyContent="center"
        sx={{
          maxHeight: '500px', // Define a altura máxima da lista de livros
          overflowY: 'auto',   // Habilita a rolagem vertical quando necessário
          width: '100%',       // Garante que a tabela ocupe toda a largura disponível
        }}
      >
        <ListaLivros
          livros={livros}
          editarLivro={editarLivro}
          excluirLivro={excluirLivro}
          emprestimos={emprestimos}
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
          {livroEdit ? 'Editar Livro' : 'Novo Livro'}
        </DialogTitle>
        <DialogContent>
          <FormularioLivro salvarLivro={salvarLivro} livroEdit={livroEdit} />
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default Livros;
