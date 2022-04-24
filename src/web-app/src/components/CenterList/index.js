import React, { useState, useEffect } from 'react'
import { useLocation } from 'wouter'
import { API_URL, RequestManager } from '../../components/RestUtils'
import { Center } from '../../components/Center'
import { Box } from '@mui/material'


//npm install @mui/icons-material --- npm install @mui/material
export function CenterList({ provincia }) {

  //Obtengo usuario desencriptado
  var cryptoJS = require("crypto-js");

  let user = {}

  if (sessionStorage.getItem("userEncriptado") !== null && sessionStorage.getItem("userEncriptado") !== "") {
    console.log(sessionStorage.getItem("userEncriptado"))
    user = JSON.parse(cryptoJS.AES.decrypt(sessionStorage.getItem("userEncriptado"), "NAILING").toString(cryptoJS.enc.Utf8))
  } else {
    user.rol = "empty"
  }

  const [resObj, setObj] = useState([])
  const locationPush = useLocation()[1]
  const isAdmin = user.rol === 'ADMIN'
  const url = API_URL + '/centros/list'

  useEffect(() => {
    function callback(centros) {
      setObj(centros)
    }
    RequestManager(url, 'GET', 'CenterList', null, locationPush, callback, null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function borrarCentro(centro) {
    // eslint-disable-next-line no-restricted-globals
    const accepted = confirm('¿Está seguro de que quiere borrar el centro ' + centro.nombre + '?')
    if (accepted) {
      const url_del = API_URL + '/centros/delete/' + centro.id
      locationPush('/delete')
      RequestManager(url_del, 'DELETE', 'CenterList (delete)', '/centro', locationPush, null, null)
    }
  }

  let filtrado = []
  if (!provincia || provincia === 'ninguna') {
    filtrado = resObj
  } else {
    filtrado = resObj.filter(c => c.provincia === provincia)
  }

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '111.1%' }}>
      {filtrado.map((center) => (
        <Center key={center.id}
          center={center}
          isAdmin={isAdmin}
          detailsFunc={() => locationPush('/centrodetalle/' + center.id)}
          editFunc={() => locationPush('/centroedit/' + center.id)}
          deleteFunc={() => borrarCentro(center)}
        />
      ))}
    </Box>
  )
}
