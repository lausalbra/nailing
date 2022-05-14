import React, { useState, useEffect } from 'react'
import { useLocation } from 'wouter'
import { API_URL, RequestManager } from '../../components/RestUtils'
import { CitaCentro } from '../../components/CitaCentro'
import Box from '@mui/material/Box'

export function CitaCentroList() {
  //Obtengo usuario desencriptado
  var cryptoJS = require("crypto-js");
  const user = JSON.parse(cryptoJS.AES.decrypt(sessionStorage.getItem("userEncriptado"), "NAILING").toString(cryptoJS.enc.Utf8))
  //TEMPORAL
  const citas = [{"id":1,"coste":41.0,"horaInicio":"2022-09-24T09:00:00","horaFin":"2022-09-24T09:30:00","decoracion":null,"acabado":null,"base":null,"tipo":null,"disenyo":null,"tamanyo":null,"forma":null,"usuario":{"id":3,"usuario":"usuario3","contrasenya":"$2a$10$j1Hf5sGGzYxpk8uswYmMauU9FaTMYGMSjIB0vN2JSbXJsrB2IwQma","email":"email3@email.com","telefono":"555565585","rol":"OWNER","centro":{"id":1,"nombre":"Nails by Claudia","imagen":"https://i.ibb.co/qkFKLsm/F253-E9-DA-6780-4-A9-D-9-EAB-804784-BBEE21.jpg","provincia":"Málaga","localidad":"Málaga","direccion":"Calle Real, 78","aperturaAM":"09:00:00","cierreAM":"13:00:00","aperturaPM":"16:00:00","cierrePM":"21:00:00","diasDisponible":"MONDAY,TUESDAY,WEDNESDAY,THURSDAY,FRIDAY","suscripcion":"BASIC","ultimaSuscripcion":"2022-05-14","creditosrestantes":150,"pagado":true,"valoracionMedia":5.0,"valoracionTotal":5,"numValoraciones":1}},"centro":{"id":1,"nombre":"Nails by Claudia","imagen":"https://i.ibb.co/qkFKLsm/F253-E9-DA-6780-4-A9-D-9-EAB-804784-BBEE21.jpg","provincia":"Málaga","localidad":"Málaga","direccion":"Calle Real, 78","aperturaAM":"09:00:00","cierreAM":"13:00:00","aperturaPM":"16:00:00","cierrePM":"21:00:00","diasDisponible":"MONDAY,TUESDAY,WEDNESDAY,THURSDAY,FRIDAY","suscripcion":"BASIC","ultimaSuscripcion":"2022-05-14","creditosrestantes":150,"pagado":true,"valoracionMedia":5.0,"valoracionTotal":5,"numValoraciones":1}},{"id":2,"coste":41.0,"horaInicio":"2022-09-24T09:35:00","horaFin":"2022-09-24T10:05:00","decoracion":null,"acabado":null,"base":null,"tipo":null,"disenyo":null,"tamanyo":null,"forma":null,"usuario":{"id":4,"usuario":"usuario4","contrasenya":"$2a$10$34dultkTGo8WJ9gYqK4yreMtTg3n4Dbt95T330YAE1Y342wrJfHMG","email":"email4@email.com","telefono":"555565589","rol":"OWNER","centro":{"id":2,"nombre":"Más guapa que la novia","imagen":"https://i.ibb.co/WP2MvVS/867-F548-A-5074-4-C98-AE6-D-F48083-CEE8-E9.jpg","provincia":"Sevilla","localidad":"Sevilla","direccion":"Calle Sierpes, 24","aperturaAM":"08:30:00","cierreAM":"13:00:00","aperturaPM":"16:00:00","cierrePM":"20:30:00","diasDisponible":"MONDAY,TUESDAY,WEDNESDAY,THURSDAY,FRIDAY","suscripcion":"ADVANCED","ultimaSuscripcion":"2022-05-14","creditosrestantes":300,"pagado":true,"valoracionMedia":5.0,"valoracionTotal":5,"numValoraciones":1}},"centro":{"id":1,"nombre":"Nails by Claudia","imagen":"https://i.ibb.co/qkFKLsm/F253-E9-DA-6780-4-A9-D-9-EAB-804784-BBEE21.jpg","provincia":"Málaga","localidad":"Málaga","direccion":"Calle Real, 78","aperturaAM":"09:00:00","cierreAM":"13:00:00","aperturaPM":"16:00:00","cierrePM":"21:00:00","diasDisponible":"MONDAY,TUESDAY,WEDNESDAY,THURSDAY,FRIDAY","suscripcion":"BASIC","ultimaSuscripcion":"2022-05-14","creditosrestantes":150,"pagado":true,"valoracionMedia":5.0,"valoracionTotal":5,"numValoraciones":1}},{"id":3,"coste":41.0,"horaInicio":"2022-09-24T08:30:00","horaFin":"2022-09-24T09:00:00","decoracion":null,"acabado":null,"base":null,"tipo":null,"disenyo":null,"tamanyo":null,"forma":null,"usuario":{"id":5,"usuario":"usuario5","contrasenya":"$2a$10$wC8Tyb6TWg1TZABP8gWvPe4eC6oDWnpwOvRc/xqyVIAaVitOACONe","email":"email5@email.com","telefono":"655565589","rol":"OWNER","centro":{"id":3,"nombre":"Nails by Verónica","imagen":"https://i.ibb.co/wdhjNNf/8-DF66-CD3-3-E2-D-4-C37-B96-A-247-E3-D5-B221-B.png","provincia":"Cádiz","localidad":"Rota","direccion":"Calle nueva, 12","aperturaAM":"09:30:00","cierreAM":"13:00:00","aperturaPM":"16:00:00","cierrePM":"21:30:00","diasDisponible":"MONDAY,TUESDAY,WEDNESDAY,THURSDAY,FRIDAY","suscripcion":"PREMIUM","ultimaSuscripcion":"2022-05-14","creditosrestantes":-10,"pagado":true,"valoracionMedia":5.0,"valoracionTotal":5,"numValoraciones":1}},"centro":{"id":2,"nombre":"Más guapa que la novia","imagen":"https://i.ibb.co/WP2MvVS/867-F548-A-5074-4-C98-AE6-D-F48083-CEE8-E9.jpg","provincia":"Sevilla","localidad":"Sevilla","direccion":"Calle Sierpes, 24","aperturaAM":"08:30:00","cierreAM":"13:00:00","aperturaPM":"16:00:00","cierrePM":"20:30:00","diasDisponible":"MONDAY,TUESDAY,WEDNESDAY,THURSDAY,FRIDAY","suscripcion":"ADVANCED","ultimaSuscripcion":"2022-05-14","creditosrestantes":300,"pagado":true,"valoracionMedia":5.0,"valoracionTotal":5,"numValoraciones":1}}]
  const centroId = user.centro.id
  const [listCitas, setCitas] = useState([])
  const locationPush = useLocation()[1]
  const url_get = API_URL + '/cita/list' //+ centroId

  useEffect(() => {
    setCitas(citas)
    /*
    function callback(citas) {
      setCitas(citas)
    }
    RequestManager(url_get, 'GET', 'CitasCentroList (get)', null, locationPush, callback, null)
    */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (listCitas.length === 0 ?
    <>
      <h3 className="text-center m-3 text-2xl">¡Vaya! Parece que no hay ninguna cita reservada.</h3>
      <h3 className="text-center m-3 text-2xl">Asegurese de que haya seleccionado personalizaciones y haya créditos disponibles
        para que los usuarios puedan reservar en su centro.</h3>
       </>
    :
    <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '111.1%' }}>
      {console.log()}
      {listCitas.map((cita) => (
        <CitaCentro key={cita.id}
          cita={cita}
        />
      ))}
    </Box>
  )
}
