import * as Yup from 'yup';

const PassageiroValidator = Yup.object().shape({
  nome: Yup.string()
    .matches(/^[A-Za-zÀ-ÿ\s]+$/, 'O nome deve conter apenas letras')
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

  dat_nascimento: Yup.string()
    .matches(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, // Aceita DD/MM/YYYY
      'A data de nascimento deve estar no formato DD/MM/AAAA'
    )
    .test('dataValida', 'A data deve ser válida e anterior a hoje', function(value) {
      if (!value) return false;

      const [dia, mes, ano] = value.split('/').map(Number);
      const dataNascimento = new Date(ano, mes - 1, dia); // Cria uma data a partir do ano, mês e dia
      const hoje = new Date();

      // Verifica se a data é válida e se é anterior a hoje
      return (
        dataNascimento instanceof Date && 
        !isNaN(dataNascimento.getTime()) && // Verifica se a data é válida
        dataNascimento < hoje // A data deve ser anterior a hoje
      );
    })
    .required('Campo obrigatório'),
});

export default PassageiroValidator;
