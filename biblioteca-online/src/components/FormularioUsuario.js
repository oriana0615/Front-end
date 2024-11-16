import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import InputMask from 'react-input-mask';
import { validarUsuario } from '../validators/usuarioValidator';

function FormularioUsuario({ salvarUsuario, usuarioEdit }) {
  const [usuario, setUsuario] = useState({
    id: null, // Necessário para validar unicidade ao editar
    nome: '',
    email: '',
    telefone: '',
  });

  const [erros, setErros] = useState({});

  useEffect(() => {
    if (usuarioEdit) {
      setUsuario(usuarioEdit);
    } else {
      setUsuario({
        id: null,
        nome: '',
        email: '',
        telefone: '',
      });
    }
  }, [usuarioEdit]);

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tempErros = validarUsuario(usuario);
    setErros(tempErros);
    if (Object.values(tempErros).every((x) => x === '')) {
      salvarUsuario(usuario);
      setUsuario({
        id: null,
        nome: '',
        email: '',
        telefone: '',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="nome"
        label="Nome"
        value={usuario.nome}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!erros.nome}
        helperText={erros.nome}
      />
      <TextField
        name="email"
        label="Email"
        value={usuario.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!erros.email}
        helperText={erros.email}
      />
      <InputMask
        mask="(99) 99999-9999"
        value={usuario.telefone}
        onChange={handleChange}
        name="telefone"
      >
        {(inputProps) => (
          <TextField
            {...inputProps}
            label="Telefone"
            fullWidth
            margin="normal"
            error={!!erros.telefone}
            helperText={erros.telefone}
          />
        )}
      </InputMask>
      <Button type="submit" variant="contained" color="primary">
        Salvar
      </Button>
    </form>
  );
}

export default FormularioUsuario;
