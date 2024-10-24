"use client";
import Pagina from "@/app/components/Pagina";
import Link from "next/link";
import { Table, Alert } from "react-bootstrap";
import { FaPlusCircle, FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
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

 
  const formatarPreco = (preco) => {
    const precoNumero = parseFloat(preco); 
    if (isNaN(precoNumero)) {
      return "00.0"; 
    }
    return precoNumero.toFixed(2);
  };

  
  function excluir(id) {
    if (confirm('Deseja realmente excluir a passagem?')) {
      const novasPassagens = passagens.filter(item => item.id !== id);
      localStorage.setItem('passagens', JSON.stringify(novasPassagens));
      setPassagens(novasPassagens);
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
          {passagens.map((passagem) => (
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
    </Pagina>
  );
}
