import React, { useState } from "react";
import SlidingPane from "../../components/SlidingPane/index.tsx";

export function Cita() {
    const [state, setState] = useState({
        isPaneOpen: false,
        isPaneOpenLeft: false,
      })
    return (
        <>
            <button class="border-2 border-purple-600 text-black px-32 py-3 rounded-md text-1xl font-medium hover:bg-purple-600 transition duration-300"
                onClick={() => setState({ isPaneOpen: true })}>Abrir Panel</button>
            <SlidingPane title="Aqui va el nombre del centro" isOpen={state.isPaneOpen} from="bottom" width="100%" onRequestClose={() => { setState({ isPaneOpen: false });}}>

            </SlidingPane>
        </>
    )
}