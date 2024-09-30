"use client"; // Indica que este é um componente de cliente

import Pagina from "@/app/components/Pagina";
import Link from "next/link";
import { Table, Alert } from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const [passageiros, setPassageiros] = useState([]);
  const searchParams = useSearchParams();
  const success = searchParams.get("success");

  useEffect(() => {
    const passageirosSalvos = JSON.parse(localStorage.getItem("passageiros")) || [];
    setPassageiros(passageirosSalvos);
  }, []);

  // Função para formatar a data no formato DD/MM/YYYY
  const formatarData = (data) => {
    const dataObj = new Date(data);
    const dia = String(dataObj.getDate()).padStart(2, '0');
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0'); // Meses começam em 0
    const ano = dataObj.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  return (
    <Pagina titulo="Passageiros">
      {success && (
        <Alert variant="success">
          Passageiro cadastrado com sucesso!
        </Alert>
      )}
      <Link href="/passageiro/create" className="btn btn-primary mb-3">
        <FaPlusCircle /> Novo Passageiro
      </Link>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Tipo Documento</th>
            <th>Documento</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Data de Nascimento</th> {/* Nova Coluna */}
          </tr>
        </thead>

        <tbody>
          {passageiros.map((passageiro) => (
            <tr key={passageiro.id}>
              <td>{passageiro.id}</td>
              <td>{passageiro.nome}</td>
              <td>{passageiro.tipo_documento}</td>
              <td>{passageiro.documento}</td>
              <td>{passageiro.email}</td>
              <td>{passageiro.telefone}</td>
              <td>{formatarData(passageiro.dat_nascimento)}</td> {/* Exibe a data formatada */}
            </tr>
          ))}
        </tbody>
      </Table>
    </Pagina>
  );
}
