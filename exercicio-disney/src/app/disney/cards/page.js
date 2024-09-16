'use client'

import Pagina from "@/app/components/Pagina"
import apiDisney from "@/services/apiDisney"
import { useState } from "react"
import { Button, Card, Col, Row } from "react-bootstrap"

export default function Cards() {

    /*aqui estou usando o useState, um hook do React para
    manipulação de dados, isso me permite adicionar informações
    aos meus componentes React */
    
    /*Para iniciar crio uma const com princesa, que será preenchida por
    minha função setPrincesas, e meu useState() é usado para definir um estado
    inicial com um valor padrão, posso deixar vazio, ou iniciar com algo,
    neste caso iniciei com um array vazio, já que vou estar manipulando dados
    de um array
    */
    const [princesas, setPrincesas] = useState([]) //preciso importar o useState

    
    /*Abaixo tenho minha função de get para pegar
    para pegar dados do endereço da apiDisney em services/apiDisney, preciso importar,
    o /character é parte do endereço principal que foi colocado em apiDisney
    */

    apiDisney.get('/character').then(resultado => {
        /*Se der certo armazeno o resultado em minha função setPrincesas, que por sua vez irá armazenar dados
        na minha constante princesas*/
        setPrincesas(resultado.data.data) //data.data é como acesso o array de objetos da disney, o resultado está ali para acessas os dados de data.data
    })

    return (


        <>

            <Pagina titulo='Disney Cards'>

                {/*Row serve para construir minhas linhas, é como uma tabela, primeiro preciso das linhas */}
                <Row md={3}>
                    
                    {/*O map que vou usar para percorrer o Array princesas que formei com dados da api da Disney */}

                    { /*    { princesas.map(item => () ) }   */}
                    
                    {princesas.map(item => (
                    
                    /*Col representa minhas colunas, está dentro do map para as minhas colunas
                    item sendo preenchidas dinâmicamente enquanto o meu loop map percorrer o
                    array de objetos da disney
                    */
                    
                    //Para cada primeiro elemento do meu loop coloco key = {id} para não dar erro, não é um erro impeditivo, vai funcionar sem isso, mas fará performar melhor

                    <Col key={item._id}> {/*Acesso os itens da mesma forma que acesso em objetos, no caso
                    estou usando item, porque o item está percorrendo o meu array de objetos. */}

                        

                            <Card style={{ maxWidth:'250'}}>
                                <Card.Img variant="top" src={item.imageUrl} />
                                <Card.Body>
                                    <Card.Title>{item.name}</Card.Title>
                                    <Card.Text>
                                        {item.tvShows}<br/>
                                        {item.createdAt}<br/>
                                        {item.updatedAt}<br/>
                                    </Card.Text>
                                    <Button variant="primary">Go somewhere</Button>
                                </Card.Body>
                            </Card>


                            </Col>

                        ))}




                   



                </Row>





            </Pagina>









        </>






    )



}
