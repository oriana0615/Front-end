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

        
             <Pagina titulo="Disney Carrossel">
             <Carousel className="mt-3" style={{width: 800}}>
        

        {princesas.map((item) => (
          <Carousel.Item key={item._id}>
            
            <img className="d-block auto" width={700} height={350} src={item.imageUrl} />
                        <Carousel.Caption>
                            <h3>{item.name}</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
         
      
      </Carousel>
    </Pagina>






    )
}