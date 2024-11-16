import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

function ListaUsuarios({ usuarios, editarUsuario, excluirUsuario }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Nome</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Telefone</TableCell>
          <TableCell>Ações</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {usuarios.map((usuario) => (
          <TableRow key={usuario.id}>
            <TableCell>{usuario.nome}</TableCell>
            <TableCell>{usuario.email}</TableCell>
            <TableCell>{usuario.telefone}</TableCell>
            <TableCell>
              <IconButton onClick={() => editarUsuario(usuario)}>
                <Edit />
              </IconButton>
              <IconButton onClick={() => excluirUsuario(usuario.id)}>
                <Delete />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default ListaUsuarios;
