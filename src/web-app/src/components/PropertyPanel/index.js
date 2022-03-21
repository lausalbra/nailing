import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import "./PropertyPanel.css";
import $ from 'jquery'; 

class PropertyPanel extends Component {
    constructor(props)
    {
        super(props);
        this.state = { name : props.name, buttons: props.buttons };
    }

    handleClick(e, self){
        //Obtiene el boton pulsado
        var id = e.target.id;
        var option = this.state.buttons.find(b => b.id === id)
        //Se debe guardar la opción en el contexto
        //Cerramos la caja
        var checkbox = e.target.parentElement.parentElement.parentElement.firstChild;
        checkbox.checked = false;
        //Si se ha pulsado una caja anterior se eliminan las cajas posteriores
        var containerDiv = checkbox.parentElement.parentElement.parentElement;
        let nextSibling = containerDiv.nextElementSibling;
        while(nextSibling) {
            var toDelete = nextSibling;
            nextSibling = nextSibling.nextElementSibling;
            toDelete.remove();
        }
        //Se obtiene el panel principal para colocar la nueva caja
        var mainPanel = containerDiv.parentElement;
        //El id del centro puede sacarse del contexto, el resto está en la opcion
        //var url = "/centro/" + CONTEXTO + "/" + option.next + "/" + option.id;
        $.ajax({
            method: "GET",
            url: "https://my.api.mockaroo.com/123/123/centro/123?key=199eb280",
            success: function (data) {
                console.log("Servicios recibidos");
                //El data que llegue debe tener 1 atributo, buttons: objeto boton con sus propiedades y carac siguiente
                //FORMATO JSON: {"options": [{"id": 1, "name" : "Relleno", "cost": 1, "time": 3, "next": Material}, ...] }
                if(data.options.length === 1 && data.options[0].next === "fin")
                {
                    //Se suman los tiempos y precios y se muestran
                    var finisherDiv = document.createElement("div");
                    var price = document.createTextNode("15€");
                    var tiempo = document.createTextNode("20min");
                    var buttonReserve = document.createElement("button");
                    buttonReserve.innerText = "Reservar cita"
                    finisherDiv.appendChild(price);
                    finisherDiv.appendChild(tiempo);
                    finisherDiv.appendChild(buttonReserve);
                    mainPanel.append(finisherDiv);
                }
                else
                {
                    let newPropertyPanelContainer = document.createElement("div");
                    newPropertyPanelContainer.id = option.next + "Container";
                    newPropertyPanelContainer.className = "propertyContainer";
                    mainPanel.append(newPropertyPanelContainer);
                    ReactDOM.render(<><PropertyPanel name={option.next} buttons={data.options}/></>, newPropertyPanelContainer);
                    newPropertyPanelContainer.firstChild.firstChild.firstChild.checked = true;
                }
            }
        });
    }
 
    render()
    {
        const self = this;
        return(
        <div class="border-b overflow-hidden tab">
            <div class="border-l-2 border-transparent relative">
                <input class="w-full absolute z-10 cursor-pointer opacity-0 h-5 top-6" type="checkbox" id="chck1"></input>
                <header class="flex justify-between items-center p-5 pl-8 pr-8 cursor-pointer select-none tab-label" for="chck1">
                    <span class="text-grey-darkest font-thin text-xl">
                        {this.state.name}
                    </span>
                    <div class="rounded-full border border-grey w-7 h-7 flex items-center justify-center test">
                        <svg aria-hidden="true" class="" data-reactid="266" fill="none" height="24" stroke="#606F7B" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewbox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                            <polyline points="6 9 12 15 18 9">
                            </polyline>
                        </svg>
                    </div>
                </header>
                <div class="tab-content flex justify-center flex-wrap">
                    {this.state.buttons.map((element,i) => {
                        console.log(element.name);
                        var id = element.id
                        var img = element.name.replace(" ", "-");
                        return(
                            <>
                            <div class="justify-center w-1/5" ><button id={id} onClick={(e) => this.handleClick(e, self)} class={"bg-" + img + " h-20 bg-cover font-bold rounded-full p-2 border-2 w-full"}></button><p class="text-center">{element.name}</p></div>
                            </>
                        )
                    })}
                </div>
            </div>
        </div>)
    }
} 

export default PropertyPanel;

/*
$.ajax({
    method: "POST",
    url: "/api/users",
    data: {
        username: username,
        password: password,
        authority: authority,
    },
    success: function (data) {
        console.log("User Created");
    }
});
*/