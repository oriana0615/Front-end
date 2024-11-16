import React from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Button,
  Box,
} from '@mui/material';
import { Edit, Delete, CheckCircle } from '@mui/icons-material';

function ListaEmprestimos({
  emprestimos,
  editarEmprestimo,
  excluirEmprestimo,
  marcarComoDevuelto,
}) {
  // Função para traduzir o método de pagamento
  const traducirMetodoPago = (metodo) => {
    switch (metodo) {
      case 'cash':
        return 'Dinheiro';
      case 'card':
        return 'Cartão';
      case 'pix':
        return 'PIX';
      default:
        return '-';
    }
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Livro</TableCell>
          <TableCell>Usuário</TableCell>
          <TableCell>Tipo</TableCell>
          <TableCell>Data de Aluguel/Compra</TableCell>
          <TableCell>Data para Devolução</TableCell>
          <TableCell>Data de Devolução do Usuário</TableCell>
          <TableCell>Estado</TableCell>
          <TableCell>Preço</TableCell>
          <TableCell>Método de Pagamento</TableCell>
          <TableCell>Ações</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {emprestimos.map((emprestimo) => (
          <TableRow key={emprestimo.id}>
            <TableCell>{emprestimo.livroTitulo}</TableCell>
            <TableCell>{emprestimo.usuario}</TableCell>
            <TableCell>{emprestimo.tipo === 'purchase' ? 'Compra' : 'Aluguel'}</TableCell>
            <TableCell>{emprestimo.dataEmprestimo}</TableCell>
            <TableCell>
              {emprestimo.tipo === 'rental' ? emprestimo.dataDevolucao || 'Pendente' : '-'}
            </TableCell>
            <TableCell>{emprestimo.dataDevolucaoUsuario || '-'}</TableCell>
            <TableCell>
              {emprestimo.tipo === 'purchase'
                ? 'Vendido'
                : emprestimo.devuelto
                ? 'Devolvido'
                : 'Alugado'}
            </TableCell>
            <TableCell>
              {emprestimo.price !== undefined ? `R$${emprestimo.price.toFixed(2)}` : 'N/A'}
              {emprestimo.discountApplied && ' (Desconto aplicado)'}
              {emprestimo.fineApplied && ' (Multa aplicada)'}
            </TableCell>
            <TableCell>
              {emprestimo.paymentMethod
                ? traducirMetodoPago(emprestimo.paymentMethod)
                : '-'}
            </TableCell>
            <TableCell>
              <Box display="flex" alignItems="center" gap={1}>
                {emprestimo.tipo === 'rental' && !emprestimo.devuelto && (
                  <Button
                    variant="outlined"
                    color="success"
                    size="small"
                    onClick={() => marcarComoDevuelto(emprestimo.id)}
                    startIcon={<CheckCircle />}
                  >
                    Devolvido
                  </Button>
                )}
                <IconButton onClick={() => editarEmprestimo(emprestimo)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => excluirEmprestimo(emprestimo.id)}>
                  <Delete />
                </IconButton>
              </Box>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default ListaEmprestimos;
