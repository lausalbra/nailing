import { useRef, useState, useEffect } from "react"
import { json_provincias } from '../Filter/provincias'
import { putData, postData } from '../../services/common/common'
import { useLocation } from 'wouter'
import Select from 'react-select';


export function CentroEditForm({ id }) {

  //Obtengo usuario desencriptado
  var cryptoJS = require("crypto-js");
  const user = JSON.parse(cryptoJS.AES.decrypt(sessionStorage.getItem("userEncriptado"), "NAILING").toString(cryptoJS.enc.Utf8))

  const url = "https://nailingtest.herokuapp.com/centros/show/" + id;
  const xhr = new XMLHttpRequest()
  const [resObj, setObj] = useState([])
  const [locationPath, locationPush] = useLocation()
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

  const oldNombre = resObj.nombre
  const oldImagen = resObj.imagen
  const oldProvincia = resObj.provincia
  const oldAperturaAM = resObj.aperturaAM
  const oldCierreAM = resObj.cierreAM
  const oldAperturaPM = resObj.aperturaPM
  const oldCierrePM = resObj.cierrePM

  const nombre = useRef()
  const imagen = useRef()
  const provincia = useRef()
  const aperturaam = useRef()
  const cierream = useRef()
  const aperturapm = useRef()
  const cierrepm = useRef()

  const [stateProvincia, changeStateProvincia] = useState("")
  const [stateHoras, changeStateHora] = useState("")

  async function handleSubmit(evt) {
    evt.preventDefault()

    const url2 = "https://nailingtest.herokuapp.com/centros/edit"
    const body = {
      "id": id,
      "nombre": nombre.current.value == "" ? (oldNombre) : (nombre.current.value),
      "imagen": imagen.current.value == "" ? (oldImagen) : (imagen.current.value),
      "provincia": provincia.current.value == "" ? (oldProvincia) : (provincia.current.value),
      "aperturaAM": aperturaam.current.value == "" ? (oldAperturaAM) : (aperturaam.current.value),
      "cierreAM": cierream.current.value == "" ? (oldCierreAM) : (cierream.current.value),
      "aperturaPM": aperturapm.current.value == "" ? (oldAperturaPM) : (aperturapm.current.value),
      "cierrePM": cierrepm.current.value == "" ? (oldCierrePM) : (cierrepm.current.value),
      "suscripcion": resObj.suscripcion,
    }
    const headers = {
      "Content-Type": "application/json",
      "Authorization": "Basic " + btoa(user.usuario + ":" + user.contrasenya)
    }
    const provinciaConfirmada = confirmProvincia(provincia.current.value, json_provincias)
    const horasConfirmadas = confirmHoras(aperturaam.current.value) && confirmHoras(cierream.current.value) && confirmHoras(aperturapm.current.value) && confirmHoras(cierrepm.current.value)
    if (horasConfirmadas && provinciaConfirmada) {
      await putData(url2, body, headers)
        .then(async function (response) {
          await postData(url2, body, headers)
            .then(function (data) {
              locationPush('/cita');
              alert("Centro actualizado con éxito")
            }
            )
        })
        .catch((e) => {
          console.log(e)
        })
    }


    console.log(body)
  }

  function confirmProvincia(provincia2, provincias) {
    var array = provincias.filter(x => x.label === provincia2)
    const result = array.length != 0 || provincia2 == ""
    if (!result) {
      changeStateProvincia("Provincia no válida")
    } else {
      changeStateProvincia("")
    }
    return result
  }

  function confirmHoras(hora) {
    let regex = new RegExp(/[0-2]\d:[0-5]\d:[0-5]\d/)
    const result = hora.match(regex) || hora == ""
    if (!result) {
      changeStateHora("Formato de hora no válido")
    } else {
      changeStateHora("")
    }
    return result

  }

  return (
    <>
      <form className='grid border-2 border-pink-300 p-5 rounded-md' onSubmit={handleSubmit} >
        <label className='text-lg' htmlFor="nombre"> Nombre:</label>
        <input className="border-black border-2  rounded-sm mb-4" name="nombre" type="text" ref={nombre} placeholder={oldNombre} />
        <label className='text-lg' htmlFor="imagen">   Imagen:</label>
        <input className="border-black border-2 mb-4 rounded-sm" name="imagen" type="text" ref={imagen} placeholder={oldImagen} />
        <label className='text-lg' htmlFor="provincia">   Provincia:</label>
        <input className="border-black border-2 mb-4 rounded-sm" name="provincia" type="text" ref={provincia} placeholder={oldProvincia} />
        {/* <Select options={json_provincias} 
                    value={this.selected}
                    onChange={this.handleChange}
                    ref={provincia}
                    
                    theme={(theme) => ({
                    ...theme,
                    borderRadius: 3,
                    colors: {
                        ...theme.colors,
                        primary25: '#E9BEEE', //HOVER
                        primary50: '#F39EEC', //CLICK
                        primary: '#F39EEC',   //BORDE, SELECCIONADO
                    },
                    })}
                    placeholder='Seleccione una provincia'/> */}
        <p className="text-sm text-red-600" >{stateProvincia}</p>
        <label className='text-lg' htmlFor="aperturaam">   Hora de apertura horario de mañana:</label>
        <input className="border-black border-2 mb-4 rounded-sm" name="aperturaAM" type="text" ref={aperturaam} placeholder={oldAperturaAM} />
        <label className='text-lg' htmlFor="cierream">  Hora de cierre horario de mañana:</label>
        <input className="border-black border-2 mb-4 rounded-sm" name="cierreAM" type="text" ref={cierream} placeholder={oldCierreAM} />
        <label className='text-lg' htmlFor="aperturapm">   Hora de apertura horario de tarde:</label>
        <input className="border-black border-2 mb-4 rounded-sm" name="aperturaPM" type="text" ref={aperturapm} placeholder={oldAperturaPM} />
        <label className='text-lg' htmlFor="cierrepm">  Hora de cierre horario de tarde:</label>
        <input className="border-black border-2 mb-4 rounded-sm" name="cierrePM" type="text" ref={cierrepm} placeholder={oldCierrePM} />
        <p className="text-sm text-red-600" >{stateHoras}</p>
        <input className="border-black border-2 mb-4 cursor-pointer hover:bg-pink-200 hover:border-pink-200 duration-300 rounded-3xl" type="submit" value="Enviar" />
      </form>
    </>
  )
}