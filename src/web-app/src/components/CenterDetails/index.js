import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import SlidingPane from "../../components/SlidingPane/index.tsx";
import PropertyPanel from "../../components/PropertyPanel/index.js";
import { Rating, } from "@mui/material";
import { getData, postData, putData } from '../../services/common/common'
import $ from 'jquery';


export function CenterDetails({centro}) {

  //Obtengo usuario desencriptado
  var cryptoJS = require("crypto-js");
  var user = null;
  if (sessionStorage.getItem("userEncriptado") !== null && sessionStorage.getItem("userEncriptado") !== ""){
    user = JSON.parse(cryptoJS.AES.decrypt(sessionStorage.getItem("userEncriptado"), "NAILING").toString(cryptoJS.enc.Utf8))
  }
  
  const [rating, setRating] = React.useState(centro.valoracionMedia);
  const [ratingBoolean, setRatingBoolean] = React.useState(false);
  
  const name = centro.nombre
  const image = centro.imagen
  const provincia = centro.provincia
  const localidad = centro.localidad;
  const direccion = centro.direccion;
  if(rating!=centro.valoracionMedia){
    setRating(centro.valoracionMedia)
    setRatingBoolean(true)

  }
  const aperturaAM = centro.aperturaAM
  const cierreAM = centro.cierreAM
  const aperturaPM = centro.aperturaPM
  const cierrePM = centro.cierrePM

  const [state, setState] = useState({
    isPaneOpen: false,
    id: "",
    name: "",
    buttons: [],
  })

  const centreId = window.location.pathname.split('/')[2];

  useEffect(() => {
    if (state.id !== "" && state.buttons.length === 0) {
      if (user.usuario == null) {
        alert("Debe estar logeado")
        setState({ isPaneOpen: false, id: '', name: name, buttons: [] })
      }
      else if (user.rol === "OWNER"){
        alert("Acceda como usuario normal, su cuenta es de dueño de centro")
        setState({ isPaneOpen: false, id: '', name: name, buttons: [] })
      }
      else {
        console.log("Llamada a tipos")
        $.ajax({
          method: "GET",
          headers: {
            "Authorization": "Basic " + btoa(user.usuario + ":" + user.contrasenya)
          },
          url: "https://nailing-sprint3.herokuapp.com/tipos/centro/" + state.id.toString(),
          success: function (data) {
            console.log("Servicios recibidos");
            console.log(data);
            if (data.length === 0) window.alert("El centro no ha añadido tipos de uña. Por favor, indique al centro que debe añadir más servicios de la categoría Tipo");
            else setState({ id: state.id, name: state.name, isPaneOpen: false, buttons: data });
            //El data que llegue debe tener 1 atributo, buttons: objeto boton con sus propiedades y carac siguiente
            //FORMATO JSON: {"tipo": [{"id": 1, "nombre" : "Relleno", "coste": 1, "tiempo": 3, "siguienteFase": Material, "centro":...}, ...] }
          }
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.id]);

  useEffect(() => {
    if (state.buttons.length !== 0) {
      sessionStorage.setItem("centreId", state.id);
      setState({ id: state.id, name: state.name, isPaneOpen: true, buttons: state.buttons });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.buttons]);

async function valorar(valoracion){
  const body = {
    "valoracionUsuario": valoracion,
    "centro": centro.id,
    "usuario": user.id,
  }
  const header = {
    "Content-Type": "application/json",
    "Authorization": "Basic " + btoa(user.usuario + ":" + user.contrasenya)
  }
  const url= "https://nailing-sprint3.herokuapp.com/valoraciones/add/centro"
  await postData(url, body, header)
    .then(function (data) {
      console.log("Valoración enviada correctamente "+valoracion);
      setMensaje("Valoración enviada")
      centro.numValoraciones = centro.numValoraciones+1
      centro.valoracionTotal = centro.valoracionTotal+valoracion
      centro.valoracionMedia = centro.valoracionTotal/centro.numValoraciones
      setRating(rating)
      setHaValorado(true)
      setValoracionAntigua(data)
    }
    )
}

const [haValorado, setHaValorado] = React.useState(false);
const [primera, setPrimera] = React.useState(true);
const [valoracionesList, setValoracionesList] = React.useState(null);
const [valoracionAntigua, setValoracionAntigua] = React.useState(null);
if(user!=null && !haValorado && primera){
  $.ajax({
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Basic " + btoa(user.usuario + ":" + user.contrasenya)
    },
    url: "https://nailing-sprint3.herokuapp.com/valoraciones/list",
    success: function (data) {
      console.log("Servicios recibidos");
      setValoracionesList(data);
      for(const i in valoracionesList){
        if(valoracionesList[i]["usuario"]["id"]==user.id && valoracionesList[i]["centro"]["id"]==centro.id){
          console.log("ha entrado xd")
          console.log(valoracionesList[i]);
          setValoracionAntigua(valoracionesList[i]);
          setHaValorado(true);
          setValue(valoracionesList[i]["valoracionUsuario"]);
        }
      }
      setPrimera(false)
    }
  });
}

async function editarValoracion(valoracion, antigua){
  const body = {
    "id": antigua.id,
    "valoracionUsuario": valoracion,
    "centro": antigua.centro,
    "usuario": antigua.usuario,
  }
  const header = {
    "Content-Type": "application/json",
    "Authorization": "Basic " + btoa(user.usuario + ":" + user.contrasenya)
  }
  const url= "https://nailing-sprint3.herokuapp.com/valoraciones/edit"
  await putData(url, body, header)
    .then(function () {
      console.log("Valoración editada correctamente "+valoracion);
      setMensaje("Valoración editada")
      centro.valoracionTotal = centro.valoracionTotal + valoracion - antigua.valoracionUsuario
      centro.valoracionMedia = centro.valoracionTotal/centro.numValoraciones
      setRating(rating)
    }
    )
}

const [value, setValue] = React.useState(0);
const [hover, setHover] = React.useState(-1);
const [mensaje, setMensaje] = React.useState("");



  return (
    <><Card className="ml-3 mr-3" style={{backgroundColor: 'rgb(248, 225, 228)'}} sx={{ minWidth: 275 }}>
    <CardContent>
    <div className="md:flex">
      <img src={image} alt={name} className="object-cover rounded-md shadow-md w-full md:h-full md:w-1/4 float-left bg-white mb-2" />
          <div className="ml-5 items-center">
              <p><strong>Provincia:</strong> {provincia}</p>
              <p><strong>Localidad:</strong> {localidad}</p>
              <p><strong>Dirección:</strong> {direccion}</p>
              <p><strong>Horario de mañana:</strong> {aperturaAM} - {cierreAM}</p>
              <p><strong>Horario de tarde:</strong> {aperturaPM} - {cierrePM}</p>
              {ratingBoolean?
                <><p><strong>Valoración:</strong> <Rating value={rating} precision={0.1} readOnly /> ({rating.toFixed(1)})</p></>
                :
                <></>
              }
              {user===null && !haValorado ?
                <>
                </>
                : !haValorado ?
                <>
                <p><strong>Valorar:</strong> <Rating  precision={1} value={value} onChange={(event, newValue) => {
                setValue(newValue);
                valorar(newValue);
                }} 
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}/>({hover !== -1 ? hover : value})</p>
                </>
                : haValorado ?
                <>
                <p><strong>Editar valoración:</strong> <Rating  precision={1} value={value} onChange={(_event, newValue) => {
                setValue(newValue);
                editarValoracion(newValue, valoracionAntigua);
                }} 
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}/>({hover !== -1 ? hover : value})</p>
                </>
                :
                <></>
              }
              <p className="text-pink-400">{mensaje}</p>
          </div>
        </div>
      </CardContent>
      <CardActions>
        <button id={centreId} className="border-2 border-purple-300 bg-pink-200 text-black w-96 py-3 rounded-md text-1xl font-medium hover:bg-purple-300 transition duration-300"
          onClick={(event) => setState({ isPaneOpen: false, id: event.target.id, name: name, buttons: [] })}>Realizar reserva</button>
      </CardActions>
    </Card>
      <div class="centerIdDiv" id={state.id}>
        <SlidingPane className="font-josefin-sans" children={<div id={"TipoContainer"} class="propertyContainer"><PropertyPanel name="Tipo" buttons={state.buttons} /></div>} title={state.name} isOpen={state.isPaneOpen} from="bottom" width="100%" onRequestClose={() => { setState({ isPaneOpen: false, id: "", name: "", buttons: [] }); }} />
      </div></>

  );
}