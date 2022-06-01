import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom'
import "./PropertyPanel.css";
import Paypal from '../Paypal/PayPal';
import $ from 'jquery';



class PropertyPanel extends Component {

    constructor(props) {
        super(props);
        this.state = { name: props.name, buttons: props.buttons };
    }

    checkDate(date){
        var dateDate = new Date(date + ":00");
        var nowDate = new Date();
        const result1 = dateDate.getDate() > nowDate.getDate() && dateDate.getMonth() === nowDate.getMonth() && dateDate.getYear() === nowDate.getYear();
        const result2 = dateDate.getMonth() > nowDate.getMonth() && dateDate.getYear() === nowDate.getYear();
        const result3 = dateDate.getYear() > nowDate.getYear();
        return result1 || result2 || result3;
    }

    checkDay(date){
        var dateDate = new Date(date + ":00");
        var day = dateDate.getDay();
        switch(day){
            case 0:
                if (!sessionStorage.getItem("DiasDisponibles").includes("SUNDAY")) return false;
                break;
            case 1:
                if (!sessionStorage.getItem("DiasDisponibles").includes("MONDAY")) return false;
                break;
            case 2:
                if (!sessionStorage.getItem("DiasDisponibles").includes("TUESDAY")) return false;
                break;
            case 3:
                if (!sessionStorage.getItem("DiasDisponibles").includes("WEDNESDAY")) return false;
                break;
            case 4:
                if (!sessionStorage.getItem("DiasDisponibles").includes("THURSDAY")) return false;
                break;
            case 5:
                if (!sessionStorage.getItem("DiasDisponibles").includes("FRIDAY")) return false;
                break;
            case 6:
                if (!sessionStorage.getItem("DiasDisponibles").includes("SATURDAY")) return false;
                break;
            default:
                break;             
        }
        return true;
    }

    handleClick(e, self) {
        const _this = this;
        //Obtengo usuario desencriptado
        var cryptoJS = require("crypto-js");
        const user = JSON.parse(cryptoJS.AES.decrypt(sessionStorage.getItem("userEncriptado"), "NAILING").toString(cryptoJS.enc.Utf8))

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
        while (nextSibling) {
            var toDelete = nextSibling;
            nextSibling = nextSibling.nextElementSibling;
            toDelete.remove();
        }
        //Se guarda esta opcion
        sessionStorage.setItem(this.state.name, id);
        sessionStorage.setItem(this.state.name + "Cost", option.coste);
        sessionStorage.setItem(this.state.name + "Time", option.tiempo);
        //Si es una caja anterior se borran las variables anteriores
        switch (this.state.name) {
            case ("Tipo"):
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
            case ("Bases"):
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
            case ("Formas"):
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
            case ("Tamaños"):
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
            case ("Diseños"):
                sessionStorage.removeItem("Decoraciones");
                sessionStorage.removeItem("DecoracionesCost");
                sessionStorage.removeItem("DecoracionesTime");
                sessionStorage.removeItem("Acabados");
                sessionStorage.removeItem("AcabadosCost");
                sessionStorage.removeItem("AcabadosTime");
                break;
            case ("Decoraciones"):
                sessionStorage.removeItem("Acabados");
                sessionStorage.removeItem("AcabadosCost");
                sessionStorage.removeItem("AcabadosTime");
                break;
            default:
                break;
        }

        //Se obtiene el panel principal para colocar la nueva caja
        var mainPanel = containerDiv.parentElement;
        //Se comrpueba el siguiente set de opciones
        if (option.siguienteFase === "fin") //Si no hay más opciones se recopilan los datos de las opciones ya seleccionadas
        {
            //Se suman los tiempos y precios y se muestran
            var finisherDiv = document.createElement("div");
            finisherDiv.className = "flex flex-wrap justify-center font-bold font-josefin-sans text-lg mt-2";
            var time = 0;
            var price = 0;
            if (sessionStorage.getItem("Tipo") != null) {
                time += parseInt(sessionStorage.getItem("TipoTime"));
                price += parseFloat(sessionStorage.getItem("TipoCost"));
            }
            if (sessionStorage.getItem("Bases") != null) {
                time += parseInt(sessionStorage.getItem("BasesTime"));
                price += parseFloat(sessionStorage.getItem("BasesCost"));
            }
            if (sessionStorage.getItem("Formas") != null) {
                time += parseInt(sessionStorage.getItem("FormasTime"));
                price += parseFloat(sessionStorage.getItem("FormasCost"));
            }
            if (sessionStorage.getItem("Tamaños") != null) {
                time += parseInt(sessionStorage.getItem("TamañosTime"));
                price += parseFloat(sessionStorage.getItem("TamañosCost"));
            }
            if (sessionStorage.getItem("Diseños") != null) {
                time += parseInt(sessionStorage.getItem("DiseñosTime"));
                price += parseFloat(sessionStorage.getItem("DiseñosCost"));
            }
            if (sessionStorage.getItem("Decoraciones") != null) {
                time += parseInt(sessionStorage.getItem("DecoracionesTime"));
                price += parseFloat(sessionStorage.getItem("DecoracionesCost"));
            }
            if (sessionStorage.getItem("Acabados") != null) {
                time += parseInt(sessionStorage.getItem("AcabadosTime"));
                price += parseFloat(sessionStorage.getItem("AcabadosCost"));
            }

            var priceElement = document.createElement("a");
            priceElement.text = "Coste: " + price.toString() + " ";
            priceElement.className = "w-1/4 inline-block text-center m-3";
            var timeElement = document.createElement("a");
            timeElement.text = "Tiempo: " + time.toString() + " ";
            timeElement.className = "w-1/4 inline-block text-center m-3";
            //Se crean los selectores de dia, hora y minuto y el boton de reserva
            var dateSelector = document.createElement("INPUT");
            dateSelector.className = "w-1/4 text-black rounded-full m-3";
            var hourSelector = document.createElement("select");
            hourSelector.className = "w-1/4 text-black rounded-full m-3";
            var minuteSelector = document.createElement("select");
            minuteSelector.className = "w-1/4 text-black rounded-full m-3";
            minuteSelector.disabled = true;
            //JSON final de datos
            var postData = null;
            //boton final de pago
            var paybuttonDiv = document.createElement("div");
            paybuttonDiv.className = "w-1/2 rounded-full";
            var paypalDiv = document.createElement("div");
            paypalDiv.className = "w-full flex justify-center";

            //Confguración del selector de hora
            dateSelector.setAttribute("type", "date");
            var tomorrow = new Date();
            var day = tomorrow.getDate();
            if (day < 10) day = '0' + day;
            var month = tomorrow.getMonth() + 1;
            if (month < 10) month = '0' + month;
            tomorrow = tomorrow.getFullYear() + '-' + month + '-' + day;
            //La fecha mínima es mañana
            dateSelector.setAttribute("min", tomorrow);
            //Cuando se escoja una fecha, se podra escoger hora
            dateSelector.onchange = function () {
                hourSelector.disabled = false;
            }

            //Se comprueba que opciones de hora tiene el centro para configurar el selector de hora
            var horaAperturaAM = parseInt(option.centro.aperturaAM.split(":")[0]);
            var horaCierreAM = parseInt(option.centro.cierreAM.split(":")[0]);
            var horaAperturaPM = parseInt(option.centro.aperturaPM.split(":")[0])
            var horaCierrePM = parseInt(option.centro.cierrePM.split(":")[0])
            var hourOptions = [];
            while (horaAperturaAM < horaCierreAM) {
                hourOptions.push(horaAperturaAM.toString());
                horaAperturaAM++;
            }
            while (horaAperturaPM < horaCierrePM) {
                hourOptions.push(horaAperturaPM.toString());
                horaAperturaPM++;
            }
            //Se desactiva hasta tener una fecha
            hourSelector.disabled = true;
            //Se crea una opcion default
            var selectDefaultOption = document.createElement("option");
            selectDefaultOption.value = "";
            selectDefaultOption.text = "Escoja una hora";
            hourSelector.appendChild(selectDefaultOption);
            //Se rellena el selector de horas
            hourOptions.forEach(element => {
                var selectOption = document.createElement("option");
                selectOption.value = element;
                selectOption.text = element;
                hourSelector.appendChild(selectOption);
            });

            //Al cambiar la hora en el selector se configura el selector de minutos
            hourSelector.onchange = function () {
                $.ajax({
                    method: "GET",
                    contentType: "application/json",
                    headers: {
                        "Authorization": "Basic " + btoa(user.usuario + ":" + user.contrasenya)
                    },
                    url: encodeURI("https://nailingtest.herokuapp.com/cita/check/" + option.centro.id + "?fecha=" + dateSelector.value + " " + hourSelector.value + "&duracion=" + time.toString()),
                    success: function (data) {
                        console.log("Hora seleccionada");
                        minuteSelector.disabled = false;
                        //Se borran opciones anteriores
                        var i, L = minuteSelector.options.length - 1;
                        for (i = L; i >= 0; i--) {
                            minuteSelector.remove(i);
                        }
                        //Se añade una opción predeterminada
                        selectDefaultOption = document.createElement("option");
                        selectDefaultOption.value = "";
                        selectDefaultOption.text = "Escoja un tramo";
                        minuteSelector.appendChild(selectDefaultOption);
                        //Se añaden las opciones de tramos horarios
                        data.forEach(element => {
                            var selectOption = document.createElement("option");
                            selectOption.value = element;
                            selectOption.text = element;
                            minuteSelector.appendChild(selectOption);
                        });
                    }
                });
            };
            //Configuración de selector de minutos
            minuteSelector.disable = true;
            selectDefaultOption = document.createElement("option");
            selectDefaultOption.value = "";
            selectDefaultOption.text = "Escoja un tramo";
            minuteSelector.appendChild(selectDefaultOption);
            //Cuando cambie el valor del selector de minuto se rellenan los datos de llamada y se desbloquea el boton de reserva
            minuteSelector.onchange = function () {
                postData = {
                    usuario: user.id.toString(),
                    centro: sessionStorage.getItem("centreId"),
                    precio: price.toString(),
                    tiempo: time.toString(),
                    fecha: dateSelector.value + " " + hourSelector.value + ":" + minuteSelector.value,
                    tipo: sessionStorage.getItem("Tipo"),
                    base: sessionStorage.getItem("Bases"),
                    forma: sessionStorage.getItem("Formas"),
                    tamanyo: sessionStorage.getItem("Tamaños"),
                    disenyo: sessionStorage.getItem("Diseños"),
                    decoracion: sessionStorage.getItem("Decoraciones"),
                    acabado: sessionStorage.getItem("Acabados")
                };
                var json = JSON.stringify(postData);
                paybuttonDiv.innerHTML = '';
                if (!_this.checkDate(postData.fecha) && !_this.checkDay(postData.fecha)) {
                    var stateError = document.createElement("p");
                    stateError.className= "text-sm text-red-600";
                    stateError.innerHTML= "El dia seleccionado no es valido";
                    hourSelector.selectedIndex = 0;
                    minuteSelector.selectedIndex = 0;
                    minuteSelector.disable=true;
                    paybuttonDiv.append(stateError);
                }else{
                    var newDiv = document.createElement("div");
                    newDiv.className = "w-full flex justify-center";
                    paybuttonDiv.appendChild(newDiv);

                    ReactDOM.render(<Paypal json={json} money={parseInt(JSON.parse(json).precio)} paymentType="Reserve" />, newDiv);
                }
            };

            //Se añaden todos los elementos al div
            finisherDiv.appendChild(priceElement);
            finisherDiv.appendChild(timeElement);
            finisherDiv.appendChild(dateSelector);
            finisherDiv.appendChild(hourSelector);
            finisherDiv.appendChild(minuteSelector);
            finisherDiv.appendChild(paybuttonDiv);
            paybuttonDiv.appendChild(paypalDiv);
            mainPanel.append(finisherDiv);
        }
        else {
            //Se crea la url para obtener las siguientes opciones
            var url = option.siguienteFase + "/" + option.id + "/centro/" + sessionStorage.getItem("centreId");
            $.ajax({
                method: "GET",
                url: "https://nailingtest.herokuapp.com/" + url,
                headers: {
                    "Authorization": "Basic " + btoa(user.usuario + ":" + user.contrasenya)
                },
                success: function (data) {
                    console.log("Servicios recibidos");
                    //El data que llegue debe tener 1 atributo, buttons: objeto boton con sus propiedades y carac siguiente
                    //FORMATO JSON: {"options": [{"id": 1, "name" : "Relleno", "cost": 1, "time": 3, "next": Material}, ...] }
                    //Se crea el panel donde van a ir las opciones
                    var nextName = option.siguienteFase.charAt(0).toUpperCase() + option.siguienteFase.slice(1);
                    nextName = nextName.replaceAll("ny", "ñ");
                    if (data.length === 0) window.alert("Esta opción carece de los servicios siguientes necesarios. Por favor, indique al centro que debe añadir más servicios de la categoría " + nextName)
                    else
                    {
                        let newPropertyPanelContainer = document.createElement("div");
                        //Configuración del panel
                        newPropertyPanelContainer.id = nextName + "Container";
                        newPropertyPanelContainer.className = "propertyContainer";
                        //Se añade y se abre el panel
                        mainPanel.append(newPropertyPanelContainer);
                        ReactDOM.render(<><PropertyPanel name={nextName} buttons={data} /></>, newPropertyPanelContainer);
                        newPropertyPanelContainer.firstChild.firstChild.firstChild.checked = true;
                    }
                }
            });
        }

    }

    render() {
        const self = this;
        return (
            <div class="border-b overflow-hidden tab">
                <div class="border-l-2 border-transparent relative">
                    <input class="w-full absolute z-10 cursor-pointer opacity-0 h-5 top-6" type="checkbox" id="chck1"></input>
                    <header class="flex justify-between items-center p-5 pl-8 pr-8 cursor-pointer select-none tab-label" for="chck1">
                        <span class="text-grey-darkest font-thin">
                            {this.state.name}
                        </span>
                        <div class="rounded-full w- border border-grey w-7 h-7 flex items-center justify-center test">
                            <svg aria-hidden="true" class="" data-reactid="266" fill="none" height="24" stroke="#606F7B" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewbox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                <polyline points="6 9 12 15 18 9">
                                </polyline>
                            </svg>
                        </div>
                    </header>
                    <div class="bg-NATURAL bg-ESCULPIDA bg-DUAL_SYSTEM bg-GEL bg-ACRILICO bg-ACRYGEL bg-SEMIPERMANENTE bg-SEMIPERMANENTE_REFUERZO bg-JAPONESA bg-SQUARE bg-ROUND bg-SQUOVAL bg-ALMOND bg-STILETTO bg-BALLERINA bg-XXS bg-XS bg-S bg-M bg-L bg-XL bg-XXL bg-RELLENO bg-FRANCESA_REVERSA bg-BABY_BOOMER bg-DEGRADADO_COLOR bg-ENCAPSULADO bg-LISAS bg-DIBUJO bg-DISNEY_COLOR bg-DISNEY_BOCETO bg-TRANSFER_FOIL bg-PIEDRAS bg-PIERCING bg-PEGATINAS bg-STANPING bg-PAN_DE_ANGEL bg-EFECTO_HUEVO bg-EFECTO_PIEDRA bg-FRANCESA bg-BURBUJAS bg-SUGAR bg-EFECTO_RELIEVE bg-ESPEJO bg-HOLOGRAFICO bg-MARMOL bg-NO_DECORACION bg-MATE bg-BRILLO"></div>
                    <div class="tab-content flex justify-center flex-wrap">
                        {this.state.buttons.map((element, _i) => {
                            console.log(element.nombre);
                            var id = element.id
                            var nameToShow = element.nombre.replaceAll("_", " ");
                            nameToShow = nameToShow.replaceAll("ny", "ñ");
                            return (
                                <>
                                    <div class="flex flex-wrap justify-center w-min" ><button id={id} onClick={(e) => this.handleClick(e, self)} class={"bg-" + element.nombre + " h-responsiveButtonHeight max-w-xs max-h-28 m-1 bg-cover font-bold rounded-full p-2 border-2 w-56"}></button><p class="text-center w-fit max-w-md">{nameToShow}</p></div>
                                </>
                            )

                        })}
                    </div>
                </div>
            </div>)
    }
}

export default PropertyPanel;
