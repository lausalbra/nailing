import { UserDetails } from '../../components/UserDetails';
import { Nombre } from '../../components/Nombre';
import fotoPerfil from '../../static/Foto-Perfil.jpg'
import { Header } from "../../components/Header"

export function Usuario() {
    var cryptoJS = require("crypto-js");

    const user = JSON.parse(cryptoJS.AES.decrypt(sessionStorage.getItem("userEncriptado"), "NAILING").toString(cryptoJS.enc.Utf8))


    const name = user.usuario
    const email = user.email
    const phone = user.telefono
    return (
        <>
            <Header />
            <Nombre name={name} ></Nombre>
            <UserDetails image={fotoPerfil} email={email} phone={phone}  ></UserDetails>

        </>



    )
}