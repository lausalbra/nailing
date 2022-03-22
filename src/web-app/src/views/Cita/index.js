import React, { useState, useEffect } from "react";
import SlidingPane from "../../components/SlidingPane/index.tsx";
import PropertyPanel from "../../components/PropertyPanel/index.js";
import $ from 'jquery';

/*function toggleButtonState(event) {
    let selectedWord = window.getSelection().toString();
    fetchAPI(selectedWord).then(result => {
      this.setState({ result });
    });
  };*/

export function Cita() {
    const [state, setState] = useState({
        isPaneOpen: false,
        id: "",
        name: "",
        buttons: [],
    })

    useEffect(() => {
        if (state.id !== "" && state.buttons.length == 0) {
            $.ajax({
                method: "GET",
                url: "https://my.api.mockaroo.com/tipo/centro/123?key=199eb280", //"/tipo/centro/" + event.target.id.toString(),
                success: function (data) {
                    console.log("Servicios recibidos");
                    console.log(data);
                    //El data que llegue debe tener 1 atributo, buttons: objeto boton con sus propiedades y carac siguiente
                    //FORMATO JSON: {"options": [{"id": 1, "name" : "Relleno", "cost": 1, "time": 3, "next": Material}, ...] }
                    setState({ id: state.id, name: state.name, isPaneOpen: false, buttons: data.options });
                }
            });
        }
    }, [state.id]);

    useEffect(() => {
        if (state.buttons.length != 0) {
            setState({ id: state.id, name: state.name, isPaneOpen: true, buttons: state.buttons });
        }
    }, [state.buttons]);

    return (
        <>
            <button id="420" className="border-2 border-purple-600 text-black px-32 py-3 rounded-md text-1xl font-medium hover:bg-purple-600 transition duration-300"
                onClick={(event) => setState({ isPaneOpen: false, id: event.target.id, name: event.target.innerText, buttons: [] })}>Centro1</button>
            <button id="421" className="border-2 border-purple-600 text-black px-32 py-3 rounded-md text-1xl font-medium hover:bg-purple-600 transition duration-300"
                onClick={(event) => setState({ isPaneOpen: false, id: event.target.id, name: event.target.innerText, buttons: [] })}>Centro2</button>
            <div class="centerIdDiv" id={state.id}>
                <SlidingPane children={<div id={"TipoContainer"} class="propertyContainer"><PropertyPanel name="Tipo" buttons={state.buttons} /></div>} title={state.name} isOpen={state.isPaneOpen} from="bottom" width="100%" onRequestClose={() => { setState({ isPaneOpen: false, id: "", name: "", buttons: [] }); }} />
            </div>
        </>
    )
}

