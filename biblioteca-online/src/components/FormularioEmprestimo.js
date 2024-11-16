import React, { useState, useEffect } from 'react';
import { getLivros } from '../services/livroService';
import { getUsuarios } from '../services/usuarioService';
import { getEmprestimos } from '../services/emprestimoService';
import { validarEmprestimo } from '../validators/emprestimoValidator';
import PagamentoModal from './PagamentoModal';
import {
  TextField,
  Button,
  MenuItem,
  Alert,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';


function FormularioEmprestimo({ salvarEmprestimo, emprestimoEdit }) {
  const [emprestimo, setEmprestimo] = useState({
    livroId: '',
    livroTitulo: '',
    usuario: '',
    dataEmprestimo: '',
    dataDevolucao: '',
    dataDevolucaoUsuario: '',
    quantidade: 1,
    tipo: 'rental', 
    price: 0,
    discountApplied: false,
    devuelto: false,
    fineApplied: false,
    paymentMethod: '',
  });

  const [erros, setErros] = useState({});
  // const [alerta, setAlerta] = useState('');
  const [alerta] = useState('');

  const [livros, setLivros] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [emprestimos, setEmprestimos] = useState([]);

  const [openPagamento, setOpenPagamento] = useState(false);

  useEffect(() => {
    if (emprestimoEdit) {
      setEmprestimo({
        ...emprestimoEdit,
        quantidade: emprestimoEdit.quantidade || 1,
        tipo: emprestimoEdit.tipo || 'rental',
        price: emprestimoEdit.price || 0,
        discountApplied: emprestimoEdit.discountApplied || false,
        dataDevolucaoUsuario: emprestimoEdit.dataDevolucaoUsuario || '',
        devuelto: emprestimoEdit.devuelto || false,
        fineApplied: emprestimoEdit.fineApplied || false,
        paymentMethod: emprestimoEdit.paymentMethod || '',
      });
    } else {
      setEmprestimo({
        livroId: '',
        livroTitulo: '',
        usuario: '',
        dataEmprestimo: '',
        dataDevolucao: '',
        dataDevolucaoUsuario: '',
        quantidade: 1,
        tipo: 'rental',
        price: 0,
        discountApplied: false,
        devuelto: false,
        fineApplied: false,
        paymentMethod: '',
      });
    }

    const livrosData = getLivros();
    const usuariosData = getUsuarios();
    const emprestimosData = getEmprestimos();
    setLivros(livrosData);
    setUsuarios(usuariosData);
    setEmprestimos(emprestimosData);
  }, [emprestimoEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const tempErros = validarEmprestimo(emprestimo, livros, emprestimos);
    setErros(tempErros);
    if (Object.values(tempErros).every((x) => x === '')) {
      // Calcular preço
      const livroSelecionado = livros.find((livro) => livro.id === emprestimo.livroId);

      // Verificar os preços e atribuir 0 se forem indefinidos
      let pricePerUnit = 0;
      if (emprestimo.tipo === 'purchase') {
        pricePerUnit = parseFloat(livroSelecionado.purchasePrice) || 0;
      } else {
        pricePerUnit = parseFloat(livroSelecionado.rentalPrice) || 0;
      }

      let totalPrice = pricePerUnit * parseInt(emprestimo.quantidade, 10);

      // Verificar se o usuário é frequente (apenas compras)
      const userPurchaseTransactions = emprestimos.filter(
        (e) => e.usuario === emprestimo.usuario && e.tipo === 'purchase'
      ).length;

      let discountApplied = false;
      if (emprestimo.tipo === 'purchase' && userPurchaseTransactions >= 2) {
        totalPrice = parseFloat((totalPrice * 0.85).toFixed(2)); 
        discountApplied = true;
      }

      const novoEmprestimo = {
        ...emprestimo,
        price: totalPrice,
        discountApplied,
        devuelto: emprestimo.tipo === 'purchase', // Se for compra, marcar como devolvido
        paymentMethod: '',
      };

      if (emprestimo.tipo === 'purchase') {
        setEmprestimo(novoEmprestimo);
        setOpenPagamento(true);
      } else {
        salvarEmprestimo(novoEmprestimo);
        setEmprestimo({
          livroId: '',
          livroTitulo: '',
          usuario: '',
          dataEmprestimo: '',
          dataDevolucao: '',
          dataDevolucaoUsuario: '',
          quantidade: 1,
          tipo: 'rental',
          price: 0,
          discountApplied: false,
          devuelto: false,
          fineApplied: false,
          paymentMethod: '',
        });
      }
    }
  };

  const handleChange = (e) => {
    setEmprestimo({ ...emprestimo, [e.target.name]: e.target.value });
  };

  // Obter a disponibilidade do livro selecionado
  const getDisponibilidade = (livroId) => {
    const livroSelecionado = livros.find((livro) => livro.id === livroId);
    const emprestimosLivro = emprestimos
      .filter((e) => e.livroId === livroId && e.tipo === 'rental' && !e.devuelto)
      .reduce((total, e) => total + e.quantidade, 0);

    const disponiveis = livroSelecionado
      ? livroSelecionado.quantidade - emprestimosLivro
      : 0;

    return disponiveis;
  };

  const finalizarPagamento = (updatedEmprestimo) => {
    salvarEmprestimo(updatedEmprestimo);
    setOpenPagamento(false);
    setEmprestimo({
      livroId: '',
      livroTitulo: '',
      usuario: '',
      dataEmprestimo: '',
      dataDevolucao: '',
      dataDevolucaoUsuario: '',
      quantidade: 1,
      tipo: 'rental',
      price: 0,
      discountApplied: false,
      devuelto: false,
      fineApplied: false,
      paymentMethod: '',
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          select
          name="livroId"
          label="Livro"
          value={emprestimo.livroId}
          onChange={(e) => {
            const livroSelecionado = livros.find((livro) => livro.id === e.target.value);
            setEmprestimo({
              ...emprestimo,
              livroId: e.target.value,
              livroTitulo: livroSelecionado ? livroSelecionado.titulo : '',
            });
          }}
          fullWidth
          margin="normal"
          error={!!erros.livroId}
          helperText={
            erros.livroId ||
            (emprestimo.livroId &&
              `Disponíveis: ${getDisponibilidade(emprestimo.livroId)}`)
          }
        >
          {livros.map((livro) => (
            <MenuItem key={livro.id} value={livro.id}>
              {livro.titulo}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          name="usuario"
          label="Usuário"
          value={emprestimo.usuario}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!erros.usuario}
          helperText={erros.usuario}
        >
          {usuarios.map((usuario) => (
            <MenuItem key={usuario.id} value={usuario.nome}>
              {usuario.nome}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          name="dataEmprestimo"
          label={emprestimo.tipo === 'purchase' ? 'Data de Compra' : 'Data de Aluguel'}
          type="date"
          value={emprestimo.dataEmprestimo}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          error={!!erros.dataEmprestimo}
          helperText={erros.dataEmprestimo}
        />
        {emprestimo.tipo === 'rental' && (
          <TextField
            name="dataDevolucao"
            label="Data de Devolução"
            type="date"
            value={emprestimo.dataDevolucao}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            error={!!erros.dataDevolucao}
            helperText={erros.dataDevolucao}
          />
        )}
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">Tipo de Transação</FormLabel>
          <RadioGroup
            row
            name="tipo"
            value={emprestimo.tipo}
            onChange={(e) => {
              setEmprestimo({ ...emprestimo, tipo: e.target.value });
            }}
          >
            <FormControlLabel value="rental" control={<Radio />} label="Aluguel" />
            <FormControlLabel value="purchase" control={<Radio />} label="Compra" />
            

          </RadioGroup>
        </FormControl>
        {alerta && <Alert severity="error">{alerta}</Alert>}
        <Button type="submit" variant="contained" color="primary">
          Salvar
        </Button>
      </form>
      <PagamentoModal
        open={openPagamento}
        onClose={() => setOpenPagamento(false)}
        emprestimo={emprestimo}
        finalizarPagamento={finalizarPagamento}
      />
    </>
  );
}

export default FormularioEmprestimo;
