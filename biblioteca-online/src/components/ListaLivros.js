import React from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Chip,
  TableContainer,
  Paper,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

function ListaLivros({ livros, editarLivro, excluirLivro, emprestimos }) {
  // Obter as quantidades de empréstimos por livro
  const livrosEmprestados = {};

  emprestimos.forEach((e) => {
    if (e.tipo === 'rental' && !e.devuelto) {
      if (livrosEmprestados[e.livroId]) {
        livrosEmprestados[e.livroId] += e.quantidade;
      } else {
        livrosEmprestados[e.livroId] = e.quantidade;
      }
    }
    
  });

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader aria-label="lista de livros">
        <TableHead>
          <TableRow>
            <TableCell>Título</TableCell>
            <TableCell>Autor</TableCell>
            <TableCell>Categoria</TableCell>
            <TableCell>Data de Publicação</TableCell>
            <TableCell>Preço de Aluguel</TableCell>
            <TableCell>Preço de Compra</TableCell>
            <TableCell>Quantidade Disponível</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {livros.map((livro) => {
            const emprestados = livrosEmprestados[livro.id] || 0;
            const disponiveis = livro.quantidade - emprestados;

            return (
              <TableRow key={livro.id}>
                <TableCell>{livro.titulo}</TableCell>
                <TableCell>{livro.autor}</TableCell>
                <TableCell>{livro.categoria}</TableCell>
                <TableCell>{livro.dataPublicacao}</TableCell>
                <TableCell>
                  {isNaN(parseFloat(livro.rentalPrice))
                    ? 'N/A'
                    : `R$${parseFloat(livro.rentalPrice).toFixed(2)}`}
                </TableCell>
                <TableCell>
                  {isNaN(parseFloat(livro.purchasePrice))
                    ? 'N/A'
                    : `R$${parseFloat(livro.purchasePrice).toFixed(2)}`}
                </TableCell>
                <TableCell>
                  {disponiveis > 0 ? (
                    <Chip label={`Disponível (${disponiveis})`} color="success" />
                  ) : (
                    <Chip label="Esgotado" color="warning" />
                  )}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => editarLivro(livro)} aria-label="editar">
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => excluirLivro(livro.id)} aria-label="excluir">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ListaLivros;
