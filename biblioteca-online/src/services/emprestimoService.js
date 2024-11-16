
export const getEmprestimos = () => {
  return JSON.parse(localStorage.getItem('emprestimos')) || [];
};
