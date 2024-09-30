"use client"; 

import Pagina from "@/app/components/Pagina";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import { Button, Form, FormControl, Alert } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import * as Yup from "yup";
import { useState } from "react";

export default function Page() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  // validação com Yup
  const validationSchema = Yup.object({
    nome: Yup.string()
      .min(3, "Nome deve ter pelo menos 3 caracteres")
      .max(50, "Nome não pode exceder 50 caracteres")
      .required("Nome é obrigatório"),
    tipo_documento: Yup.string()
      .oneOf(
        ["RG", "DNI", "CNH", "Título de eleitor eletrônico", "Passaporte válido"],
        "Selecione um tipo de documento válido"
      )
      .required("Tipo de Documento é obrigatório"),
    documento: Yup.string()
      .matches(/^\d+$/, "Documento deve conter apenas números")
      .min(7, "Documento deve ter pelo menos 7 dígitos")
      .max(20, "Documento não pode exceder 20 dígitos")
      .required("Documento é obrigatório"),
    email: Yup.string()
      .email("Email inválido")
      .required("Email é obrigatório"),
    telefone: Yup.string()
      .matches(/^\d{10,15}$/, "Telefone deve conter entre 10 e 15 dígitos")
      .required("Telefone é obrigatório"),
    dat_nascimento: Yup.date()
      .max(new Date(), "Data de Nascimento não pode ser futura")
      .required("Data de Nascimento é obrigatória"),
  });

  function salvarPassageiro(dados) {
    try {
      const passageirosSalvos = JSON.parse(localStorage.getItem("passageiros")) || [];
      
      // Gerar ID único
      const novoId = passageirosSalvos.length > 0 ? Math.max(...passageirosSalvos.map(p => p.id)) + 1 : 1;

      const novoPassageiro = {
        id: novoId,
        nome: dados.nome,
        tipo_documento: dados.tipo_documento,
        documento: dados.documento,
        email: dados.email,
        telefone: dados.telefone,
        dat_nascimento: dados.dat_nascimento, // Add a data de nascimento
      };

      passageirosSalvos.push(novoPassageiro);
      localStorage.setItem("passageiros", JSON.stringify(passageirosSalvos));

      // Redirecionar com parâmetro de sucesso
      router.push("/passageiro?success=true");
    } catch (error) {
      console.error("Erro ao salvar passageiro:", error);
      setErrorMessage("Ocorreu um erro ao salvar o passageiro. Por favor, tente novamente.");
    }
  }

  return (
    <Pagina titulo="Novo Passageiro">
      {errorMessage && (
        <Alert variant="danger" onClose={() => setErrorMessage("")} dismissible>
          {errorMessage}
        </Alert>
      )}
      <Formik
        initialValues={{
          nome: '',
          tipo_documento: '',
          documento: '',
          email: '',
          telefone: '',
          dat_nascimento: '', // Inicializa a data de nascimento
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => salvarPassageiro(values)}
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
            {/* Nome */}
            <Form.Group className="mb-3" controlId="nome">
              <Form.Label>Nome</Form.Label>
              <FormControl
                type="text"
                name="nome"
                value={values.nome}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.nome && !!errors.nome}
                placeholder="Digite o nome completo"
              />
              {touched.nome && errors.nome ? (
                <Form.Control.Feedback type="invalid">
                  {errors.nome}
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>

            {/* Tipo de Documento */}
            <Form.Group className="mb-3" controlId="tipo_documento">
              <Form.Label>Tipo de Documento</Form.Label>
              <FormControl
                as="select"
                name="tipo_documento"
                value={values.tipo_documento}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.tipo_documento && !!errors.tipo_documento}
                required
              >
                <option value="">Selecione o Tipo de Documento</option>
                <option value="RG">RG</option>
                <option value="DNI">DNI</option>
                <option value="CNH">CNH ou CNH-eletrônico</option>
                <option value="Título de eleitor eletrônico">Título de eleitor eletrônico</option>
                <option value="Passaporte válido">Passaporte válido</option>
              </FormControl>
              {touched.tipo_documento && errors.tipo_documento ? (
                <Form.Control.Feedback type="invalid">
                  {errors.tipo_documento}
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>

            {/* Documento */}
            <Form.Group className="mb-3" controlId="documento">
              <Form.Label>Documento</Form.Label>
              <FormControl
                type="text"
                name="documento"
                value={values.documento}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.documento && !!errors.documento}
                placeholder="Digite o número do documento"
              />
              {touched.documento && errors.documento ? (
                <Form.Control.Feedback type="invalid">
                  {errors.documento}
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>

            {/* Email */}
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <FormControl
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.email && !!errors.email}
                placeholder="Digite o email"
              />
              {touched.email && errors.email ? (
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>

            {/* Telefone */}
            <Form.Group className="mb-3" controlId="telefone">
              <Form.Label>Telefone</Form.Label>
              <FormControl
                type="text"
                name="telefone"
                value={values.telefone}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.telefone && !!errors.telefone}
                placeholder="Digite o telefone"
              />
              {touched.telefone && errors.telefone ? (
                <Form.Control.Feedback type="invalid">
                  {errors.telefone}
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>

            {/* Data de Nascimento */}
            <Form.Group className="mb-3" controlId="dat_nascimento">
              <Form.Label>Data de Nascimento</Form.Label>
              <FormControl
                type="date"
                name="dat_nascimento"
                value={values.dat_nascimento}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.dat_nascimento && !!errors.dat_nascimento}
                required
              />
              {touched.dat_nascimento && errors.dat_nascimento ? (
                <Form.Control.Feedback type="invalid">
                  {errors.dat_nascimento}
                </Form.Control.Feedback>
              ) : null}
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
