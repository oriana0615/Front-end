"use client"; 

import Pagina from "@/app/components/Pagina";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import { Button, Form, FormControl, Alert } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import aeroportoValidator from "@/validators/aeroportoValidator"; // Importando o validor
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"; 
export default function Page({ params }) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [aeroporto, setAeroporto] = useState({
    nome: '',
    sigla: '',
    uf: '',
    cidade: '',
    pais: '',
    logo: '',
  });

  const empresas = JSON.parse(localStorage.getItem('aeroporto')) || [];
  const aeroportoId = typeof params.id === 'string' ? params.id : params.id?.toString();

  // Carregar os dados do aeroporto ao entrar na página de edição
  useEffect(() => {
    if (aeroportoId) {
      const aeroportoEncontrado = empresas.find(item => item.id === aeroportoId);
      if (aeroportoEncontrado) {
        setAeroporto(aeroportoEncontrado); // Preenche os campos com os dados do aeroporto
      }
    }
  }, [aeroportoId]);

  // Função para salvar o aeroporto
  const salvarAeroporto = (dados) => {
    try {
      if (aeroporto.id) {
        const index = empresas.findIndex(item => item.id === aeroportoId);
        empresas[index] = { id: aeroportoId, ...dados }; // Atualiza os dados do aeroporto
      } else {
        const novoId = uuidv4(); // Gera um novo UUID
        empresas.push({ id: novoId, ...dados });
      }

      localStorage.setItem('aeroporto', JSON.stringify(empresas));
      router.push('/aeroporto?success=true');
    } catch (error) {
      console.error("Erro ao salvar aeroporto:", error);
      setErrorMessage("Ocorreu um erro ao salvar o aeroporto. Tente novamente.");
    }
  };

  // Retorno da página
  return (
    <Pagina titulo={aeroportoId ? "Editar Aeroporto" : "Novo Aeroporto"}>
      {errorMessage && (
        <Alert variant="danger" onClose={() => setErrorMessage("")} dismissible>
          {errorMessage}
        </Alert>
      )}
      <Formik
        enableReinitialize // Isso garante que o Formik será atualizado quando o aeroporto mudar
        initialValues={aeroporto}
        validationSchema={aeroportoValidator} // Usando o aeroportoValidator para validação
        onSubmit={salvarAeroporto}
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

            <Form.Group controlId="sigla">
              <Form.Label>Sigla</Form.Label>
              <FormControl
                type="text"
                name="sigla"
                value={values.sigla}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.sigla && !!errors.sigla}
              />
              {touched.sigla && errors.sigla && (
                <Form.Control.Feedback type="invalid">{errors.sigla}</Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group controlId="uf">
              <Form.Label>UF</Form.Label>
              <FormControl
                type="text"
                name="uf"
                value={values.uf}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.uf && !!errors.uf}
              />
              {touched.uf && errors.uf && (
                <Form.Control.Feedback type="invalid">{errors.uf}</Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group controlId="cidade">
              <Form.Label>Cidade</Form.Label>
              <FormControl
                type="text"
                name="cidade"
                value={values.cidade}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.cidade && !!errors.cidade}
              />
              {touched.cidade && errors.cidade && (
                <Form.Control.Feedback type="invalid">{errors.cidade}</Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group controlId="pais">
              <Form.Label>País</Form.Label>
              <FormControl
                type="text"
                name="pais"
                value={values.pais}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.pais && !!errors.pais}
              />
              {touched.pais && errors.pais && (
                <Form.Control.Feedback type="invalid">{errors.pais}</Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group controlId="logo">
              <Form.Label>Logo</Form.Label>
              <FormControl
                type="url"
                name="logo"
                value={values.logo}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.logo && !!errors.logo}
              />
              {touched.logo && errors.logo && (
                <Form.Control.Feedback type="invalid">{errors.logo}</Form.Control.Feedback>
              )}
            </Form.Group>

            <div className="text-center">
              <Button type="submit" variant="success">
                <FaCheck /> Salvar
              </Button>
              <Link href="/aeroporto" className="btn btn-danger ms-2">
                <MdOutlineArrowBack /> Voltar
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </Pagina>
  );
}