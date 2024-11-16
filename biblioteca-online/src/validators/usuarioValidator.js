import validator from 'validator';
import { getUsuarios } from '../services/usuarioService';

export const validarUsuario = (usuario) => {
  let temp = {};
  const usuarios = getUsuarios();

  // Validación del nombre
  if (!usuario.nome) {
    temp.nome = 'O nome é obrigatório.';
  } else if (usuarios.some(u => u.nome === usuario.nome && u.id !== usuario.id)) {
    temp.nome = 'Nome já registrado.';
  } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(usuario.nome)) { 
    temp.nome = 'O nome deve conter apenas letras.';
  } else if (usuario.nome.length > 50) {
    temp.nome = 'O nome não pode exceder 30 caracteres.';
  } else {
    temp.nome = '';
  }

  // Validación del email
  temp.email = validator.isEmail(usuario.email) ? '' : 'Email inválido.';
  if (usuarios.some(u => u.email === usuario.email && u.id !== usuario.id)) {
    temp.email = 'O email já está registrado.';
  }

  // Validación del teléfono
const telefoneSemFormatacao = usuario.telefone.replace(/\D/g, ''); // Remove formatação para comparar somente dígitos
if (!telefoneSemFormatacao) {
  temp.telefone = 'O telefone é obrigatório.';
} else if (telefoneSemFormatacao.length !== 11) {
  temp.telefone = 'O número de telefone deve ter 11 dígitos.';
} else if (usuarios.some(u => u.telefone.replace(/\D/g, '') === telefoneSemFormatacao && u.id !== usuario.id)) {
  temp.telefone = 'Este número de telefone já está registrado. Introduza um diferente.';
} else {
  temp.telefone = '';
}

return temp;
}