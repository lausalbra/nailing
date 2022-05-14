import * as React from 'react';
import { useState, useEffect } from "react"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Link, useLocation } from 'wouter'
import { postData } from '../../services/common/common';


export function UserDetails({ image, email, phone }) {
  const [locationPath, locationPush] = useLocation()
  console.log(locationPath);

  //Obtengo usuario desencriptado
  var cryptoJS = require("crypto-js");
  const user = JSON.parse(cryptoJS.AES.decrypt(sessionStorage.getItem("userEncriptado"), "NAILING").toString(cryptoJS.enc.Utf8))

  async function handleClick() {

    const url2 = "https://nailingtest.herokuapp.com/logout"

    const body = {
      "id": user.id,
      "usuario": user.usuario,
      "contrasenya": user.contrasenya,
      "email": user.email,
      "telefono": user.telefono,
      "rol": user.rol
    }

    console.log(body)

    const headers = {
      "Content-Type": "application/json",
      "Authorization": "Basic " + btoa(user.usuario + ":" + user.contrasenya)
    }


    await postData(url2, body, headers)
      .then(function (_data) {
        console.log("bien")

      }
        //Tiene que ir al catch porque devuelve 204 y lo pilla como error
      ).catch((_error) => {

        sessionStorage.setItem("userEncriptado", "")
        sessionStorage.setItem("isLogged", false)

        locationPush('/')
      }
      );
  }
  const centro = user.centro
  const isAdmin = user.rol === 'ADMIN'
  let pagado = null
  let restantesPositivo = null
  const [resObj, setObj] = useState([])
  console.log(resObj);
  const xhr = new XMLHttpRequest()
  var url = "https://nailingtest.herokuapp.com/centros/show/"
  if (centro !== null && centro !== ""){
    url += centro.id.toString();
    restantesPositivo = centro.creditosrestantes >= 0
    pagado = centro.pagado
  }
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
  }, [])

  return (
    <Card style={{ backgroundColor: 'rgb(248, 225, 228)' }} sx={{ minWidth: 275 }}>
      <CardContent style={{marginBottom: "20px"}}>
        <div className="md:flex">
          <div className="ml-5 items-center">
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Teléfono:</strong> {phone}</p>
            {user.rol === "OWNER"?
            <>
            <p><strong>Créditos Restantes:</strong> {user.centro.creditosrestantes}</p>
            <p><strong>Última fecha de pago:</strong> {user.centro.ultimaSuscripcion}</p>
            </>
            :
            <></>
            }
            <div className='text-xl text-left hover:underline'>
              <Link className="text-xl text-pink-400" to='/usuario/edit'>Editar mis datos</Link>
            </div>

          </div>
        </div>
      </CardContent>
      {user.rol === "USER"?
      <CardActions>
        <button onClick={() => locationPush('/miscitas')} className="border-2 border-purple-300 bg-pink-200 text-black w-96 py-3 rounded-md text-1xl font-medium hover:bg-purple-300 transition duration-300">Mis reservas</button>
      </CardActions>
      :
      <></>
      }
      {centro === null && !isAdmin ?
      <CardActions>
      <button onClick={() => locationPush('/centroadd')} className="border-2 border-purple-300 bg-pink-200 text-black w-96 py-3 rounded-md text-1xl font-medium hover:bg-purple-300 transition duration-300">Añadir centro</button>
      </CardActions>
      :
      <></>
      }
      {centro !== null ?
        <CardActions>
          <button onClick={() => locationPush('/servicios')} className="border-2 border-purple-300 bg-pink-200 text-black w-96 py-3 rounded-md text-1xl font-medium hover:bg-purple-300 transition duration-300">Servicios de centro</button>
        </CardActions>
        :
        <></>
      }
      {centro !== null && centro !== "" ?
      <CardActions>
        <button onClick={() => locationPush('/centroedit/' + centro.id)} className="border-2 border-purple-300 bg-pink-200 text-black w-96 py-3 rounded-md text-1xl font-medium hover:bg-purple-300 transition duration-300">Editar información de centro</button>
      </CardActions>
      :
      <></>
      }
      {restantesPositivo===false ?
      <CardActions>
        <button onClick={() => locationPush('/servicios')} className="border-2 border-purple-300 bg-pink-200 text-black w-96 py-3 rounded-md text-1xl font-medium hover:bg-purple-300 transition duration-300">Pagar créditos atrasados</button>
      </CardActions>
      :
      <></>
      }{pagado===false && restantesPositivo===true ?
      <CardActions>
        <button onClick={() => locationPush('/comprarPaquete')} className="border-2 border-purple-300 bg-pink-200 text-black w-96 py-3 rounded-md text-1xl font-medium hover:bg-purple-300 transition duration-300">Pagar suscripción</button>
      </CardActions>
      :
      <></>
      
      }
      <CardActions>
        <button onClick={handleClick} className="border-2 border-purple-300 bg-pink-200 text-black w-96 py-3 rounded-md text-1xl font-medium hover:bg-purple-300 transition duration-300">Cerrar Sesión</button>
      </CardActions>
    </Card>

  );
}
