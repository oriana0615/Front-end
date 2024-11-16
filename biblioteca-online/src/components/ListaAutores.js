import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

function ListaAutores({ autores, editarAutor, excluirAutor }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Nome</TableCell>
          <TableCell>Nacionalidade</TableCell>
          <TableCell>Ações</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {autores.map((autor) => (
          <TableRow key={autor.id}>
            <TableCell>{autor.nome}</TableCell>
            <TableCell>{autor.nacionalidade}</TableCell>
            <TableCell>
              <IconButton onClick={() => editarAutor(autor)} aria-label="editar">
                <Edit />
              </IconButton>
              <IconButton onClick={() => excluirAutor(autor.id)} aria-label="excluir">
                <Delete />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default ListaAutores;
