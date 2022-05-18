import { useRef, useState, useEffect } from "react"
import { json_provincias } from '../Filter/provincias'
import { putData, postData } from '../../services/common/common'
import { useLocation } from 'wouter'
import Select from 'react-select';

export function CentroEditForm({id}) {
  const [locationPath, locationPush] = useLocation()
  console.log(locationPath);
  if (sessionStorage.getItem("userEncriptado") === null || sessionStorage.getItem("userEncriptado") === ""){
    locationPush('/error');
  }

  //Obtengo usuario desencriptado
  var cryptoJS = require("crypto-js");
  const user = JSON.parse(cryptoJS.AES.decrypt(sessionStorage.getItem("userEncriptado"), "NAILING").toString(cryptoJS.enc.Utf8))
  
  const url = "https://nailing-sprint4.herokuapp.com/centros/show/"+id;
  const xhr = new XMLHttpRequest()
  const [resObj, setObj] = useState([])

  if (user.rol === "OWNER"){
    if(id !== user.centro.id.toString()){
      locationPush('/error');
    }
  }

  if (user.rol === "USER"){
    locationPush('/error');
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
  }, []);

  const oldNombre=resObj.nombre
  const oldImagen=resObj.imagen
  const oldProvincia=resObj.provincia
  const oldLocalidad = resObj.localidad;
  const oldDireccion = resObj.direccion;
  const oldAperturaAM=resObj.aperturaAM
  const oldCierreAM=resObj.cierreAM
  const oldAperturaPM=resObj.aperturaPM
  const oldCierrePM=resObj.cierrePM
  const oldDias=resObj.diasDisponible

  const nombre = useRef()
  const imagen = useRef()
  const provincia = useRef()
  const localidad = useRef()
  const direccion = useRef()
  const aperturaam = useRef()
  const cierream = useRef()
  const aperturapm = useRef()
  const cierrepm = useRef()
  const optionsDias = [
    { value: "MONDAY", label: "Lunes" },
    { value: "TUESDAY", label: "Martes" },
    { value: "WEDNESDAY", label: "Miércoles" },
    { value: "THURSDAY", label: "Jueves" },
    { value: "FRIDAY", label: "Viernes" },
    { value: "SATURDAY", label: "Sábado" },
    { value: "SUNDAY", label: "Domingo" },
  ]

  const [oldOptionsDias, changeStateOldOptionsDias] = useState("")
  const [opcionesHechas, changeStateOpcionesHechas] = useState(false)
  if(oldDias!=null && !opcionesHechas){
    changeStateOldOptionsDias(optionsDias.filter(d => oldDias.includes(d.value)))
    changeStateOpcionesHechas(true)
  }

  const [stateProvincia, changeStateProvincia] = useState("")
  const [stateHoras, changeStateHora] = useState("")
  const [stateImagen, changeStateImagen] = useState("")
  const [stateDiasApertura, changeStateDiasApertura] = useState(optionsDias)

  async function handleSubmit(evt) {
    evt.preventDefault()

    let diasString
    stateDiasApertura.map((dia) => {
        diasString += `,${dia.value}`;
        return diasString
    })
    diasString = diasString.slice(10, diasString.length)
    console.log(diasString)

    try{
      console.log(provincia.current.getValue[0].value)
    }catch{
      changeStateProvincia("Inserta una provincia")
    }
    const url2 = "https://nailing-sprint4.herokuapp.com/centros/edit"
    const body = {
        "id": id,
        "nombre": nombre.current.value,
        "imagen": imagen.current.value,
        "provincia": provincia.current.getValue()[0].value,
        "localidad": localidad.current.value,
        "direccion": direccion.current.value,
        "aperturaAM": aperturaam.current.value,
        "cierreAM": cierream.current.value,
        "aperturaPM": aperturapm.current.value,
        "cierrePM": cierrepm.current.value,
        "diasDisponible": diasString,
        "suscripcion": resObj.suscripcion,
        "creditosrestantes": resObj.creditosrestantes,
        "ultimaSuscripcion": resObj.ultimaSuscripcion,
        "pagado": resObj.pagado,
        "valoracionMedia": resObj.valoracionMedia,
        "valoracionTotal": resObj.valoracionTotal,
        "numValoraciones": resObj.numValoraciones
    }
    const headers = {
        "Content-Type": "application/json",
        "Authorization": "Basic " + btoa(user.usuario + ":" + user.contrasenya)
    }
    const provinciaConfirmada = confirmProvincia(provincia.current.getValue()[0].value, json_provincias)
    const horasConfirmadas = confirmHoras(aperturaam.current.value) && confirmHoras(cierream.current.value) && confirmHoras(aperturapm.current.value) && confirmHoras(cierrepm.current.value)
    const horasConfirmadasIncongruencias = confirmHorasIncongruencias(aperturaam.current.value, cierream.current.value, aperturapm.current.value, cierrepm.current.value);
    const imagenConfirmada = confirmImage(imagen.current.value)
    if(horasConfirmadas && provinciaConfirmada && imagenConfirmada && horasConfirmadasIncongruencias){
      await putData(url2, body, headers)
      .then(async function (_response) {
        await postData(url2, body, headers)
        .then(function (_data) {
          locationPush('/cita');
          alert("Centro actualizado con éxito")
        })
      })
      .catch((e) => {
        console.log(e)
      })
    }
    

  console.log(body)
  }

  function confirmProvincia(provincia2, provincias) {
      var array = provincias.filter(x => x.label === provincia2)
      const result = array.length!==0 || provincia2===""
      if (!result) {
          changeStateProvincia("Provincia no válida")
      } else {
          changeStateProvincia("")
      }
      return result
  }

  function confirmHoras(hora) {
    let regex = new RegExp(/[0-2]\d:[0-5]\d:[0-5]\d/)
    const result = hora.match(regex) || hora===""
    if (!result) {
      changeStateHora("Formato de hora no válido")
    } else {
      changeStateHora("")
    }
    return result;
  }

  function confirmHorasIncongruencias(aperturaAM, cierreAM, aperturaPM, cierrePM) {
    var aperturaAMDate = new Date('0000-01-01 ' + aperturaAM);
    var cierreAMDate = new Date('0000-01-01 ' + cierreAM);
    var aperturaPMDate = new Date('0000-01-01 ' + aperturaPM);
    var cierrePMDate = new Date('0000-01-01 ' + cierrePM);
    const result1 = aperturaAMDate < cierreAMDate && aperturaAMDate < aperturaPMDate && aperturaAMDate < cierrePMDate;
    const result2 = cierreAMDate < aperturaPMDate && cierreAMDate < cierrePMDate;
    const result3 = aperturaPMDate < cierrePMDate;
    if (!result1) {
        changeStateHora("La hora de apertura de por la mañana debe ser anterior a todas las demás");
    } else if (!result2){
        changeStateHora("La hora de cierre de por la mañana debe ser anterior a las horas de la tarde");
    } else if (!result3){
        changeStateHora("La hora de apertura de tarde debe ser anterior a la de cierre de tarde");
    } else {
        changeStateHora("")
    }
    return result1 && result2 && result3
}
    
  function confirmImage(image) {
    const result = image.includes("https://");
    if (!result){
        changeStateImagen("Formato de imagen invalido, debe ser una URL");
    } else {
        changeStateImagen("");
    }
    return result;
  }

  const handleChangeDiasApertura = (value) => {
    changeStateDiasApertura(value);
    changeStateOldOptionsDias(value);
    console.log(value);
  }

    return (
        <>
            <form className='grid border-2 border-pink-300 p-5 rounded-md' onSubmit={handleSubmit} >
                <label className='text-lg' htmlFor="nombre"> Nombre:</label>
                <input className="border-black border-2  rounded-sm mb-4" name="nombre" type="text" ref={nombre} defaultValue={oldNombre} required/>
                <label className='text-lg' htmlFor="imagen">   Imagen:</label>
                <input className="border-black border-2 mb-4 rounded-sm" name="imagen" type="text" ref={imagen} defaultValue={oldImagen} required/>
                <p className="text-sm text-red-600" >{stateImagen}</p>
                <label className='text-lg' htmlFor="provincia">   Provincia:</label>
                <Select className="border-black border-2 mb-4 rounded-sm" name="provincia" options={json_provincias} ref={provincia} isSearchable={false} />
                <p className="text-sm text-red-600" >{stateProvincia}</p>
                <label className='text-lg' htmlFor="localidad"> Localidad:</label>
                <input className="border-black border-2  rounded-sm mb-4" name="localidad" type="text" ref={localidad} defaultValue={oldLocalidad} required/>
                <label className='text-lg' htmlFor="direccion"> Dirección:</label>
                <input className="border-black border-2  rounded-sm mb-4" name="direccion" type="text" ref={direccion} defaultValue={oldDireccion} required/>
                <label className='text-lg' htmlFor="name">Días de apertura:</label>
                <Select className="border-black border-2 mb-4 rounded-sm"
                    required
                    isMulti
                    value={oldOptionsDias}
                    options={optionsDias}
                    onChange={handleChangeDiasApertura}
                />
                <label className='text-lg' htmlFor="aperturaam">   Hora de apertura horario de mañana:</label>
                <input className="border-black border-2 mb-4 rounded-sm" name="aperturaAM" type="text" ref={aperturaam} defaultValue={oldAperturaAM} required/>
                <label className='text-lg' htmlFor="cierream">  Hora de cierre horario de mañana:</label>
                <input className="border-black border-2 mb-4 rounded-sm" name="cierreAM" type="text" ref={cierream} defaultValue={oldCierreAM} required/>
                <label className='text-lg' htmlFor="aperturapm">   Hora de apertura horario de tarde:</label>
                <input className="border-black border-2 mb-4 rounded-sm" name="aperturaPM" type="text" ref={aperturapm} defaultValue={oldAperturaPM} required/>
                <label className='text-lg' htmlFor="cierrepm">  Hora de cierre horario de tarde:</label>
                <input className="border-black border-2 mb-4 rounded-sm" name="cierrePM" type="text" ref={cierrepm} defaultValue={oldCierrePM} required/>
                <p className="text-sm text-red-600" >{stateHoras}</p>
                <p className="text-sm text-red-600" >{stateDiasApertura.length === 0 ? "Debe seleccionar al menos un día de apertura" : ""}</p>
                <input className="border-black border-2 mb-4 cursor-pointer hover:bg-pink-200 hover:border-pink-200 duration-300 rounded-3xl" type="submit" value="Enviar" />
            </form>
        </>
    )
}