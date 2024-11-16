import React, { useState, useEffect } from 'react'; 
import { TextField, Button, Alert, Select, MenuItem, FormControl, InputLabel } from '@mui/material'; // Importamos componentes de Material UI para diseño.
import { validarAutor } from '../validators/autorValidator'; // Importa la función de validación para el autor.
import { paises } from '../services/paisesService'; // Importa una lista de países desde el servicio paisesService.

function FormularioAutor({ salvarAutor, autorEdit }) { // Componente principal que recibe dos props: salvarAutor y autorEdit.
  
  // Definimos el estado inicial del autor con nombre y nacionalidad vacíos.
  const [autor, setAutor] = useState({
    nome: '',
    nacionalidade: '',
  });

  // Definimos el estado para manejar los errores en el formulario.
  const [erros, setErros] = useState({});

  // Estado para mensajes de alerta en caso de errores de validación.
  const [alerta, setAlerta] = useState('');

  // useEffect que verifica si existe un autor para editar y llena el formulario con sus datos.
  useEffect(() => {
    if (autorEdit) { // Si se proporciona autorEdit, actualizamos el estado de autor.
      setAutor({
        nome: autorEdit.nome || '',
        nacionalidade: autorEdit.nacionalidade || '',
      });
    } else { // Si no hay autor para editar, se establece el autor en su estado inicial.
      setAutor({
        nome: '',
        nacionalidade: '',
      });
    }
  }, [autorEdit]); // Se ejecuta cada vez que autorEdit cambia.

  // Función que maneja el envío del formulario.
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevenimos el comportamiento por defecto del formulario.
    
    const tempErros = validarAutor(autor); // Llama a la función de validación para obtener posibles errores.
    setErros(tempErros); // Actualiza el estado de errores.
    
    // Verifica si no hay errores en el formulario.
    if (Object.values(tempErros).every((x) => x === '')) {
      salvarAutor(autorEdit ? { ...autorEdit, ...autor } : autor); // Llama a salvarAutor, pasando el autor nuevo o actualizado.
      
      // Restablece el estado del autor y elimina cualquier alerta.
      setAutor({
        nome: '',
        nacionalidade: '',
      });
      setAlerta('');
    } else {
      setAlerta('Por favor, corrija los errores arriba.'); // Muestra un mensaje de alerta si hay errores.
    }
  };

  // Función para manejar los cambios en el formulario.
  const handleChange = (e) => {
    // Actualiza el estado del autor según el campo que se haya modificado.
    setAutor({ ...autor, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}> {/* Formulario principal con el evento de envío */}
      
      {/* Campo de texto para el nombre del autor */}
      <TextField
        name="nome"
        label="Nome"
        value={autor.nome}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!erros.nome} // Indica si hay un error en el campo de nombre.
        helperText={erros.nome} // Muestra el mensaje de error debajo del campo.
      />

      {/* Selector para la nacionalidad del autor */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Nacionalidade</InputLabel>
        <Select
          name="nacionalidade"
          value={autor.nacionalidade}
          onChange={handleChange}
          error={!!erros.nacionalidade} // Muestra error si hay problemas de validación.
        >
          {paises.map((pais, index) => ( // Crea un menú desplegable con la lista de países.
            <MenuItem key={index} value={pais}>
              {pais}
            </MenuItem>
          ))}
        </Select>
        {/* Muestra una alerta de error si hay problemas en la selección de nacionalidad */}
        {erros.nacionalidade && <Alert severity="error">{erros.nacionalidade}</Alert>}
      </FormControl>

      {/* Muestra un mensaje de alerta general en caso de errores en el formulario */}
      {alerta && <Alert severity="error">{alerta}</Alert>}
      
      {/* Botón para enviar el formulario */}
      <Button type="submit" variant="contained" color="primary">
        Salvar
      </Button>
    </form>
  );
}

export default FormularioAutor; // Exporta el componente FormularioAutor para que pueda usarse en otras partes de la aplicación.
