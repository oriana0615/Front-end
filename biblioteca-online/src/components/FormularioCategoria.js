import React, { useState, useEffect } from 'react'; 
import { TextField, Button, Alert } from '@mui/material'; // componentes de Material UI para formularios y alertas.
import { validarCategoria } from '../validators/categoriaValidator'; // Importa una función de validación para la categoría.

function FormularioCategoria({ salvarCategoria, categoriaEdit }) { // Define el componente principal FormularioCategoria, que recibe dos props: salvarCategoria y categoriaEdit.
  
  // Estado inicial de la categoría, que contiene los campos 'nome' y 'descricao' vacíos.
  const [categoria, setCategoria] = useState({
    nome: '',
    descricao: '',
  });

  // Estado para guardar los errores de validación de los campos del formulario.
  const [erros, setErros] = useState({});

  // Estado para mostrar mensajes de alerta en caso de errores en el formulario.
  const [alerta, setAlerta] = useState('');

  // useEffect se ejecuta cuando el valor de categoriaEdit cambia.
  useEffect(() => {
    if (categoriaEdit) { // Si se proporciona una categoría para editar (categoriaEdit), se establecen los valores en el estado de categoria.
      setCategoria({
        nome: categoriaEdit.nome || '', // Si no hay nombre en categoriaEdit, se asigna un string vacío.
        descricao: categoriaEdit.descricao || '', // Si no hay descripción en categoriaEdit, se asigna un string vacío.
      });
    } else { // Si no hay categoriaEdit, se restablece la categoría a su estado inicial.
      setCategoria({
        nome: '',
        descricao: '',
      });
    }
  }, [categoriaEdit]); // Solo se ejecuta nuevamente si cambia categoriaEdit.

  // Función que maneja el envío del formulario.
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que el formulario se envíe de la forma estándar (recarga de la página).
    
    const tempErros = validarCategoria(categoria); // Valida la categoría actual y obtiene los errores si los hay.
    setErros(tempErros); // Establece los errores en el estado de errores.
    
    // Verifica si no hay errores en los campos.
    if (Object.values(tempErros).every((x) => x === '')) {
      // Llama a salvarCategoria con los datos actuales de categoria, aplicando edición si categoriaEdit tiene valores.
      salvarCategoria(categoriaEdit ? { ...categoriaEdit, ...categoria } : categoria);
      
      // Reinicia el estado de la categoría y elimina cualquier alerta.
      setCategoria({
        nome: '',
        descricao: '',
      });
      setAlerta(''); // Limpia la alerta.
    } else {
      setAlerta('Por favor, corrija os erros acima.'); // Muestra un mensaje de alerta si hay errores.
    }
  };

  // Función que maneja los cambios en los campos del formulario.
  const handleChange = (e) => {
    // Actualiza el estado de la categoría según el campo que cambió.
    setCategoria({ ...categoria, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}> {/* Formulario con evento de envío que llama a handleSubmit */}
      
      {/* Campo de texto para el nombre de la categoría */}
      <TextField
        name="nome"
        label="Nome"
        value={categoria.nome} // Valor actual del nombre en el estado de categoria.
        onChange={handleChange} // Cambios en este campo llaman a handleChange.
        fullWidth
        margin="normal"
        error={!!erros.nome} // Muestra error si hay problemas de validación en el campo.
        helperText={erros.nome} // Texto de ayuda para mostrar el error específico del campo.
      />
      
      {/* Campo de texto para la descripción de la categoría */}
      <TextField
        name="descricao"
        label="Descrição"
        value={categoria.descricao} // Valor actual de la descripción en el estado de categoria.
        onChange={handleChange} // Cambios en este campo llaman a handleChange.
        fullWidth
        margin="normal"
        error={!!erros.descricao} // Muestra error si hay problemas de validación en el campo.
        helperText={erros.descricao} // Texto de ayuda para mostrar el error específico del campo.
      />

      {/* Muestra una alerta si hay errores generales en el formulario */}
      {alerta && <Alert severity="error">{alerta}</Alert>}
      
      {/* Botón para enviar el formulario */}
      <Button type="submit" variant="contained" color="primary">
        Salvar
      </Button>
    </form>
  );
}

export default FormularioCategoria; // Exporta el componente para que pueda usarse en otras partes de la aplicación.
