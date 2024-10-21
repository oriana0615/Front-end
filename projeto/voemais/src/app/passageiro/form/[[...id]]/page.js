"use client"; 

import Pagina from "@/app/components/Pagina";
import Link from "next/link";
import { Table, Alert } from "react-bootstrap";
import { FaPlusCircle, FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Formik } from "formik";
import { Button, Form, FormControl } from "react-bootstrap";
import PassagemValidator from "@/validators/PassagemValidator"; // Novo validador para passagem
// import * as Yup from 'yup';  // <- uso do Yup, agora comentado

export default function Page({ params }) {
  const [passagens, setPassagens] = useState([]);
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const [passagem, setPassagem] = useState({
    vooId: '',
    passageiroId: '',
    assento: '',
    preco: ''
  });

  const passagensSalvas = JSON.parse(localStorage.getItem('passagens')) || [];
  const passagemId = params?.id ? parseInt(params.id) : null;

  // Carregar os dados da passagem ao entrar na página de edição
  useEffect(() => {
    if (passagemId) {
      const passagemEncontrada = passagensSalvas.find(item => item.id === passagemId);
      if (passagemEncontrada) {
        setPassagem(passagemEncontrada); // Preenche os campos com os dados da passagem
      }
    }
  }, [passagemId]);

 
  const formatarPreco = (preco) => {
    return preco.toFixed(2);
  };

  // Função para excluir passagem
  function excluir(id) {
    if (confirm('Deseja realmente excluir a passagem?')) {
      const novasPassagens = passagens.filter(item => item.id !== id);
      localStorage.setItem('passagens', JSON.stringify(novasPassagens));
      setPassagens(novasPassagens);
    }
  }

  // (novo ou atualizado)
  function salvarPassagem(dados) {
    try {
      if (passagemId) {
        const index = passagensSalvas.findIndex(item => item.id === passagemId);
        passagensSalvas[index] = { id: passagemId, ...dados }; // Atualiza os dados da passagem
      } else {
        dados.id = v4(); // Gerando ID único para nova passagem
        passagensSalvas.push(dados);
      }

      localStorage.setItem("passagens", JSON.stringify(passagensSalvas));
    } catch (error) {
      console.error("Erro ao salvar passagem:", error);
    }
  }

  return (
    <Pagina titulo="Passagens">
      {success && (
        <Alert variant="success">
          Passagem cadastrada com sucesso!
        </Alert>
      )}

      <Link href="/passagem/form" className="btn btn-primary mb-3">
        <FaPlusCircle /> Nova Passagem
      </Link>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Voo Id</th>
            <th>Passageiro Id</th>
            <th>Assento</th>
            <th>Preço</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {passagensSalvas.map((passagem) => (
            <tr key={passagem.id}>
              <td>{passagem.id}</td>
              <td>{passagem.vooId}</td>
              <td>{passagem.passageiroId}</td>
              <td>{passagem.assento}</td>
              <td>R$ {formatarPreco(passagem.preco)}</td>
              <td>
                <Link href={`/passagem/form/${passagem.id}`}>
                  <FaRegEdit title="Editar" className="text-primary" />
                </Link>
                <MdDelete
                  title="Excluir"
                  className="text-danger"
                  onClick={() => excluir(passagem.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Formik
        enableReinitialize
        initialValues={passagem}
        validationSchema={PassagemValidator} // Novo validador
        onSubmit={salvarPassagem}
      >
        {({ values, errors, touched, handleChange, handleSubmit, handleBlur }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="vooId">
              <Form.Label>Voo ID</Form.Label>
              <FormControl
                type="text"
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
              <Form.Label>Passageiro ID</Form.Label>
              <FormControl
                type="text"
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
              />
              {touched.preco && errors.preco && (
                <Form.Control.Feedback type="invalid">{errors.preco}</Form.Control.Feedback>
              )}
            </Form.Group>

            <div className="text-center">
              <Button type="submit" variant="success">
                Salvar
              </Button>
              <Link href="/passagem" className="btn btn-danger ms-2">
                Voltar
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </Pagina>
  );
}
