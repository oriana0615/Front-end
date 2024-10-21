import * as Yup from 'yup';

const VooValidator = Yup.object().shape({
  // Indica se o voo é internacional
  internacional: Yup.boolean(),

  // Identificador do voo
  identificador: Yup.string()
    .min(3, 'Identificador deve ter pelo menos 3 caracteres')
    .max(20, 'Identificador não pode exceder 20 caracteres')
    .required('Identificador é obrigatório'),

  // Data de check-in
  data_checkin: Yup.date()
    .required('Data de Check-in é obrigatória')
    .typeError('Data de Check-in deve ser uma data válida')
    .min(new Date(new Date().getTime() - 5 * 60000), 'Data de Check-in não pode ser no passado'),

  // Data de embarque
  data_embarque: Yup.date()
    .required('Data de Embarque é obrigatória')
    .typeError('Data de Embarque deve ser uma data válida')
    .min(Yup.ref('data_checkin'), 'Data de Embarque deve ser após a Data de Check-in'),

  // ID de origem
  id_origem: Yup.number()
    .typeError('ID de Origem deve ser um número válido') // Isso garante que seja tratado como número
    .positive('ID de Origem deve ser um número positivo')
    .integer('ID de Origem deve ser um número inteiro')
    .required('ID de Origem é obrigatório'),

  // ID de destino
  id_destino: Yup.number()
    .typeError('ID de Destino deve ser um número válido') // Isso garante que seja tratado como número
    .positive('ID de Destino deve ser um número positivo')
    .integer('ID de Destino deve ser um número inteiro')
    .required('ID de Destino é obrigatório'),

  // ID da empresa
  empresa_id: Yup.number()
    .typeError('ID da Empresa deve ser um número válido') // Isso garante que seja tratado como número
    .positive('ID da Empresa deve ser um número positivo')
    .integer('ID da Empresa deve ser um número inteiro')
    .required('ID da Empresa é obrigatório'),

  // Preço do voo
  preco: Yup.number()
    .typeError('Preço deve ser um número válido') // Isso garante que seja tratado como número
    .positive('Preço deve ser um número positivo')
    .required('Preço é obrigatório')
    .test('decimal', 'Preço deve ter no máximo 2 casas decimais', 
      (value) => /^\d+(\.\d{1,2})?$/.test(value?.toString())
    ),
});

export default VooValidator;
