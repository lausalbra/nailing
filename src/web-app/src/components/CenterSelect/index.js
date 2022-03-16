import React from "react";
import {CenterButton} from '../Center'

//Componente que maneja la lista de centros
class CenterSelect extends React.Component {

    constructor() {
        super()
        //Lista temporal (la información de los centros deberá ser enviada en los props)
        this.centros = [[0, "Centro 1"], [1, "Centro 2"], [2, "Centro 3"], [3, "Centro 4"]]
        this.updateSelected = this.updateSelected.bind(this)
        this.state = {
            selected : null
        }
    }

    //Permite a los componentes Center acceder al estado actual de CenterSelect
    selectedCallback = () => {
        return this.state.selected
    }
    //Permite a los componentes Center modificar el estado actual de CenterSelect
    updateSelected(ind) {
        this.setState({selected: ind})
    }

    render() {
        let botones = this.centros.map((cent) => 
            <CenterButton key={cent[0]} id={cent[0]} name={cent[1]} selCallback={this.selectedCallback}
                click={() => {this.updateSelected(cent[0])}}/>)
        return (
            <>
                {botones}
            </>
        )
    }
}

export {CenterSelect}