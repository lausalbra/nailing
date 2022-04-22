import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import SlidingPane from "../../components/SlidingPane/index.tsx";
import PropertyPanel from "../../components/PropertyPanel/index.js";
import { BasicRating } from "../Rating";
import $ from 'jquery';

export function CenterDetails({ name, image, provincia, rating, aperturaAM, cierreAM, aperturaPM, cierrePM }) {

  const [state, setState] = useState({
    isPaneOpen: false,
    id: "",
    name: "",
    buttons: [],
  })

  const centreId = window.location.pathname.split('/')[2];

  useEffect(() => {
    if (state.id !== "" && state.buttons.length === 0) {
      if (sessionStorage.getItem("userName") == null) {
        alert("Debe estar logeado")
        setState({ isPaneOpen: false, id: '', name: name, buttons: [] })
      }
      else {
        console.log("Llamada a tipos")
        $.ajax({
          method: "GET",
          headers: {
            "Authorization": "Basic " + btoa(sessionStorage.getItem("userName") + ":" + sessionStorage.getItem("userPassword"))
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

  return (
    <><Card style={{ backgroundColor: 'rgb(248, 225, 228)' }} sx={{ minWidth: 275 }}>
      <CardContent>
        <div className="flex items-center">
          <img src={image} alt={name} className="object-cover rounded-md shadow-md max-w-full float-left bg-white" />
          <div className="ml-5 items-center">
            <p><strong>Provincia:</strong> {provincia}</p>
            <p><strong>Horario de mañana:</strong> {aperturaAM} - {cierreAM}</p>
            <p><strong>Horario de tarde:</strong> {aperturaPM} - {cierrePM}</p>
            {/* <p><BasicRating value={rating} readOnly /></p> */}
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