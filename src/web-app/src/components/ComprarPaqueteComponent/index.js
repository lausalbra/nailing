import Select from 'react-select';
import {  useState } from "react";
import { SuscripciónComponent } from '../SuscripcionComponent';
import { useLocation } from 'wouter'

export function ComprarPaqueteComponent() {

    const [locationPath, locationPush] = useLocation()
    console.log(locationPath);
    if (sessionStorage.getItem("userEncriptado") === null || sessionStorage.getItem("userEncriptado") === ""){
        locationPush('/error');
    }

    //Obtengo usuario desencriptado
    var cryptoJS = require("crypto-js");
    const user = JSON.parse(cryptoJS.AES.decrypt(sessionStorage.getItem("userEncriptado"), "NAILING").toString(cryptoJS.enc.Utf8))

    if (user.rol === "USER" || user.rol === "ADMIN"){
        locationPush('/error');
    }

    const options = [
        { value: "basico", label: "Suscripción Básica" },
        { value: "medio", label: "Suscripción Media" },
        { value: "avanzado", label: "Suscripción Avanzada" },
        { value: "premium", label: "Suscripción Premium" },
    ]

    const [selectedSub, changeSelectedSub] = useState("")

    const handleChangeSub = (value) => {
        console.log(value)
        changeSelectedSub(value)
    }

    const handleSubmit = ((evt) => {
        console.log(evt)
    })

    return (
        <>
            <div className="grid border-2 text-center border-pink-300 p-5 rounded-md max-w-xl">
                <form onSubmit={handleSubmit}>
                    <label className='text-lg' htmlFor="name">Selecciona una personalizacion</label>
                    <Select className="p-3"
                        menuPortalTarget={document.body}
                        menuPosition="fixed"
                        value={selectedSub}
                        options={options}
                        onChange={handleChangeSub}
                        styles={{
                            menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
                            menu: (provided) => ({ ...provided, zIndex: 9999 })
                        }}
                    />
                </form>



                {selectedSub === "" ?
                    <div className='pt-2'>¡Seleccione una Suscripción!</div> : <SuscripciónComponent tipo={selectedSub.value} />}
            </div>

        </>
    )

}