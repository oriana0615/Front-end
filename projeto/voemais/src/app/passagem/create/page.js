"use client"; // Indica que este é um componente de cliente

import Pagina from "@/app/components/Pagina";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Importa de next/navigation
import { Button, Form, FormControl, Alert } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import * as Yup from "yup";
import { useState } from "react";

export default function Page() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  // Esquema de validação com Yup
  const validationSchema = Yup.object({
    vooId: Yup.number()
      .typeError("Voo Id deve ser um número")
      .integer("Voo Id deve ser um número inteiro")
      .positive("Voo Id deve ser positivo")
      .required("Voo Id é obrigatório"),
    passageiroId: Yup.number()
      .typeError("Passageiro Id deve ser um número")
      .integer("Passageiro Id deve ser um número inteiro")
      .positive("Passageiro Id deve ser positivo")
      .required("Passageiro Id é obrigatório"),
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

  function salvarPassagem(dados) {
    try {
      const passagensSalvas = JSON.parse(localStorage.getItem("passagens")) || [];

      // Gerar ID único
      const novoId = passagensSalvas.length > 0 ? Math.max(...passagensSalvas.map(p => p.id)) + 1 : 1;

      const novaPassagem = {
        id: novoId,
        vooId: parseInt(dados.vooId, 10),
        passageiroId: parseInt(dados.passageiroId, 10),
        assento: dados.assento,
        preco: parseFloat(dados.preco),
      };

      passagensSalvas.push(novaPassagem);
      localStorage.setItem("passagens", JSON.stringify(passagensSalvas));

      // Redirecionar com parâmetro de sucesso
      router.push("/passagem?success=true");
    } catch (error) {
      console.error("Erro ao salvar passagem:", error);
      setErrorMessage("Ocorreu um erro ao salvar a passagem. Por favor, tente novamente.");
    }
  }

  return (
    <Pagina titulo="Nova Passagem">
      {errorMessage && (
        <Alert variant="danger" onClose={() => setErrorMessage("")} dismissible>
          {errorMessage}
        </Alert>
      )}
      <Formik
        initialValues={{
          vooId: '',
          passageiroId: '',
          assento: '',
          preco: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          salvarPassagem(values);
          resetForm();
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          handleBlur,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="vooId">
              <Form.Label>Voo Id</Form.Label>
              <FormControl
                type="number"
                name="vooId"
                value={values.vooId}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.vooId && !!errors.vooId}
                placeholder="Digite o Voo Id"
              />
              <Form.Control.Feedback type="invalid">
                {errors.vooId}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="passageiroId">
              <Form.Label>Passageiro Id</Form.Label>
              <FormControl
                type="number"
                name="passageiroId"
                value={values.passageiroId}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.passageiroId && !!errors.passageiroId}
                placeholder="Digite o Passageiro Id"
              />
              <Form.Control.Feedback type="invalid">
                {errors.passageiroId}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="assento">
              <Form.Label>Assento</Form.Label>
              <FormControl
                type="text"
                name="assento"
                value={values.assento}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.assento && !!errors.assento}
                placeholder="Digite o Assento"
              />
              <Form.Control.Feedback type="invalid">
                {errors.assento}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="preco">
              <Form.Label>Preço</Form.Label>
              <FormControl
                type="number"
                name="preco"
                value={values.preco}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.preco && !!errors.preco}
                placeholder="Digite o Preço"
                step="0.01"
              />
              <Form.Control.Feedback type="invalid">
                {errors.preco}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="text-center">
              <Button type="submit" variant="success">
                <FaCheck /> Salvar
              </Button>
              <Link href="/passagem" className="btn btn-danger ms-2">
                <MdOutlineArrowBack /> Voltar
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </Pagina>
  );
}
