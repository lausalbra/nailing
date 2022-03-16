import React from "react";

//Componente que maneja el botón de selección de un centro
class CenterButton extends React.Component {

    constructor({id, name, click, selCallback}) {
        super()
        this.id = id
        this.name = name
        this.click = click
        this.selCallback = selCallback
    }
    
    render() {
        let selId = this.selCallback()
        return (
            <div>
                <button onClick={this.click}
                //El estilo cambia en función del centro seleccionado (selId)
                    className={"border-2 " +
                        (selId === this.id ? 'border-red-300' : 'border-white')
                    }>{this.name}
                </button>
            </div>
            
        )
    }
}

export {CenterButton}

