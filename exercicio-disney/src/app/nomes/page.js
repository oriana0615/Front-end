
'use client'
import Pagina from "@/app/components/Pagina";
import { useState } from "react";
import { Button } from "react-bootstrap";

export default function Page() {

    //A linha de código abaixo procura o "nome" em todo meu código para mudar com a função setNome, o userState precisa ser importado
    const [nome, setNome] = useState('Oriana')

    function alterarNome() { 
                     //If ternário, se Oriana for verdadeiro, mude o nome para Oriana Carolina Salazar, se for falso, deixe 'Oriana'                        
           const novoNome =  nome == 'Oriana'  ? 'Oriana Carolina Salazar' : 'Oriana'
           
           setNome(novoNome)
    }

    return (
        <>
            <Pagina titulo='Titulo'></Pagina>
             <h1>{nome}</h1>
             {/*Chamo minha função de alterar nome ao clicar no meu botão*/}
            <Button onClick={alterarNome}>Alterar Nome</Button>
        </>
    )

}

