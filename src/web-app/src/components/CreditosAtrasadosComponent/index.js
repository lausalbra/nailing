import { useEffect } from "react"
import Paypal from "../Paypal/PayPal"

export function CreditosAtrasadosComponent() {
    const citasExtra = 5

    const postbody = JSON.stringify({
        "citasExtra": 5,
        "coste": 5 * 0.5
    })

    return (
        <>
            <div className="text-center m-7">
                <h1 className="text-4xl font-bold p-2"> Creditos Atrasados</h1>
                <h2 className="text-2xl italic p-2"> Por favor, abone el importe antes de solicitar una nueva suscripción </h2>
                <div className="grid grid-rows-1 grid-cols-2 items-center border-4 border-pink-300 m-0 p-0">
                    <div>
                        <p><strong>Citas extra realizadas: </strong>{citasExtra}</p>
                        <p><strong>Precio total a pagar: </strong>{citasExtra * 0.5} €</p>
                    </div>
                    <div className="max-w-xs p-2">{Paypal(postbody)}</div>
                </div>

            </div>

        </>
    )

}