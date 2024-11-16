import React, { useState, useEffect } from 'react';
import ListaEmprestimos from '../components/ListaEmprestimos';
import FormularioEmprestimo from '../components/FormularioEmprestimo';
import PagamentoModal from '../components/PagamentoModal';
import {
  Container,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
} from '@mui/material';


function Emprestimos() {
  const [emprestimos, setEmprestimos] = useState([]);
  const [open, setOpen] = useState(false);
  const [emprestimoEdit, setEmprestimoEdit] = useState(null);

  const [openPagamento, setOpenPagamento] = useState(false);
  const [emprestimoParaPagamento, setEmprestimoParaPagamento] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('emprestimos')) || [];
    setEmprestimos(data);
  }, []);

  const salvarEmprestimo = (emprestimo) => {
    let data = [...emprestimos];
    if (emprestimo.id) {
      data = data.map((item) => (item.id === emprestimo.id ? emprestimo : item));
    } else {
      emprestimo.id = Date.now();
      emprestimo.devuelto = emprestimo.tipo === 'purchase' ? true : false;
      emprestimo.dataDevolucaoUsuario = emprestimo.tipo === 'purchase' ? emprestimo.dataEmprestimo : '';
      emprestimo.fineApplied = false;
      data.push(emprestimo);

      // Atualizar quantidade do livro se tipo for purchase
      if (emprestimo.tipo === 'purchase') {
        const storedLivros = JSON.parse(localStorage.getItem('livros')) || [];
        const livroIndex = storedLivros.findIndex((livro) => livro.id === emprestimo.livroId);
        if (livroIndex !== -1) {
          storedLivros[livroIndex].quantidade -= emprestimo.quantidade;
          // Garantir que a quantidade não fique negativa
          if (storedLivros[livroIndex].quantidade < 0) {
            storedLivros[livroIndex].quantidade = 0;
          }
          localStorage.setItem('livros', JSON.stringify(storedLivros));
        }
      }
    }
    setEmprestimos(data);
    localStorage.setItem('emprestimos', JSON.stringify(data));
    setOpen(false);
    setEmprestimoEdit(null);
  };

  const editarEmprestimo = (emprestimo) => {
    setEmprestimoEdit(emprestimo);
    setOpen(true);
  };

  const excluirEmprestimo = (id) => {
    const emprestimo = emprestimos.find((e) => e.id === id);
    let data = emprestimos.filter((emprestimo) => emprestimo.id !== id);

    // Se o empréstimo for do tipo purchase, aumentar a quantidade do livro
    if (emprestimo.tipo === 'purchase') {
      const storedLivros = JSON.parse(localStorage.getItem('livros')) || [];
      const livroIndex = storedLivros.findIndex((livro) => livro.id === emprestimo.livroId);
      if (livroIndex !== -1) {
        storedLivros[livroIndex].quantidade += emprestimo.quantidade;
        localStorage.setItem('livros', JSON.stringify(storedLivros));
      }
    }

    setEmprestimos(data);
    localStorage.setItem('emprestimos', JSON.stringify(data));
  };

  const marcarComoDevuelto = (id) => {
    const emprestimo = emprestimos.find((e) => e.id === id);
    setEmprestimoParaPagamento(emprestimo);
    setOpenPagamento(true);
  };

  const finalizarPagamento = (updatedEmprestimo) => {
    const data = emprestimos.map((emprestimo) => {
      if (emprestimo.id === updatedEmprestimo.id) {
        return updatedEmprestimo;
      }
      return emprestimo;
    });
    setEmprestimos(data);
    localStorage.setItem('emprestimos', JSON.stringify(data));

    // Se o empréstimo for do tipo 'rental' e foi devolvido, aumentar a quantidade do livro
    if (updatedEmprestimo.tipo === 'rental' && updatedEmprestimo.devuelto) {
      const storedLivros = JSON.parse(localStorage.getItem('livros')) || [];
      const livroIndex = storedLivros.findIndex((livro) => livro.id === updatedEmprestimo.livroId);
      if (livroIndex !== -1) {
        storedLivros[livroIndex].quantidade += updatedEmprestimo.quantidade;
        localStorage.setItem('livros', JSON.stringify(storedLivros));
      }
    }

    setOpenPagamento(false);
    setEmprestimoParaPagamento(null);
  };

  const handleClickOpen = () => {
    setOpen(true);
    setEmprestimoEdit(null);
  };

  const handleClose = () => {
    setOpen(false);
    setEmprestimoEdit(null);
  };

  return (
    <Container
      sx={{
        backgroundColor: '#f7f9fc',
        borderRadius: 2,
        padding: 3,
        mt: 4,
        boxShadow: 3,
        maxWidth: '90%', 
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ fontWeight: 'bold', color: '#3a3a3a' }}
      >
        Lista de Aluguel e Vendas
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
          Novo Pedido
        </Button>
      </Box>
      <Box
        mb={2}
        display="flex"
        justifyContent="center"
        sx={{
          maxHeight: '500px', 
          overflowY: 'auto',   
          width: '100%',       
        }}
      >
        <ListaEmprestimos
          emprestimos={emprestimos}
          editarEmprestimo={editarEmprestimo}
          excluirEmprestimo={excluirEmprestimo}
          marcarComoDevuelto={marcarComoDevuelto}
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
          {emprestimoEdit ? 'Editar Empréstimo' : 'Novo Empréstimo'}
        </DialogTitle>
        <DialogContent>
          <FormularioEmprestimo
            salvarEmprestimo={salvarEmprestimo}
            emprestimoEdit={emprestimoEdit}
          />
        </DialogContent>
      </Dialog>
      <PagamentoModal
        open={openPagamento}
        onClose={() => setOpenPagamento(false)}
        emprestimo={emprestimoParaPagamento}
        finalizarPagamento={finalizarPagamento}
      />
    </Container>
  );
}

export default Emprestimos;
