import { useEffect, useState } from "react";
import Paypal from "../Paypal/PayPal"
import ReactDOM from 'react-dom'

export function SuscripciónComponent(props) {


    //Obtengo usuario desencriptado
    var cryptoJS = require("crypto-js");

    let user

    try {
        user = JSON.parse(cryptoJS.AES.decrypt(sessionStorage.getItem("userEncriptado"), "NAILING").toString(cryptoJS.enc.Utf8))
    } catch (error) {
        user = {
            contrasenya: null,
            email: null,
            id: null,
            rol: null,
            telefono: null,
            usuario: null,
            centro: null
        }
    }

    let centro = user.centro

    console.log("CENTRO DEL USUARIO", centro)

    const [stateSub, changeStateSub] = useState("")

    let money

    useEffect(() => {
        switch (props.tipo) {
            case "basico":
                changeStateSub({
                    "tipo": "BASIC",
                    "label": "Suscripción Básica",
                    "citas": 100,
                    "precio": 25

                })
                centro.suscripcion = "BASIC"
                centro.creditosrestantes = 100
                money = 25
                break
            case "medio":
                changeStateSub({
                    "tipo": "MEDIUM",
                    "label": "Suscripción Media",
                    "citas": 150,
                    "precio": 45
                })
                centro.suscripcion = "MEDIUM"
                centro.creditosrestantes = 150
                money = 45
                break
            case "avanzado":
                changeStateSub({
                    "tipo": "ADVANCED",
                    "label": "Suscripción Avanzada",
                    "citas": 200,
                    "precio": 65
                })
                centro.suscripcion = "ADVANCED"
                centro.creditosrestantes = 200
                money = 65
                break
            case "premium":
                changeStateSub({
                    "tipo": "PREMIUM",
                    "label": "Suscripción Premium",
                    "citas": 250,
                    "precio": 100,
                    "texto": "¡Promocion especial de tu negocio!"
                })
                centro.suscripcion = "PREMIUM"
                centro.creditosrestantes = 250
                money = 100
                break
            default:
        }

        console.log("CENTRO MODIFICADO", centro)

        // changeCentro(centro)

        centro.pagado = true

        var paypalDiv = document.getElementById("paypalDiv");
        paypalDiv.innerHTML = '';
        var newDiv = document.createElement("div");
        newDiv.className = "w-full flex justify-center";
        paypalDiv.appendChild(newDiv);
        ReactDOM.render(<Paypal json={centro} money={money} paymentType="BuyPackage" />, newDiv);
    }, [props])


    return (
        <>
            <div>
                <div>
                    <p><strong>Nº Créditos: </strong>{stateSub.citas} citas</p>
                    <p><strong>Precio: </strong>{stateSub.precio} €</p>
                    {stateSub.texto ? <p>{stateSub.texto}</p> : <p></p>}
                </div>
                <form>
                    {/* <button className="w-3 h-auto bg-red-300" onClick={handleBuy}>Comprar </button> */}
                </form>
                <div id="paypalDiv"></div>
            </div>


        </>)
}