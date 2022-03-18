import React, { useState } from "react";
import ReactDOM from 'react-dom'
import SlidingPane from "../../components/SlidingPane/index.tsx";
import PropertyPanel from "../../components/PropertyPanel/index.js";
import $ from 'jquery'; 

export function Cita() {
    const [state, setState] = useState({
        isPaneOpen: false,
        id: "",
      })

    return (
        <>
            <button id="420" className="border-2 border-purple-600 text-black px-32 py-3 rounded-md text-1xl font-medium hover:bg-purple-600 transition duration-300"
                onClick={(event) => {
                    setState({ isPaneOpen: true, id: event.target.id });
                    $.ajax({
                        method: "GET",
                        url: "/centro/" + event.target.id.toString(),
                        success: function (data) {
                            console.log("Servicios recibidos");
                            console.log(data);
                            //El data que llegue debe tener 1 atributo, buttons: objeto boton con sus propiedades y carac siguiente
                            //FORMATO JSON: {[{"id": 1, "name" : "Relleno", "cost": 1, "time": 3, "next": Material}, ...] }
                            ReactDOM.render(<><div id={event.target.id}><SlidingPane children={<div id={"TipoContainer"} class="propertyContainer"><PropertyPanel name="Tipo" buttons={data} /></div> } title={event.target.innerText} isOpen={state.isPaneOpen} from="bottom" width="100%" onRequestClose={() => { setState({ isPaneOpen: false, id: "" });}}/></div></>, document.getElementById('root'));
                        }
                    });
                }}>Centro1</button>
            <button id="421" className="border-2 border-purple-600 text-black px-32 py-3 rounded-md text-1xl font-medium hover:bg-purple-600 transition duration-300"
                onClick={(event) => setState({ isPaneOpen: true, id: event.target.id })}>Centro2</button>
        </>
    )
}

