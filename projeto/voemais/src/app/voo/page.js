"use client"; 

import Pagina from "@/app/components/Pagina";
import Link from "next/link";
import { Table, Alert } from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const [voos, setVoos] = useState([]);
  const searchParams = useSearchParams();
  const success = searchParams.get("success");

  useEffect(() => {
    const voosSalvos = JSON.parse(localStorage.getItem("voos")) || [];
    setVoos(voosSalvos);
  }, []);

  // Função para formatar a data no formato DD/MM/YYYY HH:MM
  const formatarData = (data) => {
    const dataObj = new Date(data);
    const dia = String(dataObj.getDate()).padStart(2, '0');
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0'); // Meses começam em 0
    const ano = dataObj.getFullYear();
    const horas = String(dataObj.getHours()).padStart(2, '0');
    const minutos = String(dataObj.getMinutes()).padStart(2, '0');
    return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
  };

  return (
    <Pagina titulo="Lista de Voos">
      {success && (
        <Alert variant="success">
          Voo cadastrado com sucesso!
        </Alert>
      )}
      <Link href="/voo/create" className="btn btn-primary mb-3">
        <FaPlusCircle /> Novo Voo
      </Link>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Internacional</th>
            <th>Identificador</th>
            <th>Data Check-in</th>
            <th>Data Embarque</th>
            <th>ID Origem</th>
            <th>ID Destino</th>
            <th>Empresa ID</th>
            <th>Preço</th>
          </tr>
        </thead>

        <tbody>
          {voos.map((item, index) => (
            <tr key={item.identificador}>
              <td>{index + 1}</td>
              <td>{item.internacional ? "Sim" : "Não"}</td>
              <td>{item.identificador}</td>
              <td>{formatarData(item.data_checkin)}</td>
              <td>{formatarData(item.data_embarque)}</td>
              <td>{item.id_origem}</td>
              <td>{item.id_destino}</td>
              <td>{item.empresa_id}</td>
              <td>R${parseFloat(item.preco).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Pagina>
  );
}
