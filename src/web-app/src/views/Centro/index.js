import React, { useState, useEffect } from 'react';
import { CenterDetails } from '../../components/CenterDetails';
import { Nombre } from '../../components/Nombre';
import { Header } from "../../components/Header"
import { useLocation } from 'wouter'

export function Centro({ params }) {

    const { id } = params
    const url = "https://nailing-sprint3.herokuapp.com/centros/show/"+id;
    const xhr = new XMLHttpRequest()
    const [resObj, setObj] = useState([])
    const [locationPath, locationPush] = useLocation()
    console.log(locationPath);
    useEffect(() => {
        xhr.open('get', url)
        xhr.send()
        xhr.onload = function () {
          if (this.status === 200) {
            try {
              setObj(JSON.parse(this.responseText))
              console.log('Petición Rest exitosa')
            } catch (e) {
              console.warn('Excepción capturada en la petición REST')
              sessionStorage.setItem(e)
              locationPush('/error')
            }
          } else {
            console.warn('Error en la petición REST')
            sessionStorage.setItem("La API Rest (" + url + ") ha devuelto el error " + this.status)
            locationPush('/error')
          }
        }
      }, []);
    
    if (resObj !==null) sessionStorage.setItem("DiasDisponibles", resObj.diasDisponible)
    return (
        <>
            <Header />
            <Nombre name={resObj.nombre} ></Nombre>
            <CenterDetails centro={resObj}  ></CenterDetails>

        </>
    )
}