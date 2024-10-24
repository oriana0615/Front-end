import * as Yup from "yup";


const PassagemValidator = Yup.object().shape({
 
  vooId: Yup.number()
    .typeError("Voo ID deve ser um número")
    .integer("Voo ID deve ser um número inteiro")
    .positive("Voo ID deve ser positivo")
    .required("Voo ID é obrigatório"),

  
  passageiroId: Yup.number()
    .typeError("Passageiro ID deve ser um número")
    .integer("Passageiro ID deve ser um número inteiro")
    .positive("Passageiro ID deve ser positivo")
    .required("Passageiro ID é obrigatório"),

  
  assento: Yup.string()
    .matches(/^[A-Za-z0-9]+$/, "Assento deve conter apenas letras e números")
    .min(1, "Assento deve ter pelo menos 1 caractere")
    .max(5, "Assento não pode exceder 5 caracteres")
    .required("Assento é obrigatório"),

 
  preco: Yup.number()
  .typeError("Preço deve ser um número")
  .positive("Preço deve ser positivo")
  .required("Preço é obrigatório"),
});

export default PassagemValidator;
