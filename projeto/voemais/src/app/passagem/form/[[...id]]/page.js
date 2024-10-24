"use client";
import Pagina from "@/app/components/Pagina";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Form, FormControl, Alert } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { useState, useEffect } from "react";
import { mask, unMask } from "remask";
import PassagemValidator from "@/validators/PassagemValidator";

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

  useEffect(() => {
    if (passagemId) {
      const passagemEncontrada = passagens.find(item => item.id === passagemId);
      if (passagemEncontrada) {
        setPassagem(passagemEncontrada);
      }
    }
  }, [passagemId]);

  async function salvarPassagem(dados) {
    try {
      if (passagemId) {
        const index = passagens.findIndex(item => item.id === passagemId);
        passagens[index] = { id: passagemId, ...dados };
      } else {
        const novoId = passagens.length > 0 ? Math.max(...passagens.map(p => p.id)) + 1 : 1;
        passagens.push({ id: novoId, ...dados });
      }
      localStorage.setItem("passagens", JSON.stringify(passagens));
      router.push("/passagem?success=true");
    } catch (error) {
      setErrorMessage("Erro ao salvar passagem.");
    }
  }


  const formatarPreco = (preco) => {
    const precoNumero = parseFloat(preco);
    if (isNaN(precoNumero)) {
      return "0.00";
    }
    return precoNumero.toFixed(2);
  };

  return (
    <Pagina titulo={passagemId ? "Editar Passagem" : "Nova Passagem"}>
      {errorMessage && (
        <Alert variant="danger" onClose={() => setErrorMessage("")} dismissible>
          {errorMessage}
        </Alert>
      )}
      <Formik
        enableReinitialize
        initialValues={passagem}
        validationSchema={PassagemValidator}
        onSubmit={salvarPassagem}
      >
        {({ values, errors, touched, handleChange, handleSubmit, handleBlur, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="vooId">
              <Form.Label>Voo Id</Form.Label>
              <FormControl
                type="text"
                name="vooId"
                value={values.vooId}
                onChange={(e) => setFieldValue("vooId", unMask(e.target.value))}
                onBlur={handleBlur}
                isInvalid={touched.vooId && !!errors.vooId}
                placeholder="0000"
              />
              {touched.vooId && errors.vooId && (
                <Form.Control.Feedback type="invalid">{errors.vooId}</Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group controlId="passageiroId">
              <Form.Label>Passageiro Id</Form.Label>
              <FormControl
                type="text"
                name="passageiroId"
                value={values.passageiroId}
                onChange={(e) => setFieldValue("passageiroId", unMask(e.target.value))}
                onBlur={handleBlur}
                isInvalid={touched.passageiroId && !!errors.passageiroId}
                placeholder="0000"
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
                placeholder="A14"
              />
              {touched.assento && errors.assento && (
                <Form.Control.Feedback type="invalid">{errors.assento}</Form.Control.Feedback>
              )}
            </Form.Group>


            <Form.Group controlId="preco">
              <Form.Label>Preço</Form.Label>
              <FormControl
                type="text"
                name="preco"
                value={values.preco}
                onChange={(e) => setFieldValue("preco", mask(e.target.value, ['999.99']))}
                onBlur={handleBlur}
                isInvalid={touched.preco && !!errors.preco}
                placeholder="000.00"
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
