import React, { createRef, useState } from "react";
import SlidingPane from "../../components/SlidingPane/index.tsx";
import PropertyPanel from "../../components/PropertyPanel/index.js";

export function Cita() {
    const [state, setState] = useState({
        isPaneOpen: false,
        id: "",
      })
    const myContainer = createRef();
    return (
        <>
            <button ref={myContainer} id="420" className="border-2 border-purple-600 text-black px-32 py-3 rounded-md text-1xl font-medium hover:bg-purple-600 transition duration-300"
                onClick={() => setState({ isPaneOpen: true, id: myContainer.current.id })}>Abrir Panel</button>
            <SlidingPane title={state.id} isOpen={state.isPaneOpen} from="bottom" width="100%" onRequestClose={() => { setState({ isPaneOpen: false, id: "" });}}>
                <PropertyPanel name="Base"></PropertyPanel>
            </SlidingPane>
        </>
    )
}