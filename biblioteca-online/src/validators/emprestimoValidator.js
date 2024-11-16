export const validarEmprestimo = (emprestimo, livros, emprestimos) => {
  let temp = {};
  temp.livroId = emprestimo.livroId ? '' : 'Selecione um livro.';
  temp.usuario = emprestimo.usuario ? '' : 'Selecione um usuário.';
  temp.dataEmprestimo = emprestimo.dataEmprestimo ? '' : 'A data de empréstimo é obrigatória.';

  if (emprestimo.tipo === 'rental') {
    temp.dataDevolucao = emprestimo.dataDevolucao ? '' : 'A data de devolução é obrigatória.';
    if (emprestimo.dataEmprestimo && emprestimo.dataDevolucao) {
      temp.dataDevolucao =
        emprestimo.dataDevolucao > emprestimo.dataEmprestimo
          ? ''
          : 'A data de devolução deve ser posterior à data de empréstimo.';
    }
  }

  temp.quantidade =
    emprestimo.quantidade && parseInt(emprestimo.quantidade) > 0
      ? ''
      : 'A quantidade deve ser maior que 0.';

  const livroSelecionado = livros.find((livro) => livro.id === emprestimo.livroId);
  const emprestimosLivro = emprestimos
    .filter((e) => e.livroId === emprestimo.livroId && !e.devuelto)
    .reduce((total, e) => total + e.quantidade, 0);

  const disponiveis = livroSelecionado
    ? livroSelecionado.quantidade - emprestimosLivro
    : 0;

  if (parseInt(emprestimo.quantidade) > disponiveis) {
    temp.quantidade = `Só há ${disponiveis} unidades disponíveis.`;
  }

  if (emprestimo.tipo === 'rental') {
    const limiteEmprestimos = 5;
    const emprestimosUsuario = emprestimos
      .filter((e) => e.usuario === emprestimo.usuario && !e.devuelto && e.tipo === 'rental')
      .reduce((total, e) => total + e.quantidade, 0);

    if (emprestimosUsuario + parseInt(emprestimo.quantidade) > limiteEmprestimos) {
      temp.usuario = `O usuário excedeu o limite de ${limiteEmprestimos} livros alugados.`;
    }
  }

  return temp;
};
