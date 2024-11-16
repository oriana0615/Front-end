import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

function ListaCategorias({ categorias, editarCategoria, excluirCategoria }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Nome</TableCell>
          <TableCell>Descrição</TableCell>
          <TableCell>Ações</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {categorias.map((categoria) => (
          <TableRow key={categoria.id}>
            <TableCell>{categoria.nome}</TableCell>
            <TableCell>{categoria.descricao}</TableCell>
            <TableCell>
              <IconButton onClick={() => editarCategoria(categoria)} aria-label="editar">
                <Edit />
              </IconButton>
              <IconButton onClick={() => excluirCategoria(categoria.id)} aria-label="excluir">
                <Delete />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default ListaCategorias;
