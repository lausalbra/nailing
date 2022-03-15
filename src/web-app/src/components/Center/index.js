import React from "react";
class CenterButton extends React.Component {

    constructor({name}) {
        super()
        this.name = name
        this.selected = false
    }
    
    render() {
        return (
            <button
                className={"border-2 " +
                    (this.selected === true ? 'border-red-300' : 'border-white')
                }>{this.name}
            </button>
        )
    }
}

export {CenterButton}

