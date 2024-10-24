"use client";

import Pagina from "@/app/components/Pagina";
import Link from "next/link";
import { Table, Alert } from "react-bootstrap";
import { FaPlusCircle, FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Corrigido o import do useRouter
import { Formik } from "formik";
import { Button, Form, FormControl } from "react-bootstrap";
// import * as Yup from "yup"; // Comentado porque no se usará Yup
import PassageiroValidator from "@/validators/PassageiroValidator"; // Validador personalizado
import { mask } from "remask"; // Importa a biblioteca remask

export default function Page({ params }) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const [passageiro, setPassageiro] = useState({
    nome: "",
    tipo_documento: "",
    documento: "",
    email: "",
    telefone: "",
    dat_nascimento: "",
  });

  const passageiros = JSON.parse(localStorage.getItem("passageiros")) || [];
  const passageiroId = params?.id ? parseInt(params.id) : null;

  // Carregar os dados do passageiro ao entrar na página de edição
  useEffect(() => {
    if (passageiroId) {
      const passageiroEncontrado = passageiros.find(
        (item) => item.id === passageiroId
      );
      if (passageiroEncontrado) {
        setPassageiro(passageiroEncontrado); // Preenche os campos com os dados do passageiro
      }
    }
  }, [passageiroId]);

  // Usando PassageiroValidator do arquivo validators
  function salvarPassageiro(dados) {
    try {
      if (passageiroId) {
        const index = passageiros.findIndex((item) => item.id === passageiroId);
        passageiros[index] = { id: passageiroId, ...dados }; // Atualiza os dados do passageiro
      } else {
        const novoId =
          passageiros.length > 0
            ? Math.max(...passageiros.map((p) => p.id)) + 1
            : 1;
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
        validationSchema={PassageiroValidator} // Usando o PassageiroValidator para validação
        onSubmit={salvarPassageiro}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          handleBlur,
          setFieldValue,
        }) => (
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
                <Form.Control.Feedback type="invalid">
                  {errors.nome}
                </Form.Control.Feedback>
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
                <option value="Título de eleitor eletrônico">
                  Título de eleitor eletrônico
                </option>
                <option value="Passaporte válido">Passaporte válido</option>
              </FormControl>
              {touched.tipo_documento && errors.tipo_documento && (
                <Form.Control.Feedback type="invalid">
                  {errors.tipo_documento}
                </Form.Control.Feedback>
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
                <Form.Control.Feedback type="invalid">
                  {errors.documento}
                </Form.Control.Feedback>
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
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group controlId="telefone">
              <Form.Label>Telefone</Form.Label>
              <FormControl
                type="text"
                name="telefone"
                value={values.telefone}
                onChange={(e) => {
                  const maskedValue = mask(e.target.value, [
                    "(99) 99999-9999", // Máscara para celular
                    "(99) 9999-9999",  // Máscara para telefone fixo
                  ]);
                  setFieldValue("telefone", maskedValue);
                }}
                onBlur={handleBlur}
                placeholder="Ex: (61) 98765-4321" // Placeholder para mostrar a máscara
                isInvalid={touched.telefone && !!errors.telefone}
              />
              {touched.telefone && errors.telefone && (
                <Form.Control.Feedback type="invalid">
                  {errors.telefone}
                </Form.Control.Feedback>
              )}
            </Form.Group>




            <Form.Group controlId="dat_nascimento">
              <Form.Label>Data de Nascimento</Form.Label>
              <FormControl
                type="text"
                //type="date" //  'date' para exibir o seletor de calendário
                name="dat_nascimento"
                value={values.dat_nascimento}
                onChange={(e) => {
                  const maskedValue = mask(e.target.value, "99/99/9999");
                  setFieldValue("dat_nascimento", maskedValue); // Aplicando máscara à data de nascimento
                }}
                onBlur={handleBlur}
                isInvalid={touched.dat_nascimento && !!errors.dat_nascimento}
              />
              {touched.dat_nascimento && errors.dat_nascimento && (
                <Form.Control.Feedback type="invalid">
                  {errors.dat_nascimento}
                </Form.Control.Feedback>
              )}
            </Form.Group>


            <Button type="submit" className="mt-3">
              {passageiroId ? "Atualizar Passageiro" : "Cadastrar Passageiro"}
            </Button>
          </Form>
        )}
      </Formik>
    </Pagina>
  );
}
