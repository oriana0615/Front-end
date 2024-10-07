'use client'

import Pagina from "@/app/components/Pagina";
import { Button } from "react-bootstrap";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import * as Yup from "yup";
import { v4 as uuidv4, v4 } from "uuid";

export default function Page({ params }) {
  const router = useRouter();
  const empresas = JSON.parse(localStorage.getItem('aeroporto')) || [];

  //
  const aeroportoId = params.id.toString();
  const dados = empresas.find(item => item.id === aeroportoId);
  const aeroporto = dados || { nome: '', sigla: '', uf: '', cidade: '', pais: '', logo: '' };

  const validationSchema = Yup.object({
    nome: Yup.string().required("Nome é obrigatório"),
    sigla: Yup.string().required("Sigla é obrigatória"),
    uf: Yup.string().required("UF é obrigatório"),
    cidade: Yup.string().required("Cidade é obrigatória"),
    pais: Yup.string().required("País é obrigatório"),
    logo: Yup.string().url("Logo deve ser uma URL válida").required("Logo é obrigatória"),
  });

  const salvar = (dados) => {
    if (aeroporto.id) {
      Object.assign(aeroporto, dados);
    } else {
      dados.id = v4();
      empresas.push(dados);
    }

    localStorage.setItem('aeroporto', JSON.stringify(empresas));
    router.push('/aeroporto?success=true');
  };

  return (
    <Pagina titulo="Aeroporto">
      <Formik
        initialValues={aeroporto}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {({ values, handleChange, handleSubmit, errors, touched }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="nome">
              <Form.Label>Nome</Form.Label>
              <Form.Control 
                type="text" 
                name="nome" 
                value={values.nome} 
                onChange={handleChange} 
                isInvalid={touched.nome && !!errors.nome}
              />
              <Form.Control.Feedback type="invalid">
                {errors.nome}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="sigla">
              <Form.Label>Sigla</Form.Label>
              <Form.Control 
                type="text" 
                name="sigla" 
                value={values.sigla} 
                onChange={handleChange} 
                isInvalid={touched.sigla && !!errors.sigla}
              />
              <Form.Control.Feedback type="invalid">
                {errors.sigla}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="uf">
              <Form.Label>UF</Form.Label>
              <Form.Control 
                type="text" 
                name="uf" 
                value={values.uf} 
                onChange={handleChange} 
                isInvalid={touched.uf && !!errors.uf}
              />
              <Form.Control.Feedback type="invalid">
                {errors.uf}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="cidade">
              <Form.Label>Cidade</Form.Label>
              <Form.Control 
                type="text" 
                name="cidade" 
                value={values.cidade} 
                onChange={handleChange} 
                isInvalid={touched.cidade && !!errors.cidade}
              />
              <Form.Control.Feedback type="invalid">
                {errors.cidade}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="pais">
              <Form.Label>País</Form.Label>
              <Form.Control 
                type="text" 
                name="pais" 
                value={values.pais} 
                onChange={handleChange} 
                isInvalid={touched.pais && !!errors.pais}
              />
              <Form.Control.Feedback type="invalid">
                {errors.pais}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="logo">
              <Form.Label>Logo</Form.Label>
              <Form.Control 
                type="url" 
                name="logo" 
                value={values.logo} 
                onChange={handleChange} 
                isInvalid={touched.logo && !!errors.logo}
              />
              <Form.Control.Feedback type="invalid">
                {errors.logo}
              </Form.Control.Feedback>
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
