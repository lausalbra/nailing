import { useEffect, useState } from "react";
import Paypal from "../Paypal/PayPal"
import { putData, postData } from '../../services/common/common'
import { useLocation } from 'wouter'
import ReactDOM from 'react-dom'

export function SuscripciónComponent(props) {

    const [locationPath, locationPush] = useLocation()


    //Obtengo usuario desencriptado
    var cryptoJS = require("crypto-js");
    const user = JSON.parse(cryptoJS.AES.decrypt(sessionStorage.getItem("userEncriptado"), "NAILING").toString(cryptoJS.enc.Utf8))

    let centro = user.centro

    console.log("CENTRO DEL USUARIO", centro)

    const [stateSub, changeStateSub] = useState("")
    // const [stateCentro, changeCentro] = useState(centro)

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
                    "tipo": "ADVANCE",
                    "label": "Suscripción Avanzada",
                    "citas": 200,
                    "precio": 65
                })
                centro.suscripcion = "ADVANCE"
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

        var paypalDiv = document.getElementById("paypalDiv");
        paypalDiv.innerHTML = '';
        var newDiv = document.createElement("div");
        newDiv.className = "w-full flex justify-center";
        paypalDiv.appendChild(newDiv);
        ReactDOM.render(<Paypal json={centro} money={money} paymentType="BuyPackage" />, newDiv);


    }, [props])


    //  ESTE BOTÓN FUNCIONA PERFE PARA COMPRAR

    // async function handleBuy(evt) {

    //     evt.preventDefault()

    //     const headers = {
    //         "Content-Type": "application/json",
    //         "Authorization": "Basic " + btoa(user.usuario + ":" + user.contrasenya)
    //     }


    //     centro.creditosrestantes = stateSub.citas
    //     centro.suscripcion = stateSub.tipo
    //     centro.pagado = true

    //     console.log("CENTRO MODIFICADO", centro)

    //     changeCentro(centro)

    //     const urlEditCentro = "https://nailingtest.herokuapp.com/centros/edit"
    //     const res = await putData(urlEditCentro, centro, headers)
    //         .then(res => {

    //             alert("Se ha realizado su compra correctamente \n Es necesario restaurar la sesión para actualizar sus datos \n Disculpe las molestias \n Muchas gracias por confiar en Nailing")

    //             return res
    //         }).catch(ex => {
    //             console.log(ex)
    //         })



    //     const url = "https://nailingtest.herokuapp.com/logout"

    //     const body = {
    //         "id": user.id,
    //         "usuario": user.usuario,
    //         "contrasenya": user.contrasenya,
    //         "email": user.email,
    //         "telefono": user.telefono,
    //         "rol": user.rol
    //     }

    //     console.log(body)

    //     await postData(url, body, headers)
    //         .then(function (data) {
    //         }
    //             //Tiene que ir al catch porque devuelve 204 y lo pilla como error
    //         ).catch((error) => {
    //             sessionStorage.setItem("userEncriptado", "")
    //             sessionStorage.setItem("isLogged", false)
    //             locationPush('/')
    //         }
    //         );

    // }


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