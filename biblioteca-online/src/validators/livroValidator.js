export const validarLivro = (livro) => {
  const erros = {};

  if (!livro.titulo || livro.titulo.trim() === '') {
    erros.titulo = 'O título é obrigatório.';
  } else if (livro.titulo.length > 25) {
    erros.titulo = 'O título deve ter no máximo 25 caracteres.';
  }

  if (!livro.autor || livro.autor.trim() === '') {
    erros.autor = 'O autor é obrigatório.';
  }

  if (!livro.categoria || livro.categoria.trim() === '') {
    erros.categoria = 'A categoria é obrigatória.';
  }

  if (!livro.dataPublicacao) {
    erros.dataPublicacao = 'A data de publicação é obrigatória.';
  }

  if (!livro.quantidade || livro.quantidade < 1) {
    erros.quantidade = 'A quantidade deve ser pelo menos 1.';
  }

  if (!livro.purchasePrice || livro.purchasePrice < 0) {
    erros.purchasePrice = 'O preço de compra deve ser igual ou superior a 0.';
  }

  if (!livro.rentalPrice || livro.rentalPrice < 0) {
    erros.rentalPrice = 'O preço de aluguel deve ser igual ou superior a 0.';
  }

  return erros;
};
