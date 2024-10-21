import * as Yup from 'yup';

const PassageiroValidator = Yup.object().shape({
  nome: Yup.string()
    .min(3, 'O mínimo de caracteres é 3')
    .max(50, 'O máximo de caracteres é 50')
    .required('Campo obrigatório'),
  tipo_documento: Yup.string()
    .oneOf(['RG', 'DNI', 'CNH', 'Título de eleitor eletrônico', 'Passaporte válido'], 'Tipo de documento inválido')
    .required('Campo obrigatório'),
  documento: Yup.string()
    .matches(/^[0-9]{7,20}$/, 'O documento deve conter entre 7 e 20 dígitos')
    .required('Campo obrigatório'),
  email: Yup.string()
    .email('Email inválido')
    .required('Campo obrigatório'),
  telefone: Yup.string()
    .matches(/^[0-9]{10,15}$/, 'O telefone deve conter entre 10 e 15 dígitos')
    .required('Campo obrigatório'),
  dat_nascimento: Yup.date()
    .max(new Date(), 'A data deve ser anterior a hoje')
    .required('Campo obrigatório'),
});

export default PassageiroValidator;
