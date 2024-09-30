"use client"; 

import Pagina from "@/app/components/Pagina";
import Link from "next/link";
import { Table, Alert } from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const [aeroportos, setAeroportos] = useState([]);
  const searchParams = useSearchParams();
  const success = searchParams.get("success");

  useEffect(() => {
    const aeroportosSalvos = JSON.parse(localStorage.getItem("aeroporto")) || [];
    setAeroportos(aeroportosSalvos);
  }, []);

  return (
    <Pagina titulo="Aeroportos">
      {success && (
        <Alert variant="success">
          Aeroporto cadastrado com sucesso!
        </Alert>
      )}
      <Link href="/aeroporto/create" className="btn btn-primary mb-3">
        <FaPlusCircle /> Novo Aeroporto
      </Link>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Sigla</th>
            <th>UF</th>
            <th>Cidade</th>
            <th>País</th>
            <th>Logo</th>
          </tr>
        </thead>

        <tbody>
          {aeroportos.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nome}</td>
              <td>{item.sigla}</td>
              <td>{item.uf}</td>
              <td>{item.cidade}</td>
              <td>{item.pais}</td>
              <td>
                {item.logo ? (
                  <a href={item.logo} target="_blank" rel="noopener noreferrer">
                    <img src={item.logo} alt={`${item.nome} Logo`} width={100} />
                  </a>
                ) : (
                  "Sem Logo"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Pagina>
  );
}
