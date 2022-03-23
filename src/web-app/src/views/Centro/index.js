import React, { useState, useEffect } from 'react';
import { CenterDetails } from '../../components/CenterDetails';
import { Nombre } from '../../components/Nombre';
import { Header } from "../../components/Header"

export function Centro({ params }) {

    const { id } = params
    const url = "https://nailingtest.herokuapp.com/centros/details/"+id;
    const xhr = new XMLHttpRequest()
    const [resObj, setObj] = useState([])
    useEffect(() => {
        xhr.open('get', url)
        xhr.send()
        xhr.onload = function () {
          if (this.status === 200) {
            try {
              setObj(JSON.parse(this.responseText))
              console.log('LLAMADA A LA API EXITOSA')
            } catch (e) {
              console.warn('No se pudo parsear Manin. Hit.')
            }
          } else {
            console.warn('No se recive un 200 Manin. Hit.')
          }
        }
      }, [])

    return (
        <>
            <Header />
            <Nombre name={resObj.nombre} ></Nombre>
            <CenterDetails image={resObj.imagen} provincia={resObj.provincia} rating={'3'}  ></CenterDetails>

        </>
    )
}