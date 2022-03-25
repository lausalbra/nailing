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
        console.log("click en opción")
        var id = e.target.id;
        var option = this.state.buttons.find(b => b.id.toString() === id)
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
        //Se guarda esta opcion
        sessionStorage.setItem(this.state.name, id);
        sessionStorage.setItem(this.state.name+"Cost", option.coste);
        sessionStorage.setItem(this.state.name+"Time", option.tiempo);
        //Si es una caja anterior se borran las variables anteriores
        switch(this.state.name){
            case("Tipo"):
                sessionStorage.removeItem("Bases");
                sessionStorage.removeItem("BasesCost");
                sessionStorage.removeItem("BasesTime");
                sessionStorage.removeItem("Formas");
                sessionStorage.removeItem("FormasCost");
                sessionStorage.removeItem("FormasTime");
                sessionStorage.removeItem("Tamaños");
                sessionStorage.removeItem("TamañosCost");
                sessionStorage.removeItem("TamañosTime");
                sessionStorage.removeItem("Diseños");
                sessionStorage.removeItem("DiseñosCost");
                sessionStorage.removeItem("DiseñosTime");
                sessionStorage.removeItem("Decoraciones");
                sessionStorage.removeItem("DecoracionesCost");
                sessionStorage.removeItem("DecoracionesTime");
                sessionStorage.removeItem("Acabados");
                sessionStorage.removeItem("AcabadosCost");
                sessionStorage.removeItem("AcabadosTime");
                break;
            case("Bases"):
                sessionStorage.removeItem("Formas");
                sessionStorage.removeItem("FormasCost");
                sessionStorage.removeItem("FormasTime");
                sessionStorage.removeItem("Tamaños");
                sessionStorage.removeItem("TamañosCost");
                sessionStorage.removeItem("TamañosTime");
                sessionStorage.removeItem("Diseños");
                sessionStorage.removeItem("DiseñosCost");
                sessionStorage.removeItem("DiseñosTime");
                sessionStorage.removeItem("Decoraciones");
                sessionStorage.removeItem("DecoracionesCost");
                sessionStorage.removeItem("DecoracionesTime");
                sessionStorage.removeItem("Acabados");
                sessionStorage.removeItem("AcabadosCost");
                sessionStorage.removeItem("AcabadosTime");
                break;
            case("Formas"):
                sessionStorage.removeItem("Tamaños");
                sessionStorage.removeItem("TamañosCost");
                sessionStorage.removeItem("TamañosTime");
                sessionStorage.removeItem("Diseños");
                sessionStorage.removeItem("DiseñosCost");
                sessionStorage.removeItem("DiseñosTime");
                sessionStorage.removeItem("Decoraciones");
                sessionStorage.removeItem("DecoracionesCost");
                sessionStorage.removeItem("DecoracionesTime");
                sessionStorage.removeItem("Acabados");
                sessionStorage.removeItem("AcabadosCost");
                sessionStorage.removeItem("AcabadosTime");
                break;
            case("Tamaños"):
                sessionStorage.removeItem("Diseños");
                sessionStorage.removeItem("DiseñosCost");
                sessionStorage.removeItem("DiseñosTime");
                sessionStorage.removeItem("Decoraciones");
                sessionStorage.removeItem("DecoracionesCost");
                sessionStorage.removeItem("DecoracionesTime");
                sessionStorage.removeItem("Acabados");
                sessionStorage.removeItem("AcabadosCost");
                sessionStorage.removeItem("AcabadosTime");
                break;
            case("Diseños"):
                sessionStorage.removeItem("Decoraciones");
                sessionStorage.removeItem("DecoracionesCost");
                sessionStorage.removeItem("DecoracionesTime");
                sessionStorage.removeItem("Acabados");
                sessionStorage.removeItem("AcabadosCost");
                sessionStorage.removeItem("AcabadosTime");
                break;
            case("Decoraciones"):
                sessionStorage.removeItem("Acabados");
                sessionStorage.removeItem("AcabadosCost");
                sessionStorage.removeItem("AcabadosTime");
                break;
            default:
                break;
        }

        //Se obtiene el panel principal para colocar la nueva caja
        var mainPanel = containerDiv.parentElement;
        //El id del centro puede sacarse del contexto, el resto está en la opcion
        if(option.siguienteFase === "fin")
        {
            //Se suman los tiempos y precios y se muestran
            var finisherDiv = document.createElement("div");
            var time = 0;
            var price = 0;
            if(sessionStorage.getItem("Tipo") != null){
                time += parseInt(sessionStorage.getItem("TipoTime"));
                price += parseFloat(sessionStorage.getItem("TipoCost"));
            }
            if(sessionStorage.getItem("Bases") != null){
                time += parseInt(sessionStorage.getItem("BasesTime"));
                price += parseFloat(sessionStorage.getItem("BasesCost"));
            }
            if(sessionStorage.getItem("Formas") != null){
                time += parseInt(sessionStorage.getItem("FormasTime"));
                price += parseFloat(sessionStorage.getItem("FormasCost"));
            }
            if(sessionStorage.getItem("Tamaños") != null){
                time += parseInt(sessionStorage.getItem("TamañosTime"));
                price += parseFloat(sessionStorage.getItem("TamañosCost"));
            }
            if(sessionStorage.getItem("Diseños") != null){
                time += parseInt(sessionStorage.getItem("DiseñosTime"));
                price += parseFloat(sessionStorage.getItem("DiseñosCost"));
            }
            if(sessionStorage.getItem("Decoraciones") != null){
                time += parseInt(sessionStorage.getItem("DecoracionesTime"));
                price += parseFloat(sessionStorage.getItem("DecoracionesCost"));
            }
            if(sessionStorage.getItem("Acabados") != null){
                time += parseInt(sessionStorage.getItem("AcabadosTime"));
                price += parseFloat(sessionStorage.getItem("AcabadosCost"));
            }
            var priceElement = document.createTextNode("Coste: " + price.toString() + " ");
            var timeElement = document.createTextNode("Tiempo: " + time.toString() + " ");
            const postData = {
                usuario: sessionStorage.getItem("userId"),
                centro: sessionStorage.getItem("centreId"),
                precio: price.toString(),
                tiempo: time.toString(),
                tipo: sessionStorage.getItem("Tipo"),
                base: sessionStorage.getItem("Bases"),
                forma: sessionStorage.getItem("Formas"),
                tamanyo: sessionStorage.getItem("Tamaños"),
                disenyo: sessionStorage.getItem("Diseños"),
                decoracion: sessionStorage.getItem("Decoraciones"),
                acabado: sessionStorage.getItem("Acabados")
            };
            var json = JSON.stringify(postData);
            var buttonReserve = document.createElement("button");
            buttonReserve.innerText = "Reservar cita"
            buttonReserve.onclick = function() {
                $.ajax({
                    method: "POST",
                    contentType: "application/json",
                    headers: {
                        "Authorization": "Basic " + btoa(sessionStorage.getItem("userName") + ":" + sessionStorage.getItem("userPassword"))
                    },
                    data: json,
                    url: "https://nailingtest.herokuapp.com/cita/add"
                });
            };
            finisherDiv.appendChild(priceElement);
            finisherDiv.appendChild(timeElement);
            finisherDiv.appendChild(buttonReserve);
            mainPanel.append(finisherDiv);
        }
        else{
            var url = option.siguienteFase + "/" + option.id + "/centro/" + sessionStorage.getItem("centreId"); 
            $.ajax({
                method: "GET",
                url: "https://nailingtest.herokuapp.com/" + url,
                //QUITAR CUANDO FUNCIONE LOGIN
                headers: {
                    "Authorization": "Basic " + btoa(sessionStorage.getItem("userName") + ":" + sessionStorage.getItem("userPassword"))
                },
                success: function (data) {
                    console.log("Servicios recibidos");
                    //El data que llegue debe tener 1 atributo, buttons: objeto boton con sus propiedades y carac siguiente
                    //FORMATO JSON: {"options": [{"id": 1, "name" : "Relleno", "cost": 1, "time": 3, "next": Material}, ...] }
                    let newPropertyPanelContainer = document.createElement("div");
                    var nextName = option.siguienteFase.charAt(0).toUpperCase() + option.siguienteFase.slice(1);
                    nextName = nextName.replace("ny","ñ");
                    newPropertyPanelContainer.id = nextName + "Container";
                    newPropertyPanelContainer.className = "propertyContainer";
                    mainPanel.append(newPropertyPanelContainer);
                    ReactDOM.render(<><PropertyPanel name={nextName} buttons={data}/></>, newPropertyPanelContainer);
                    newPropertyPanelContainer.firstChild.firstChild.firstChild.checked = true;
                }
            });
        }
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
                        console.log(element.nombre);
                        var id = element.id
                        var img = element.nombre.replace(" ", "-");
                        return(
                            <>
                            <div class="justify-center w-1/5" ><button id={id} onClick={(e) => this.handleClick(e, self)} class={"bg-" + img + " h-20 bg-cover font-bold rounded-full p-2 border-2 w-full"}></button><p class="text-center">{element.nombre}</p></div>
                            </>
                        )
                    })}
                </div>
            </div>
        </div>)
    }
} 

export default PropertyPanel;
