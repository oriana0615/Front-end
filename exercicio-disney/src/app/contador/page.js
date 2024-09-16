
'use client'
import Pagina from "@/app/components/Pagina";
import { useState } from "react";
import { Button } from "react-bootstrap";

export default function Page() {

    let [numero, setNumero] = useState(0)

    const contador = 1

    function alterarNumero() {

        {/*Para atualizações em tempo real precisamos coloca todo cálculo dentro do setNumero()*/ }
        setNumero(numero + contador)


    }

    function alterarNumero2() {

        setNumero(numero - contador)


    }

    return (
        <>
            <Pagina titulo='Titulo'></Pagina>
            <h1>{numero}</h1>

            {/*Funçõs em jsx não são chamadas com o parantese no final alterarNumero(), são chamadas assim: alterarNumero */}
            <Button onClick={alterarNumero}>+</Button>
            <Button onClick={alterarNumero2}>-</Button>
        </>

    )

}