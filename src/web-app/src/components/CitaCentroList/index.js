import React, { useState, useEffect } from 'react'
import { useLocation } from 'wouter'
import { API_URL, RequestManager } from '../../components/RestUtils'
import { CitaCentro } from '../../components/CitaCentro'
import Box from '@mui/material/Box'

export function CitaCentroList() {
  //Obtengo usuario desencriptado
  var cryptoJS = require("crypto-js");
  const user = JSON.parse(cryptoJS.AES.decrypt(sessionStorage.getItem("userEncriptado"), "NAILING").toString(cryptoJS.enc.Utf8))
  const userId = user.id
  const centroId = user.centro.id
  const [listCitas, setCitas] = useState([])
  const locationPush = useLocation()[1]
  const url_get = API_URL + '/cita/centro/' + centroId  + '/' + userId

  useEffect(() => {
    function callback(citas) {
      setCitas(citas)
    }
    RequestManager(url_get, 'GET', 'CitasCentroList (get)', null, locationPush, callback, null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (listCitas.length === 0 ?
    <>
      <h3 className="text-center m-3 text-2xl">¡Vaya! Parece que no hay ninguna cita reservada.</h3>
      <h3 className="text-center m-3 text-2xl">Asegurese de que haya seleccionado personalizaciones y haya créditos disponibles
        para que los usuarios puedan reservar en su centro.</h3>
       </>
    :
    <>
    <h2 className="text-center m-3 text-3xl">Reservas para {user.centro.nombre}</h2>
    <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '111.1%' }}>
      {console.log()}
      {listCitas.map((cita) => (
        <CitaCentro key={cita.id}
          cita={cita}
        />
      ))}
    </Box>
    </>
  )
}
