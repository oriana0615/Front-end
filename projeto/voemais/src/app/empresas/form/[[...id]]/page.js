'use client'

import Pagina from "@/app/components/Pagina";
// import * as Yup from "yup";  //  uso do Yup
import EmpresaValidator from "@/validators/EmpresaValidator";  

import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { v4 } from "uuid";

export default function Page({ params }) {

    const route = useRouter();

    const empresas = JSON.parse(localStorage.getItem('empresas')) || [];
    const dados = empresas.find(item => item.id == params.id);
    const empresa = dados || { nome: '', logo: '', site: '' };

    function salvar(dados) {
        if (empresa.id) {
            Object.assign(empresa, dados);
        } else {
            dados.id = v4();
            empresas.push(dados);
        }

        localStorage.setItem('empresas', JSON.stringify(empresas));
        return route.push('/empresas');
    }

    return (
        <Pagina titulo="Empresa">
            <Formik
                initialValues={empresa}
                // validationSchema={Yup.object({  // <- Comentado Yup
                //     nome: Yup.string().required("Nome é obrigatório"),
                //     logo: Yup.string().required("Logo é obrigatório"),
                //     site: Yup.string().url("Deve ser uma URL válida").required("Site é obrigatório"),
                // })}  
                validationSchema={EmpresaValidator}  // Novo validador
                onSubmit={values => salvar(values)}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    errors, // <-- Erros capturados
                    touched,   // <-- Verifica se o campo foi tocado antes de mostrar o erro
                    
                }) => {
                    return (
                        <Form>
                            <Form.Group className="mb-3" controlId="nome">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nome"
                                    value={values.nome}
                                    onChange={handleChange('nome')}
                                   
                        isInvalid={touched.nome && !!errors.nome}  // Mostra erro se tocado e inválido
                                />

                        {touched.nome && errors.nome && (
                                <div className="text-danger">{errors.nome}</div>
                            )}

                            </Form.Group>
                            <Form.Group className="mb-3" controlId="logo">
                                <Form.Label>Logo</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="logo"
                                    value={values.logo}
                                    onChange={handleChange('logo')}
                                    isInvalid={touched.logo && !!errors.logo}
                                />
                                    {touched.logo && errors.logo && (

                                <div className="text-danger">{errors.logo}</div>
                            )}

                            </Form.Group>
                            <Form.Group className="mb-3" controlId="site">
                                <Form.Label>Site</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="site"
                                    value={values.site}
                                    onChange={handleChange('site')}
                                    isInvalid={touched.site && !!errors.site}
                                />

                                {touched.site && errors.site && (
                                <div className="text-danger">{errors.site}</div>

                            )}
                            </Form.Group>
                            
                            <div className="text-center">
                                <Button onClick={handleSubmit} variant="success">
                                    <FaCheck /> Salvar
                                </Button>
                                <Link
                                    href="/empresas"
                                    className="btn btn-danger ms-2"
                                >
                                    <MdOutlineArrowBack /> Voltar
                                </Link>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </Pagina>
    );
}
