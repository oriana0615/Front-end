import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Alert } from '@mui/material';
import { getAutores } from '../services/autorService';
import { getCategorias } from '../services/categoriaService';
import { validarLivro } from '../validators/livroValidator';
import { NumericFormat } from 'react-number-format'; 

function NumberFormatCustom(props) {
  const { onChange, name, ...other } = props;

  return (
    <NumericFormat
      {...other}
      name={name}
      onValueChange={(values) => {
        onChange({
          target: {
            name: name,
            value: values.value,
          },
        });
      }}
      thousandSeparator="."
      decimalSeparator=","
      decimalScale={2}
      fixedDecimalScale
      allowNegative={false}
      
    />
  );
}

function FormularioLivro({ salvarLivro, livroEdit }) {
  const [livro, setLivro] = useState({
    titulo: '',
    autor: '',
    categoria: '',
    dataPublicacao: '',
    quantidade: '',
    purchasePrice: '0,00', // Inicializado com "0,00"
    rentalPrice: '0,00',   // Inicializado com "0,00"
  });

  const [erros, setErros] = useState({});
  const [alerta, setAlerta] = useState('');
  const [autores, setAutores] = useState([]);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    // Carregar autores e categorias ao montar o componente
    const autoresData = getAutores();
    setAutores(autoresData);

    const categoriasData = getCategorias();
    setCategorias(categoriasData);

    // Se for edição, preencher o formulário com os dados do livro
    if (livroEdit) {
      setLivro({
        titulo: livroEdit.titulo || '',
        autor: livroEdit.autor || '',
        categoria: livroEdit.categoria || '',
        dataPublicacao: livroEdit.dataPublicacao || '',
        quantidade: livroEdit.quantidade !== undefined ? livroEdit.quantidade.toString() : '',
        purchasePrice: livroEdit.purchasePrice !== undefined ? livroEdit.purchasePrice.toFixed(2).replace('.', ',') : '0,00',
        rentalPrice: livroEdit.rentalPrice !== undefined ? livroEdit.rentalPrice.toFixed(2).replace('.', ',') : '0,00',
      });
    } else {
      setLivro({
        titulo: '',
        autor: '',
        categoria: '',
        dataPublicacao: '',
        quantidade: '',
        purchasePrice: '0,00',
        rentalPrice: '0,00',
      });
    }
  }, [livroEdit]);

  const handleChange = (e) => {
    setLivro({ ...livro, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tempErros = validarLivro(livro);
    setErros(tempErros);
    if (Object.values(tempErros).every((x) => x === '')) {
      // Converter campos numéricos, substituindo vírgulas por pontos
      const livroParaSalvar = {
        ...livro,
        quantidade: parseInt(livro.quantidade, 10),
        purchasePrice: parseFloat(livro.purchasePrice.replace(',', '.')),
        rentalPrice: parseFloat(livro.rentalPrice.replace(',', '.')),
      };
      salvarLivro(livroEdit ? { ...livroEdit, ...livroParaSalvar } : livroParaSalvar);
      setLivro({
        titulo: '',
        autor: '',
        categoria: '',
        dataPublicacao: '',
        quantidade: '',
        purchasePrice: '0,00',
        rentalPrice: '0,00',
      });
      setAlerta('');
    } else {
      setAlerta('Por favor, corrija os erros acima.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {alerta && <Alert severity="error" sx={{ mb: 2 }}>{alerta}</Alert>}
      
      <TextField
        name="titulo"
        label="Título Livro"
        value={livro.titulo}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!erros.titulo}
        helperText={erros.titulo}
      />
      
      <TextField
        select
        name="autor"
        label="Autor"
        value={livro.autor}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!erros.autor}
        helperText={erros.autor}
      >
        {autores.map((autor) => (
          <MenuItem key={autor.id} value={autor.nome}>
            {autor.nome}
          </MenuItem>
        ))}
      </TextField>
      
      <TextField
        select
        name="categoria"
        label="Categoria"
        value={livro.categoria}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!erros.categoria}
        helperText={erros.categoria}
      >
        {categorias.map((categoria) => (
          <MenuItem key={categoria.id} value={categoria.nome}>
            {categoria.nome}
          </MenuItem>
        ))}
      </TextField>
      
      <TextField
        name="dataPublicacao"
        label="Data de Publicação"
        type="date"
        value={livro.dataPublicacao}
        onChange={handleChange}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        error={!!erros.dataPublicacao}
        helperText={erros.dataPublicacao}
      />
      
      <TextField
        name="quantidade"
        label="Quantidade"
        type="number"
        value={livro.quantidade}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!erros.quantidade}
        helperText={erros.quantidade}
        InputProps={{ inputProps: { min: 0 } }} // Permitindo quantidade zero se necessário
      />
      
      <TextField
        name="purchasePrice"
        label="Preço de Compra"
        value={livro.purchasePrice}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!erros.purchasePrice}
        helperText={erros.purchasePrice}
        InputProps={{
          inputComponent: NumberFormatCustom, // Usa o componente personalizado
        }}
      />
      
      <TextField
        name="rentalPrice"
        label="Preço de Aluguel"
        value={livro.rentalPrice}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!erros.rentalPrice}
        helperText={erros.rentalPrice}
        InputProps={{
          inputComponent: NumberFormatCustom, // Usa o componente personalizado
        }}
      />
      
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Salvar
      </Button>
    </form>
  );
}

export default FormularioLivro;
