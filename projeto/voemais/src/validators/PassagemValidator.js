import * as Yup from "yup";

// Definição do validador
const PassagemValidator = Yup.object().shape({
  // Voo ID deve ser um número
  vooId: Yup.string()
    .required("Voo ID é obrigatório")
    .matches(/^\d+$/, "Voo ID deve ser um número"), // Permite apenas números

  // Passageiro ID deve ser um número
  passageiroId: Yup.string()
    .required("Passageiro ID é obrigatório")
    .matches(/^\d+$/, "Passageiro ID deve ser um número"), // Permite apenas números

  // Assento deve permitir letras e números, mas não pode ser apenas números
  assento: Yup.string()
    .required("Assento é obrigatório")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z0-9]+$/, "Assento deve conter letras e números, não pode ser apenas números")
    .max(4, "Assento não pode ter mais de 4 caracteres"),

  // Preço deve ser um número positivo e maior ou igual a 200
  preco: Yup.number()
    .required("Preço é obrigatório")
    .positive("Preço deve ser um valor positivo")
    .min(200, "Preço deve ser no mínimo 200")
    .test("is-decimal", "Preço deve ter no máximo 2 casas decimais", (value) =>
      /^\d+(\.\d{1,2})?$/.test(value)
    ),
});

// Função para validar os dados e imprimir erros
const validar = async (dados) => {
  try {
    await PassagemValidator.validate(dados, { abortEarly: false }); // Ajuste para coletar todos os erros
    console.log("Validação bem-sucedida:", dados);
  } catch (err) {
    console.error("Erros de validação:", err.errors);
  }
};



//  Voo ID
validar({ vooId: '1234', passageiroId: '5678', assento: '1A', preco: 200 }); // Válido
validar({ vooId: '12a4', passageiroId: '5678', assento: '1A', preco: 200 }); // Inválido Voo ID

