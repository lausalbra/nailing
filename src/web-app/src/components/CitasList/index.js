import React, { useState, useEffect } from 'react'
import { useLocation } from 'wouter'
import { API_URL, RequestManager } from '../../components/RestUtils'
import { Cita } from '../../components/Cita'
import Box from '@mui/material/Box'

export function CitasList() {
  //Obtengo usuario desencriptado
  var cryptoJS = require("crypto-js");
  const user = JSON.parse(cryptoJS.AES.decrypt(sessionStorage.getItem("userEncriptado"), "NAILING").toString(cryptoJS.enc.Utf8))

  const userId = user.id
  const [listCitas, setCitas] = useState([])
  const locationPush = useLocation()[1]
  const url_get = API_URL + '/cita/user/' + userId

  useEffect(() => {
    function callback(citas) {
      citas = citas.filter(cita => Date.parse(cita.horaInicio) - Date.now() >= 0);
      setCitas(citas)
    }
    RequestManager(url_get, 'GET', 'CitasList (get)', null, locationPush, callback, null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function cancelarCita(cita) {
    // eslint-disable-next-line no-restricted-globals
    var diff = Date.parse(cita.horaInicio) - Date.now();
    if (diff <= 86400000) {
      window.alert("Esta cita es en 24 horas o menos. Ya no se puede cancelar");
    }
    else {
      const accepted = window.confirm('¿Está seguro de que quiere cancelar su cita en ' + cita.centro.nombre + '?')
      if (accepted) {
        const url_del = API_URL + '/cita/user/' + userId + '/delete/' + cita.id
        locationPush('/delete')
        RequestManager(url_del, 'DELETE', 'CitasList (delete)', '/miscitas', locationPush, null, null)
      }
    }
  }

  return (listCitas.length === 0 ?
    <>
      <h3 className="text-center m-3 text-2xl">¡Vaya! Parece que no ha reservado ninguna cita.</h3>
      <div className="text-center m-2">
        <button onClick={() => locationPush('/cita')} class="border-2 border-purple-300 bg-pink-200 text-black w-96 py-3 rounded-md text-1xl font-medium hover:bg-purple-300 transition duration-300">Realizar una reserva</button>
   
      </div>
       </>
    :
    <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '111.1%' }}>
      {console.log()}
      {listCitas.map((cita) => (
        <Cita key={cita.id}
          cita={cita}
          deleteFunc={() => cancelarCita(cita)}
        />
      ))}
    </Box>
  )
}

function diff_hours(dt2, dt1) 
{
  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
  diff /= (60 * 60);
  return Math.abs(Math.round(diff));
}
