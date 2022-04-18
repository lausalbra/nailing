import { useEffect, useState } from "react";
import Paypal from "../Paypal/PayPal"

export function SuscripciónComponent(props) {

    const [stateSub, changeStateSub] = useState("")

    useEffect(() => {
        switch (props.tipo) {
            case "basico":
                console.log("He entrado")
                changeStateSub({
                    "tipo": "basico",
                    "label": "Suscripción Básica",
                    "citas": 150,
                    "precio": 25
                })
                break
            case "medio":
                changeStateSub({
                    "tipo": "medio",
                    "label": "Suscripción Media",
                    "citas": 200,
                    "precio": 45
                })
                break
            case "avanzado":
                changeStateSub({
                    "tipo": "avanzado",
                    "label": "Suscripción Avanzada",
                    "citas": 300,
                    "precio": 65
                })
                break
            case "premium":
                changeStateSub({
                    "tipo": "premium",
                    "label": "Suscripción Premium",
                    "citas": 400,
                    "precio": 100,
                    "texto": "¡Promocion especial de tu negocio!"
                })
                break
            default:
        }
    }, [props])


    return (
        <>
            <div>
                <div>
                    <p><strong>Nº Créditos: </strong>{stateSub.citas} citas</p>
                    <p><strong>Precio: </strong>{stateSub.precio} €</p>
                    {stateSub.texto ? <p>{stateSub.texto}</p> : <p></p>}
                </div>
                <div>{Paypal(JSON.stringify(""))}</div>
            </div>


        </>)
}