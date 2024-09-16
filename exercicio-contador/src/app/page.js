'use client'
import Link from "next/link";
import { Button } from "react-bootstrap";
import Cabecalho from "./components/Cabecalho";
import Pagina from "./components/Pagina";

export default function Home() {
  return (
    <>
    <Pagina titulo="Fundamentos"></Pagina>
      <Button variant="primary">Primary</Button>{' '}

      <Cabecalho titulo="Oriana" subtitulo="Teste Sub" />
      <Cabecalho titulo="Frontend" />
      <Cabecalho titulo="Cabeçalho" />
      <Cabecalho titulo="React" />

      <Link href="/fundamentos">Página Fundamentos</Link><br />
      <Link href="/cards">Página do Exercício de Cards</Link><br />

    </>
  );
}
