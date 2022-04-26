import { Header } from "../../components/Header"
import { useEffect } from "react"
import { postData } from '../../services/common/common'
import { useLocation } from 'wouter'

export function LogOut() {

    const urlLogout = "https://nailingtest.herokuapp.com/logout"


    const [locationPath, locationPush] = useLocation()


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

    const headers = {
        "Content-Type": "application/json",
        "Authorization": "Basic " + btoa(user.usuario + ":" + user.contrasenya)
    }

    useEffect(() => {

        console.log("Entro")

        const fetchData = async () => {
            await postData(urlLogout, {
                "id": user.id,
                "usuario": user.usuario,
                "contrasenya": user.contrasenya,
                "email": user.email,
                "telefono": user.telefono,
                "rol": user.rol
            }, headers)
                .then(function (__data) {
                    console.log("bien")
                }
                    //Tiene que ir al catch porque devuelve 204 y lo pilla como error
                ).catch((_error) => {
                    alert("Se ha realizado el pago correctamente,. \n Es necesario restaurar la sesión para actualizar sus datos disculpe las molestias. \n Gracias por practicar el Nailing")

                    sessionStorage.setItem("userEncriptado", "")
                    sessionStorage.setItem("isLogged", false)
                    locationPush('/')
                }
                );
        }

        fetchData()
            // make sure to catch any error
            .catch(console.error);


    })


    return (
        <>

            <Header />

        </>
    )
}