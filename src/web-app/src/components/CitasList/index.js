import React, { useState, useEffect } from 'react'
import { useLocation } from 'wouter'
import { API_URL, RequestManager } from '../../components/RestUtils'
import { Cita } from '../../components/Cita'
import Box from '@mui/material/Box'

export function CitasList () {
  const userId = sessionStorage.getItem('userId')
  const [listCitas, setCitas] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [locationPath, locationPush] = useLocation()
  const url_get = API_URL + '/cita/user/' + userId

  useEffect(() => {
    function callback(citas) {
      setCitas(citas)
    }
    RequestManager(url_get, 'GET', 'CitasList (get)', null, locationPush, callback, null)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function cancelarCita (cita) {
    // eslint-disable-next-line no-restricted-globals
    const accepted = confirm('¿Está seguro de que quiere cancelar su cita en ' + cita.centro.nombre + '?')
    if (accepted) {
      const url_del = API_URL + '/cita/user/' + userId + '/delete/' + cita.id
      locationPush('/delete')
      RequestManager(url_del, 'DELETE', 'CitasList (delete)', '/miscitas', locationPush, null, null)
    }
  }

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '111.1%'}}>
      {listCitas.map((cita) => (
        <Cita key={cita.id}
          cita={cita}
          deleteFunc={() => cancelarCita(cita)}
        />
      ))}
    </Box>
  )
}
