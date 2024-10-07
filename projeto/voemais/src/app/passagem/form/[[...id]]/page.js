"use client"; 

import Pagina from "@/app/components/Pagina";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import { Button, Form, FormControl, Alert } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import * as Yup from "yup";
import { useState, useEffect } from "react";

export default function Page({ params }) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [passagem, setPassagem] = useState({
    vooId: '',
    passageiroId: '',
    assento: '',
    preco: '',
  });

  const passagens = JSON.parse(localStorage.getItem('passagens')) || [];
  const passagemId = params?.id ? parseInt(params.id) : null;

  // Carregar os dados da passagem ao entrar na página de edição
  useEffect(() => {
    if (passagemId) {
      const passagemEncontrada = passagens.find(item => item.id === passagemId);
      if (passagemEncontrada) {
        setPassagem(passagemEncontrada); // Preenche os campos com os dados da passagem
      }
    }
  }, [passagemId]);

  // Validação com Yup
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
      if (passagemId) {
        const index = passagens.findIndex(item => item.id === passagemId);
        passagens[index] = { id: passagemId, ...dados }; // Atualiza os dados da passagem
      } else {
        const novoId = passagens.length > 0 ? Math.max(...passagens.map(p => p.id)) + 1 : 1;
        passagens.push({ id: novoId, ...dados });
      }

      localStorage.setItem("passagens", JSON.stringify(passagens));
      router.push("/passagem?success=true");
    } catch (error) {
      console.error("Erro ao salvar passagem:", error);
      setErrorMessage("Ocorreu um erro ao salvar a passagem. Tente novamente.");
    }
  }

  //Retorno de la pagina
  return (
    <Pagina titulo={passagemId ? "Editar Passagem" : "Nova Passagem"}>
      {errorMessage && (
        <Alert variant="danger" onClose={() => setErrorMessage("")} dismissible>
          {errorMessage}
        </Alert>
      )}
      <Formik
        enableReinitialize // Isso garante que o Formik será atualizado quando a passagem mudar
        initialValues={passagem}
        validationSchema={validationSchema}
        onSubmit={salvarPassagem}
      >
        {({ values, errors, touched, handleChange, handleSubmit, handleBlur }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="vooId">
              <Form.Label>Voo Id</Form.Label>
              <FormControl
                type="number"
                name="vooId"
                value={values.vooId}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.vooId && !!errors.vooId}
              />
              {touched.vooId && errors.vooId && (
                <Form.Control.Feedback type="invalid">{errors.vooId}</Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group controlId="passageiroId">
              <Form.Label>Passageiro Id</Form.Label>
              <FormControl
                type="number"
                name="passageiroId"
                value={values.passageiroId}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.passageiroId && !!errors.passageiroId}
              />
              {touched.passageiroId && errors.passageiroId && (
                <Form.Control.Feedback type="invalid">{errors.passageiroId}</Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group controlId="assento">
              <Form.Label>Assento</Form.Label>
              <FormControl
                type="text"
                name="assento"
                value={values.assento}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.assento && !!errors.assento}
              />
              {touched.assento && errors.assento && (
                <Form.Control.Feedback type="invalid">{errors.assento}</Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group controlId="preco">
              <Form.Label>Preço</Form.Label>
              <FormControl
                type="number"
                name="preco"
                value={values.preco}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.preco && !!errors.preco}
                step="0.01"
              />
              {touched.preco && errors.preco && (
                <Form.Control.Feedback type="invalid">{errors.preco}</Form.Control.Feedback>
              )}
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
