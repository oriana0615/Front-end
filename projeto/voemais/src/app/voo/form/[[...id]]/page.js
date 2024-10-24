"use client";

import Pagina from "@/app/components/Pagina";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { Button, Form, FormControl, Alert } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { useEffect, useState } from "react";
import VooValidator from "@/validators/VooValidator";
import { mask, unMask } from "remask";

export default function VooFormPage() {
  const router = useRouter();
  const params = useParams();
  const idParam = params?.id;
  const identificador = Array.isArray(idParam) ? idParam[0] : idParam; // Caso seja um array
  const [errorMessage, setErrorMessage] = useState("");

  const [vooInicial, setVooInicial] = useState({
    internacional: false,
    identificador: "",
    data_checkin: "",
    data_embarque: "",
    id_origem: "",
    id_destino: "",
    empresa_id: "",
    preco: "",
  });

  useEffect(() => {
    if (identificador) {
      const voos = JSON.parse(localStorage.getItem("voos")) || [];
      const voo = voos.find(v => v.identificador === identificador);
      if (voo) {
        // Formate as datas para que sejam compatíveis com datetime-local
        const formatDateForInput = (date) => {
          const dataObj = new Date(date);
          const tzOffset = dataObj.getTimezoneOffset() * 60000; // offset em milissegundos
          const localISOTime = new Date(dataObj - tzOffset).toISOString().slice(0, 16);
          return localISOTime;
        };

        setVooInicial({
          ...voo,
          data_checkin: formatDateForInput(voo.data_checkin),
          data_embarque: formatDateForInput(voo.data_embarque),
        });
      }
    }
  }, [identificador]);

  // Validaciones de Yup
  /* const validationSchema = Yup.object({
    internacional: Yup.boolean(),
    identificador: Yup.string()
      .min(3, "Identificador deve ter pelo menos 3 caracteres")
      .max(20, "Identificador não pode exceder 20 caracteres")
      .required("Identificador é obrigatório"),
    data_checkin: Yup.date().required("Data de Check-in é obrigatória"),
    data_embarque: Yup.date()
      .min(Yup.ref("data_checkin"), "Data de Embarque deve ser após a Data de Check-in")
      .required("Data de Embarque é obrigatória"),
    id_origem: Yup.number().positive().integer().required("ID de Origem é obrigatório"),
    id_destino: Yup.number().positive().integer().required("ID de Destino é obrigatório"),
    empresa_id: Yup.number().positive().integer().required("ID da Empresa é obrigatório"),
    preco: Yup.number().positive().required("Preço é obrigatório"),
  }); */

  // Usamos o VooValidator para validar os dados
  const validate = async (values) => {
    try {
      await VooValidator.validate(values, { abortEarly: false });
      return {};
    } catch (err) {
      const errors = err.inner.reduce((acc, error) => {
        acc[error.path] = error.message; // Mapeamos el error al campo correspondiente
        return acc;
      }, {});
      return errors;
    }
  };

  const salvarVoo = (dados) => {
    try {
      let voos = JSON.parse(localStorage.getItem("voos")) || [];

      if (identificador) {
        
        voos = voos.map((voo) => (voo.identificador === identificador ? dados : voo));
      } else {
        
        const existe = voos.some(voo => voo.identificador === dados.identificador);
        if (existe) {
          setErrorMessage("Já existe um voo com esse identificador.");
          return;
        }
        voos.push(dados);
      }

      localStorage.setItem("voos", JSON.stringify(voos));

      router.push("/voo?success=true");
    } catch (error) {
      console.error("Erro ao salvar voo:", error);
      setErrorMessage("Ocorreu um erro ao salvar o voo.");
    }
  };

  return (
    <Pagina titulo={identificador ? "Editar Voo" : "Novo Voo"}>
      {errorMessage && (
        <Alert variant="danger" onClose={() => setErrorMessage("")} dismissible>
          {errorMessage}
        </Alert>
      )}

      <Formik
        initialValues={vooInicial}
        enableReinitialize
        validate={validate} 
        onSubmit={(values) => salvarVoo(values)}
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
            <Form.Group className="mb-3" controlId="internacional">
              <Form.Check
                type="checkbox"
                label="Internacional"
                name="internacional"
                checked={values.internacional}
                onChange={handleChange}
              />
            </Form.Group>


            <Form.Group className="mb-3" controlId="identificador">
              <Form.Label>Identificador</Form.Label>
              <FormControl
                type="text"
                name="identificador"
                value={values.identificador}
                placeholder="Ex: ABC-1234"
                onChange={(e) => {
                  const maskedValue = mask(e.target.value, ["AAA-9999"]);
                  handleChange({
                    target: {
                      name: e.target.name,
                      value: maskedValue,
                    },
                  });
                }}
                onBlur={handleBlur}
                isInvalid={touched.identificador && !!errors.identificador}
                required
                disabled={!!identificador} // Desativar se for edição
              />
              <Form.Control.Feedback type="invalid">
                {errors.identificador}
              </Form.Control.Feedback>
            </Form.Group>



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
              <Form.Control.Feedback type="invalid">
                {errors.data_checkin}
              </Form.Control.Feedback>
            </Form.Group>

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
              <Form.Control.Feedback type="invalid">
                {errors.data_embarque}
              </Form.Control.Feedback>
            </Form.Group>


            <Form.Group className="mb-3" controlId="id_origem">
              <Form.Label>ID de Origem</Form.Label>
              <FormControl
                type="text"
                name="id_origem"
                value={values.id_origem}
                placeholder="Ex: 2"
                onChange={(e) => {
                  const maskedValue = mask(e.target.value, ["999999"]);
                  handleChange({
                    target: {
                      name: e.target.name,
                      value: maskedValue,
                    },
                  });
                }}
                onBlur={handleBlur}
                isInvalid={touched.id_origem && !!errors.id_origem}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.id_origem}
              </Form.Control.Feedback>
            </Form.Group>



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
              <Form.Control.Feedback type="invalid">
                {errors.id_destino}
              </Form.Control.Feedback>
            </Form.Group>

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
              <Form.Control.Feedback type="invalid">
                {errors.empresa_id}
              </Form.Control.Feedback>
            </Form.Group>



            <Form.Group className="mb-3" controlId="preco">
              <Form.Label>Preço</Form.Label>
              <FormControl
                type="text"
                name="preco"
                value={values.preco}
                placeholder="Ex: 9999.99"
                onChange={(e) => {
                  const maskedValue = mask(unMask(e.target.value), ["9999.99"]);
                  handleChange({
                    target: {
                      name: e.target.name,
                      value: maskedValue,
                    },
                  });
                }}
                onBlur={handleBlur}
                isInvalid={touched.preco && !!errors.preco}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.preco}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="me-2">
              {identificador ? "Salvar" : "Criar"} <FaCheck />
            </Button>
            <Link href="/voo" className="btn btn-secondary">
              <MdOutlineArrowBack /> Voltar
            </Link>
          </Form>
        )}
      </Formik>
    </Pagina>
  );
}
