
export const getAutores = () => {
  return JSON.parse(localStorage.getItem('autores')) || [];
};
