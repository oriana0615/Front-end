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

  // Esquema de validação com Yup
  const validationSchema = Yup.object({
    internacional: Yup.boolean(),
    identificador: Yup.string()
      .min(3, "Identificador deve ter pelo menos 3 caracteres")
      .max(20, "Identificador não pode exceder 20 caracteres")
      .required("Identificador é obrigatório"),
    data_checkin: Yup.date()
      .required("Data de Check-in é obrigatória"),
    data_embarque: Yup.date()
      .min(
        Yup.ref('data_checkin'),
        "Data de Embarque deve ser após a Data de Check-in"
      )
      .required("Data de Embarque é obrigatória"),
    id_origem: Yup.number()
      .positive("ID Origem deve ser um número positivo")
      .integer("ID Origem deve ser um número inteiro")
      .required("ID Origem é obrigatório"),
    id_destino: Yup.number()
      .positive("ID Destino deve ser um número positivo")
      .integer("ID Destino deve ser um número inteiro")
      .required("ID Destino é obrigatório"),
    empresa_id: Yup.number()
      .positive("Empresa ID deve ser um número positivo")
      .integer("Empresa ID deve ser um número inteiro")
      .required("Empresa ID é obrigatório"),
    preco: Yup.number()
      .positive("Preço deve ser um número positivo")
      .required("Preço é obrigatório"),
  });

  // Função para salvar os dados do formulário
  const salvarDados = (dados) => {
    try {
      const voos = JSON.parse(localStorage.getItem("voos")) || [];

      // Gerar ID único baseado no maior ID existente ou 1
      const novoId = voos.length > 0 ? Math.max(...voos.map(v => v.id || 0)) + 1 : 1;

      const novoVoo = {
        id: novoId,
        internacional: dados.internacional,
        identificador: dados.identificador,
        data_checkin: dados.data_checkin,
        data_embarque: dados.data_embarque,
        id_origem: dados.id_origem,
        id_destino: dados.id_destino,
        empresa_id: dados.empresa_id,
        preco: parseFloat(dados.preco).toFixed(2),
      };

      voos.push(novoVoo);
      localStorage.setItem("voos", JSON.stringify(voos));

      // Redirecionar com parâmetro de sucesso
      router.push("/voo?success=true");
    } catch (error) {
      console.error("Erro ao salvar voo:", error);
      setErrorMessage("Ocorreu um erro ao salvar o voo. Por favor, tente novamente.");
    }
  };

  return (
    <Pagina titulo="Novo Voo">
      {errorMessage && (
        <Alert variant="danger" onClose={() => setErrorMessage("")} dismissible>
          {errorMessage}
        </Alert>
      )}
      <Formik
        initialValues={{
          internacional: false,
          identificador: "",
          data_checkin: "",
          data_embarque: "",
          id_origem: "",
          id_destino: "",
          empresa_id: "",
          preco: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => salvarDados(values)}
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
            {/* Campo Internacional */}
            <Form.Group className="mb-3" controlId="internacional">
              <Form.Check
                type="checkbox"
                label="Internacional"
                name="internacional"
                checked={values.internacional}
                onChange={handleChange}
              />
            </Form.Group>

            {/* Campo Identificador */}
            <Form.Group className="mb-3" controlId="identificador">
              <Form.Label>Identificador</Form.Label>
              <FormControl
                type="text"
                name="identificador"
                value={values.identificador}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.identificador && !!errors.identificador}
                required
              />
              {touched.identificador && errors.identificador && (
                <Form.Control.Feedback type="invalid">
                  {errors.identificador}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            {/* Campo Data Check-in */}
            <Form.Group className="mb-3" controlId="data_checkin">
              <Form.Label>Data de Check-in</Form.Label>
              <FormControl
                type="datetime-local"
                name="data_checkin"
                value={values.data_checkin}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.data_checkin && !!errors.data_checkin}
                required
              />
              {touched.data_checkin && errors.data_checkin && (
                <Form.Control.Feedback type="invalid">
                  {errors.data_checkin}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            {/* Campo Data Embarque */}
            <Form.Group className="mb-3" controlId="data_embarque">
              <Form.Label>Data de Embarque</Form.Label>
              <FormControl
                type="datetime-local"
                name="data_embarque"
                value={values.data_embarque}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.data_embarque && !!errors.data_embarque}
                required
              />
              {touched.data_embarque && errors.data_embarque && (
                <Form.Control.Feedback type="invalid">
                  {errors.data_embarque}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            {/* Campo ID Origem */}
            <Form.Group className="mb-3" controlId="id_origem">
              <Form.Label>ID de Origem</Form.Label>
              <FormControl
                type="number"
                name="id_origem"
                value={values.id_origem}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.id_origem && !!errors.id_origem}
                required
              />
              {touched.id_origem && errors.id_origem && (
                <Form.Control.Feedback type="invalid">
                  {errors.id_origem}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            {/* Campo ID Destino */}
            <Form.Group className="mb-3" controlId="id_destino">
              <Form.Label>ID de Destino</Form.Label>
              <FormControl
                type="number"
                name="id_destino"
                value={values.id_destino}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.id_destino && !!errors.id_destino}
                required
              />
              {touched.id_destino && errors.id_destino && (
                <Form.Control.Feedback type="invalid">
                  {errors.id_destino}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            {/* Campo Empresa ID */}
            <Form.Group className="mb-3" controlId="empresa_id">
              <Form.Label>ID da Empresa</Form.Label>
              <FormControl
                type="number"
                name="empresa_id"
                value={values.empresa_id}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.empresa_id && !!errors.empresa_id}
                required
              />
              {touched.empresa_id && errors.empresa_id && (
                <Form.Control.Feedback type="invalid">
                  {errors.empresa_id}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            {/* Campo Preço */}
            <Form.Group className="mb-3" controlId="preco">
              <Form.Label>Preço</Form.Label>
              <FormControl
                type="number"
                step="0.01"
                name="preco"
                value={values.preco}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.preco && !!errors.preco}
                required
              />
              {touched.preco && errors.preco && (
                <Form.Control.Feedback type="invalid">
                  {errors.preco}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            {/* Botões */}
            <div className="text-center">
              <Button type="submit" variant="success">
                <FaCheck /> Salvar
              </Button>
              <Link href="/voo" className="btn btn-danger ms-2">
                <MdOutlineArrowBack /> Voltar
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </Pagina>
  );
}
