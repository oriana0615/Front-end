'use client';

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
  const [passageiro, setPassageiro] = useState({
    nome: '',
    tipo_documento: '',
    documento: '',
    email: '',
    telefone: '',
    dat_nascimento: '',
  });

  const passageiros = JSON.parse(localStorage.getItem('passageiros')) || [];
  const passageiroId = params?.id ? parseInt(params.id) : null;

  // Carregar os dados do passageiro ao entrar na página de edição
  useEffect(() => {
    if (passageiroId) {
      const passageiroEncontrado = passageiros.find(item => item.id === passageiroId);
      if (passageiroEncontrado) {
        setPassageiro(passageiroEncontrado); // Preenche os campos com os dados do passageiro
      }
    }
  }, [passageiroId]);

  // Validação com Yup
  const validationSchema = Yup.object({
    nome: Yup.string().min(3).max(50).required("Nome é obrigatório"),
    tipo_documento: Yup.string()
      .oneOf(["RG", "DNI", "CNH", "Título de eleitor eletrônico", "Passaporte válido"])
      .required("Tipo de Documento é obrigatório"),
    documento: Yup.string()
      .matches(/^\d+$/, "Documento deve conter apenas números")
      .min(7).max(20)
      .required("Documento é obrigatório"),
    email: Yup.string().email("Email inválido").required("Email é obrigatório"),
    telefone: Yup.string()
      .matches(/^\d{10,15}$/, "Telefone deve conter entre 10 e 15 dígitos")
      .required("Telefone é obrigatório"),
    dat_nascimento: Yup.date()
      .max(new Date(), "Data de Nascimento não pode ser futura")
      .required("Data de Nascimento é obrigatória"),
  });

  function salvarPassageiro(dados) {
    try {
      if (passageiroId) {
        const index = passageiros.findIndex(item => item.id === passageiroId);
        passageiros[index] = { id: passageiroId, ...dados }; // Atualiza os dados do passageiro
      } else {
        const novoId = passageiros.length > 0 ? Math.max(...passageiros.map(p => p.id)) + 1 : 1;
        passageiros.push({ id: novoId, ...dados });
      }

      localStorage.setItem("passageiros", JSON.stringify(passageiros));
      router.push("/passageiro?success=true");
    } catch (error) {
      console.error("Erro ao salvar passageiro:", error);
      setErrorMessage("Ocorreu um erro ao salvar o passageiro. Tente novamente.");
    }
  }

  return (
    <Pagina titulo={passageiroId ? "Editar Passageiro" : "Novo Passageiro"}>
      {errorMessage && (
        <Alert variant="danger" onClose={() => setErrorMessage("")} dismissible>
          {errorMessage}
        </Alert>
      )}
      <Formik
        enableReinitialize // Isso garante que o Formik será atualizado quando o passageiro mudar
        initialValues={passageiro}
        validationSchema={validationSchema}
        onSubmit={salvarPassageiro}
      >
        {({ values, errors, touched, handleChange, handleSubmit, handleBlur }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="nome">
              <Form.Label>Nome</Form.Label>
              <FormControl
                type="text"
                name="nome"
                value={values.nome}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.nome && !!errors.nome}
              />
              {touched.nome && errors.nome && (
                <Form.Control.Feedback type="invalid">{errors.nome}</Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group controlId="tipo_documento">
              <Form.Label>Tipo de Documento</Form.Label>
              <FormControl
                as="select"
                name="tipo_documento"
                value={values.tipo_documento}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.tipo_documento && !!errors.tipo_documento}
              >
                <option value="">Selecione o tipo de documento</option>
                <option value="RG">RG</option>
                <option value="DNI">DNI</option>
                <option value="CNH">CNH</option>
                <option value="Título de eleitor eletrônico">Título de eleitor eletrônico</option>
                <option value="Passaporte válido">Passaporte válido</option>
              </FormControl>
              {touched.tipo_documento && errors.tipo_documento && (
                <Form.Control.Feedback type="invalid">{errors.tipo_documento}</Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group controlId="documento">
              <Form.Label>Documento</Form.Label>
              <FormControl
                type="text"
                name="documento"
                value={values.documento}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.documento && !!errors.documento}
              />
              {touched.documento && errors.documento && (
                <Form.Control.Feedback type="invalid">{errors.documento}</Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <FormControl
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.email && !!errors.email}
              />
              {touched.email && errors.email && (
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group controlId="telefone">
              <Form.Label>Telefone</Form.Label>
              <FormControl
                type="text"
                name="telefone"
                value={values.telefone}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.telefone && !!errors.telefone}
              />
              {touched.telefone && errors.telefone && (
                <Form.Control.Feedback type="invalid">{errors.telefone}</Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group controlId="dat_nascimento">
              <Form.Label>Data de Nascimento</Form.Label>
              <FormControl
                type="date"
                name="dat_nascimento"
                value={values.dat_nascimento}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.dat_nascimento && !!errors.dat_nascimento}
              />
              {touched.dat_nascimento && errors.dat_nascimento && (
                <Form.Control.Feedback type="invalid">{errors.dat_nascimento}</Form.Control.Feedback>
              )}
            </Form.Group>

            <div className="text-center">
              <Button type="submit" variant="success">
                <FaCheck /> Salvar
              </Button>
              <Link href="/passageiro" className="btn btn-danger ms-2">
                <MdOutlineArrowBack /> Voltar
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </Pagina>
  );
}
