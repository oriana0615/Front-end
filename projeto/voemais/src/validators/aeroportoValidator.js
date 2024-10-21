import * as Yup from 'yup';

const aeroportoValidator = Yup.object().shape({
  nome: Yup.string()
    .min(3, 'O mínimo de caracteres é 3')
    .max(50, 'O máximo de caracteres é 50')
    .required('Nome é obrigatório'),
  sigla: Yup.string()
    .matches(/^[A-Z]{3}$/, 'A sigla deve ter exatamente 3 letras maiúsculas')
    .required('Sigla é obrigatória'),
  uf: Yup.string()
    .length(2, 'A UF deve ter exatamente 2 caracteres')
    .required('UF é obrigatório'),
  cidade: Yup.string()
    .min(3, 'O mínimo de caracteres é 3')
    .max(50, 'O máximo de caracteres é 50')
    .required('Cidade é obrigatória'),
  pais: Yup.string()
    .min(3, 'O mínimo de caracteres é 3')
    .max(50, 'O máximo de caracteres é 50')
    .required('País é obrigatório'),
  logo: Yup.string()
    .url('Logo deve ser uma URL válida')
    .required('Logo é obrigatória'),
});

export default aeroportoValidator;
