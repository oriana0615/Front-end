import Link from "next/link";
import { Button } from "react-bootstrap";
import Cabecalho from "./components/Cabecalho";

export default function Home() {
  return (
    <main>
      <Button variant="primary">Primary</Button>{' '}

      <Cabecalho titulo="Oriana" subtitulo="Teste Sub" />
      <Cabecalho titulo="Frontend" />
      <div style={{ marginBottom: '40px' }}>
        <Link href="/cards">Página do Exercício de Cards</Link>
      </div>
      <div>
        <Link href="/fundamentos">Página Fundamentos</Link>
      </div>

    </main>
  );
}
