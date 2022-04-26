import { useEffect } from "react"
import Paypal from "../Paypal/PayPal"
import ReactDOM from 'react-dom'
import { useLocation } from 'wouter'

export function CreditosAtrasadosComponent() {

    const [locationPath, locationPush] = useLocation()

    if (sessionStorage.getItem("userEncriptado") === null || sessionStorage.getItem("userEncriptado") ===  ""){
        locationPush('/error');
    }

    //Obtengo usuario desencriptado
    var cryptoJS = require("crypto-js");
    const user = JSON.parse(cryptoJS.AES.decrypt(sessionStorage.getItem("userEncriptado"), "NAILING").toString(cryptoJS.enc.Utf8))

    if (user.rol === "USER" || user.rol === "ADMIN"){
        locationPush('/error');
    }

    useEffect(() => {

        let centro = user.centro

        let money = -(centro.creditosrestantes * 0.5)

        centro.creditosrestantes = 0
        centro.pagado = true

        var paypalDiv = document.getElementById("paypalDiv");
        paypalDiv.innerHTML = '';
        var newDiv = document.createElement("div");
        newDiv.className = "w-full flex justify-center";
        paypalDiv.appendChild(newDiv);


        ReactDOM.render(<Paypal json={centro} money={money} paymentType="PagarCreditosAtrasados" />, newDiv);
    })

    return (
        <>
            <div className="text-center m-7">
                <h1 className="text-4xl font-bold p-2"> Creditos Atrasados</h1>
                <h2 className="text-2xl italic p-2"> Por favor, abone el importe antes de solicitar una nueva suscripción </h2>
                <div className="grid lg:grid-rows-1 lg:grid-cols-2 grid-rows-2 grid-cols-1 items-center border-4 border-pink-300 m-0 p-0">
                    <div>
                        <p><strong>Citas extra realizadas: </strong>{-(user.centro.creditosrestantes)}</p>
                        <p><strong>Precio total a pagar: </strong>{-(user.centro.creditosrestantes * 0.5)} €</p>
                    </div>
                    <div id="paypalDiv"></div>
                </div>

            </div>

        </>
    )

}