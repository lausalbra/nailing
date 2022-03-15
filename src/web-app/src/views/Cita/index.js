import React, { useState } from "react";
import SlidingPane from "../../components/SlidingPane/index.tsx";
import PropertyPanel from "../../components/PropertyPanel/index.js";

export function Cita() {
    const [state, setState] = useState({
        isPaneOpen: false,
        id: "",
      })
  
    const name = "Tipo"
    return (
        <>
            <button id="420" className="border-2 border-purple-600 text-black px-32 py-3 rounded-md text-1xl font-medium hover:bg-purple-600 transition duration-300"
                onClick={(event) => setState({ isPaneOpen: true, id: event.target.id })}>Abrir Panel 1</button>
            <button id="421" className="border-2 border-purple-600 text-black px-32 py-3 rounded-md text-1xl font-medium hover:bg-purple-600 transition duration-300"
                onClick={(event) => setState({ isPaneOpen: true, id: event.target.id })}>Abrir Panel 2</button>
            <SlidingPane children={<div id={name+"Container"} class="propertyContainer"><PropertyPanel name={name} buttons="Esculpida,Uña natural"/></div> } title={state.id} isOpen={state.isPaneOpen} from="bottom" width="100%" onRequestClose={() => { setState({ isPaneOpen: false, id: "" });}}/>
        </>
    )
}

