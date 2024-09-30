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
      .max(100, "Nome não pode exceder 100 caracteres")
      .required("Nome é obrigatório"),
    sigla: Yup.string()
      .matches(/^[A-Z]{3}$/, "Sigla deve ter exatamente 3 letras maiúsculas")
      .required("Sigla é obrigatória"),
    uf: Yup.string()
      .matches(/^[A-Z]{2}$/, "UF deve ter exatamente 2 letras maiúsculas")
      .required("UF é obrigatório"),
    cidade: Yup.string()
      .min(2, "Cidade deve ter pelo menos 2 caracteres")
      .max(100, "Cidade não pode exceder 100 caracteres")
      .required("Cidade é obrigatória"),
    pais: Yup.string()
      .min(2, "País deve ter pelo menos 2 caracteres")
      .max(100, "País não pode exceder 100 caracteres")
      .required("País é obrigatório"),
    logo: Yup.string()
      .url("Logo deve ser uma URL válida")
      .required("Logo é obrigatória"),
    site: Yup.string()
      .url("Site deve ser uma URL válida")
      .required("Site é obrigatório"),
  });

  // Função para salvar os dados do formulário
  const salvarAeroporto = (dados) => {
    try {
      const aeroportosSalvos = JSON.parse(localStorage.getItem("aeroporto")) || [];

      // Gerar ID único
      const novoId = aeroportosSalvos.length > 0 ? Math.max(...aeroportosSalvos.map(a => a.id)) + 1 : 1;

      const novoAeroporto = {
        id: novoId,
        nome: dados.nome,
        sigla: dados.sigla,
        uf: dados.uf,
        cidade: dados.cidade,
        pais: dados.pais,
        logo: dados.logo,
        site: dados.site,
      };

      aeroportosSalvos.push(novoAeroporto);
      localStorage.setItem("aeroporto", JSON.stringify(aeroportosSalvos));

      // Redirecionar com parâmetro de sucesso
      router.push("/aeroporto?success=true");
    } catch (error) {
      console.error("Erro ao salvar aeroporto:", error);
      setErrorMessage("Ocorreu um erro ao salvar o aeroporto. Por favor, tente novamente.");
    }
  };

  return (
    <Pagina titulo="Novo Aeroporto">
      {errorMessage && (
        <Alert variant="danger" onClose={() => setErrorMessage("")} dismissible>
          {errorMessage}
        </Alert>
      )}
      <Formik
        initialValues={{
          nome: "",
          sigla: "",
          uf: "",
          cidade: "",
          pais: "",
          logo: "",
          site: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => salvarAeroporto(values)}
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
            <Form.Group className="mb-3" controlId="nome">
              <Form.Label>Nome</Form.Label>
              <FormControl
                type="text"
                name="nome"
                value={values.nome}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.nome && !!errors.nome}
                placeholder="Digite o nome do aeroporto"
              />
              {touched.nome && errors.nome ? (
                <Form.Control.Feedback type="invalid">
                  {errors.nome}
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-3" controlId="sigla">
              <Form.Label>Sigla</Form.Label>
              <FormControl
                type="text"
                name="sigla"
                value={values.sigla}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.sigla && !!errors.sigla}
                placeholder="Ex: GRU"
              />
              {touched.sigla && errors.sigla ? (
                <Form.Control.Feedback type="invalid">
                  {errors.sigla}
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-3" controlId="uf">
              <Form.Label>UF</Form.Label>
              <FormControl
                type="text"
                name="uf"
                value={values.uf}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.uf && !!errors.uf}
                placeholder="Ex: SP"
              />
              {touched.uf && errors.uf ? (
                <Form.Control.Feedback type="invalid">
                  {errors.uf}
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-3" controlId="cidade">
              <Form.Label>Cidade</Form.Label>
              <FormControl
                type="text"
                name="cidade"
                value={values.cidade}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.cidade && !!errors.cidade}
                placeholder="Digite a cidade"
              />
              {touched.cidade && errors.cidade ? (
                <Form.Control.Feedback type="invalid">
                  {errors.cidade}
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-3" controlId="pais">
              <Form.Label>País</Form.Label>
              <FormControl
                type="text"
                name="pais"
                value={values.pais}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.pais && !!errors.pais}
                placeholder="Digite o país"
              />
              {touched.pais && errors.pais ? (
                <Form.Control.Feedback type="invalid">
                  {errors.pais}
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-3" controlId="logo">
              <Form.Label>Logo</Form.Label>
              <FormControl
                type="url"
                name="logo"
                value={values.logo}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.logo && !!errors.logo}
                placeholder="URL da logo do aeroporto"
              />
              {touched.logo && errors.logo ? (
                <Form.Control.Feedback type="invalid">
                  {errors.logo}
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-3" controlId="site">
              <Form.Label>Site</Form.Label>
              <FormControl
                type="url"
                name="site"
                value={values.site}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.site && !!errors.site}
                placeholder="URL do site do aeroporto"
              />
              {touched.site && errors.site ? (
                <Form.Control.Feedback type="invalid">
                  {errors.site}
                </Form.Control.Feedback>
              ) : null}
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
