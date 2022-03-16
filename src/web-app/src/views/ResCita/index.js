import React from 'react';
import { Filter } from '../../components/Filter'
import { CenterSelect } from '../../components/CenterSelect'

//Componente que maneja la vista de reserva de citas
class ResCita extends React.Component {

    constructor(props) {
        super(props);
        this.referencia = React.createRef();
    }

    //Devuelve la id del centro actual seleccionado en el componente CenterSelect
    getSelected = () => {
        const listado = this.referencia.current;
        console.log("current state of child is :  "+ listado.state.selected);
    }

    render() {
        return (
            <>
                <CenterSelect ref={this.referencia}/>
            </>
        )
    }
}

export {ResCita}