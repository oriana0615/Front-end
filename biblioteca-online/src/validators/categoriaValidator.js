export const validarCategoria = (categoria) => {
  const erros = {};

  if (!categoria.nome || categoria.nome.trim() === '') {
    erros.nome = 'O nome é obrigatório.';
  } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(categoria.nome)) { // Solo letras y espacios
    erros.nome = 'O nome deve conter apenas letras e espaços.';
  } else if (categoria.nome.length > 25) {
    erros.nome = 'O nome não pode exceder 25 caracteres.';
  }


  if (!categoria.descricao || categoria.descricao.trim() === '') {
    erros.descricao = 'A descrição é obrigatória.';
  }

  return erros;
};
