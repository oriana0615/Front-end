
export const getUsuarios = () => {
  return JSON.parse(localStorage.getItem('usuarios')) || [];
};
