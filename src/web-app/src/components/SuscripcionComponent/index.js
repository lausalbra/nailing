import { useEffect, useState } from "react";
import Paypal from "../Paypal/PayPal"
import { putData, getData } from '../../services/common/common'

export function SuscripciónComponent(props) {

    const [stateSub, changeStateSub] = useState("")

    useEffect(() => {
        switch (props.tipo) {
            case "basico":
                console.log("He entrado")
                changeStateSub({
                    "tipo": "BASIC",
                    "label": "Suscripción Básica",
                    "citas": 150,
                    "precio": 25
                })
                break
            case "medio":
                changeStateSub({
                    "tipo": "MEDIUM",
                    "label": "Suscripción Media",
                    "citas": 200,
                    "precio": 45
                })
                break
            case "avanzado":
                changeStateSub({
                    "tipo": "ADVANCE",
                    "label": "Suscripción Avanzada",
                    "citas": 300,
                    "precio": 65
                })
                break
            case "premium":
                changeStateSub({
                    "tipo": "PREMIUM",
                    "label": "Suscripción Premium",
                    "citas": 400,
                    "precio": 100,
                    "texto": "¡Promocion especial de tu negocio!"
                })
                break
            default:
        }
    }, [props])


    async function handleBuy(evt) {

        evt.preventDefault()

        const headers = {
            "Content-Type": "application/json",
            "Authorization": "Basic " + btoa(sessionStorage.getItem("userName") + ":" + sessionStorage.getItem("userPassword"))
        }
        const urlShowCentro = "https://nailingtest.herokuapp.com/centros/show/" + sessionStorage.getItem("userCenter");
        let centro = await getData(urlShowCentro, headers)
            .then(res => {
                return res
            }).catch(ex => {
                console.log(ex)
            })
        console.log(centro)


        centro.creditosrestantes = stateSub.citas
        centro.suscripcion = stateSub.tipo

        const urlEditCentro = "https://nailingtest.herokuapp.com/centros/edit"
        const res = await putData(urlEditCentro, centro, headers)
            .then(res => {
                return res
            }).catch(ex => {
                console.log(ex)
            })

        console.log(res)

    }


    return (
        <>
            <div>
                <div>
                    <p><strong>Nº Créditos: </strong>{stateSub.citas} citas</p>
                    <p><strong>Precio: </strong>{stateSub.precio} €</p>
                    {stateSub.texto ? <p>{stateSub.texto}</p> : <p></p>}
                </div>
                <form>
                    <button className="w-3 h-auto bg-red-300" onClick={handleBuy}>Comprar </button>
                </form>
                <div><Paypal json="" money="35" paymentType="BuyPackage" /></div>
            </div>


        </>)
}