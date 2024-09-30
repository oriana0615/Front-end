"use client"; 

import Pagina from "@/app/components/Pagina";
import Link from "next/link";
import { Table, Alert } from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const [passagens, setPassagens] = useState([]);
  const searchParams = useSearchParams();
  const success = searchParams.get("success");

  useEffect(() => {
    const passagensSalvas = JSON.parse(localStorage.getItem("passagens")) || [];
    setPassagens(passagensSalvas);
  }, []);

  // Função para formatar o preço com duas casas decimais
  const formatarPreco = (preco) => {
    return preco.toFixed(2);
  };

  return (
    <Pagina titulo="Passagens">
      {success && (
        <Alert variant="success">
          Passagem cadastrada com sucesso!
        </Alert>
      )}
      <Link href="/passagem/create" className="btn btn-primary mb-3">
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
          </tr>
        </thead>

        <tbody>
          {passagens.map((passagem) => (
            <tr key={passagem.id}>
              <td>{passagem.id}</td>
              <td>{passagem.vooId}</td>
              <td>{passagem.passageiroId}</td>
              <td>{passagem.assento}</td>
              <td>R$ {formatarPreco(passagem.preco)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Pagina>
  );
}
