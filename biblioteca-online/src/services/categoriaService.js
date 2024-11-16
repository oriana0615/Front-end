
export const getCategorias = () => {
  return JSON.parse(localStorage.getItem('categorias')) || [];
};
