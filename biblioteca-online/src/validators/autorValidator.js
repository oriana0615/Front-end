export const validarAutor = (autor) => {
  const erros = {};

  if (!autor.nome || autor.nome.trim() === '') {
    erros.nome = 'O nome é obrigatório.';
  } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(autor.nome)) { // Solo letras y espacios
    erros.nome = 'O nome deve conter apenas letras e espaços.';
  } else if (autor.nome.length > 25) {
    erros.nome = 'O nome não pode exceder 25 caracteres.';
  }

  if (!autor.nacionalidade || autor.nacionalidade.trim() === '') {
    erros.nacionalidade = 'A nacionalidade é obrigatória.';
  }

  return erros;
};
