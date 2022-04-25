import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import SlidingPane from "../../components/SlidingPane/index.tsx";
import PropertyPanel from "../../components/PropertyPanel/index.js";
import { Rating, Box } from "@mui/material";
import { getData, postData } from '../../services/common/common'
import $ from 'jquery';


export function CenterDetails({centro}) {

  //Obtengo usuario desencriptado
  var cryptoJS = require("crypto-js");
  const user = JSON.parse(cryptoJS.AES.decrypt(sessionStorage.getItem("userEncriptado"), "NAILING").toString(cryptoJS.enc.Utf8))

  const [rating, setRating] = React.useState(centro.valoracionMedia);
  const [ratingBoolean, setRatingBoolean] = React.useState(false);
  
  const name = centro.nombre
  const image = centro.imagen
  const provincia = centro.provincia
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
      else {
        console.log("Llamada a tipos")
        $.ajax({
          method: "GET",
          headers: {
            "Authorization": "Basic " + btoa(user.usuario + ":" + user.contrasenya)
          },
          url: "https://nailingtest.herokuapp.com/tipos/centro/" + state.id.toString(),
          success: function (data) {
            console.log("Servicios recibidos");
            console.log(data);
            //El data que llegue debe tener 1 atributo, buttons: objeto boton con sus propiedades y carac siguiente
            //FORMATO JSON: {"tipo": [{"id": 1, "nombre" : "Relleno", "coste": 1, "tiempo": 3, "siguienteFase": Material, "centro":...}, ...] }
            setState({ id: state.id, name: state.name, isPaneOpen: false, buttons: data });
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
    "usuario": sessionStorage.getItem("userId"),
  }
  const header = {
    "Content-Type": "application/json",
    "Authorization": "Basic " + btoa(sessionStorage.getItem("userName") + ":" + sessionStorage.getItem("userPassword"))
  }
  console.log(body)
  const url= "https://nailingtest.herokuapp.com/valoraciones/add/centro"
  await postData(url, body, header)
    .then(function () {
      console.log("Valoración enviada correctamente "+valoracion);
      setMensaje("Valoración enviada")
      setEnviado(true)
      centro.numValoraciones = centro.numValoraciones+1
      centro.valoracionTotal = centro.valoracionTotal+valoracion
      centro.valoracionMedia = centro.valoracionTotal/centro.numValoraciones
      setRating(rating)
    }
    )
}
const [value, setValue] = React.useState(0);
const [hover, setHover] = React.useState(-1);
const [mensaje, setMensaje] = React.useState("");
const [enviado, setEnviado] = React.useState(false);

  return (
    <><Card style={{ backgroundColor: 'rgb(248, 225, 228)' }} sx={{ minWidth: 275 }}>
      <CardContent>
        <div className="flex items-center">
          <img src={image} alt={name} className="object-cover rounded-md shadow-md max-w-full float-left bg-white" />
          <div className="ml-5 items-center">
              <p><strong>Provincia:</strong> {provincia}</p>
              <p><strong>Horario de mañana:</strong> {aperturaAM} - {cierreAM}</p>
              <p><strong>Horario de tarde:</strong> {aperturaPM} - {cierrePM}</p>
              {ratingBoolean?
                <><p><strong>Valoración:</strong> <Rating value={rating} precision={0.1} readOnly /> ({rating.toFixed(1)})</p></>
                :
                <></>
              }
              {enviado?
                <>
                <p><strong>Valorar:</strong> <Rating  precision={1} value={value} onChange={(event, newValue) => {
                setValue(newValue);
                valorar(newValue);
                }} 
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }} readOnly/>({hover !== -1 ? hover : value})</p>
                </>
                :
                <>
                <p><strong>Valorar:</strong> <Rating  precision={1} value={value} onChange={(event, newValue) => {
                setValue(newValue);
                valorar(newValue);
                }} 
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}/>({hover !== -1 ? hover : value})</p>
                </>
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