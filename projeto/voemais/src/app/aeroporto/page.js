"use client"; 

import Pagina from "@/app/components/Pagina";
import Link from "next/link";
import { Table, Alert } from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

export default function Page() {
  const [aeroportos, setAeroportos] = useState([]);
  const searchParams = useSearchParams();
  const success = searchParams.get("success");

  useEffect(() => {
    const aeroportosSalvos = JSON.parse(localStorage.getItem("aeroporto")) || [];
    setAeroportos(aeroportosSalvos);
  }, []);

  function excluir(id) {
    if (confirm('Deseja realmente excluir o registro?')) {
      const novosAeroportos = aeroportos.filter(item => item.id !== id);
      localStorage.setItem('aeroporto', JSON.stringify(novosAeroportos));
      setAeroportos(novosAeroportos);
    }
  }

  return (
    <Pagina titulo="Aeroportos">
      {success && (
        <Alert variant="success">
          Aeroporto cadastrado com sucesso!
        </Alert>
      )}
      <Link href="/aeroporto/form" className="btn btn-primary mb-3">
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
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {aeroportos.map(item => (
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
              <td>
                <Link href={`/aeroporto/form/${item.id}`}>
                  <FaRegEdit title="Editar" className="text-primary" />
                </Link>
                <MdDelete
                  title="Excluir"
                  className="text-danger"
                  onClick={() => excluir(item.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Pagina>
  );
}
