import livrosData from '../components/data/livros.json';

export const getLivros = () => {
  const storedLivros = JSON.parse(localStorage.getItem('livros'));
  if (storedLivros && storedLivros.length > 0) {
    return storedLivros;
  } else {
    localStorage.setItem('livros', JSON.stringify(livrosData));
    return livrosData;
  }
};
