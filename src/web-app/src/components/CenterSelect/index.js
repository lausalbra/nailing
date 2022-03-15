import React from "react";
import ReactDOM from "react-dom";
import {CenterButton} from '../Center'
export function CenterSelect() {

    function updateSelector(index) {
        console.log("updateSelector")
        for (let b of botones) {
            let nextState = b.id === index ? !b.selected : false
            console.log(nextState)
        }
    }

    const centros = [[0, "Centro 1"], [1, "Centro 2"], [2, "Centro 3"], [3, "Centro 4"]]
    let botones = centros.map((cent) => <CenterButton key={cent[0]} name={cent[1]}/>)
    console.log(botones)
    for (let b of botones) {
        b.addEventListener('onClick', updateSelector(b.id))
    }

    return (
        <>
            {botones}
        </>
    )
}