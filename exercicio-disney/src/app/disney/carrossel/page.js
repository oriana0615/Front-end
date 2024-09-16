'use client'

import Pagina from "@/app/components/Pagina"
import apiDisney from "@/services/apiDisney"
import { useState } from "react"
import { Carousel, Image } from "react-bootstrap"



export default function Carrossel() {

    const [princesas, setPrincesas] = useState([])

    apiDisney.get('/character').then(resultado => (

        setPrincesas(resultado.data.data)
    ))


    return (

        <>
             <Pagina titulo="Disney Carrossel">
      <Carousel interval={3000}>
        
        {/*Coloquei só a imagem dentro do loop, assim não forma vários carroseis ao memos tempo,
        dentro do loop só coloco a parte que quero repetir */}

        {princesas.map((item) => (
          <Carousel.Item key={item._id}>
            
            <Image
              src={item.imageUrl}
              alt={item.name}
              style={{ width: '450px',  height: 'auto',  margin: '0 auto', display: 'block'  
              }}
            />

            <Carousel.Caption>
              <h3>{item.name}</h3>
              <p>{item.description || 'Descrição não disponível.'}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </Pagina>


        </>




    )
}