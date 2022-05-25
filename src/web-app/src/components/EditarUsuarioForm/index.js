import { useRef, useState } from "react"
import { putData } from "../../services/common/common"
import { useLocation } from "wouter"


export function EditarUsuarioForm() {

    //Obtengo usuario desencriptado
    var cryptoJS = require("crypto-js");
    const userDecrypt = JSON.parse(cryptoJS.AES.decrypt(sessionStorage.getItem("userEncriptado"), "NAILING").toString(cryptoJS.enc.Utf8))

    const [state, changeState] = useState("")
    const [locationPath, locationPush] = useLocation()

    console.log(locationPath);

    const [userState, changeUserState] = useState(userDecrypt.usuario)
    const [passwordState, changePasswordState] = useState(userDecrypt.contrasenya)
    const [passwordConfirmState, changePasswordConfirmState] = useState(userDecrypt.contrasenya)
    const [telefonoState, changeTelefonoState] = useState(userDecrypt.telefono)
    const [emailState, changeEmailState] = useState(userDecrypt.email)


    async function handleSubmit(evt) {
        evt.preventDefault()
        const isConfirmed = confirmPassword(passwordState, passwordConfirmState)

        if (isConfirmed) {

            const body = {
                'id': userDecrypt.id,
                'usuario': userState,
                'contrasenya': passwordState,
                'email': emailState,
                'telefono': telefonoState,
                'rol': userDecrypt.rol,
                'centro': null
            }

            const url = "https://nailing-sprint5.herokuapp.com/usuarios/edit"
            const headers = {
                "Content-Type": "application/json",
                "Authorization": "Basic " + btoa(userDecrypt.usuario + ":" + userDecrypt.contrasenya)
            }

            await putData(url, body, headers)
                .then(async function (_response) {
                    sessionStorage.setItem("userId", "")
                    sessionStorage.setItem("userName", "")
                    sessionStorage.setItem("userPassword", "")
                    sessionStorage.setItem("userEmail", "")
                    sessionStorage.setItem("userPhone", "")
                    sessionStorage.setItem("isLogged", false)
                    alert("Usuario actualizado con éxito, es necesario reiniciar la sesión")
                    locationPush('/')
                })
                .catch((e) => {
                    console.log(e)
                })
        }
    }

    function confirmPassword(password1, password2) {
        const result = password1 === password2
        if (!result) {
            changeState("Las contraseñas no coinciden")
        } else {
            changeState("")
        }
        return result
    }



    /*
    Validaciones: 
        - nombre de usuario : not null, max 100
        - password: not null, min 8, max 100
        - email: not null
        - telephone: 
    */

    return (
        <>
            <form className='grid border-2 border-pink-300 p-5 rounded-md' onSubmit={handleSubmit} >
                <label className='text-lg' htmlFor="user"> Nombre de Usuario:</label>
                <input className="border-black border-2  rounded-sm mb-4" name="user" type="text" required maxLength="100" value={userState} onChange={ev => { changeUserState(ev.target.value) }} />
                <label className='text-lg' htmlFor="password"> Nueva Contraseña:</label>
                <input className="border-black border-2 mb-4 rounded-sm" name="password" type="password" required minLength="8" maxLength="100" value={passwordState} onChange={ev => { changePasswordState(ev.target.value) }} />
                <label className='text-lg' htmlFor="passwordConfirm">  Confirmar Nueva Contraseña:</label>
                <input className="border-black border-2 mb-4 rounded-sm" name="passwordConfirm" type="password" required minLength="8" maxLength="100" value={passwordConfirmState} onChange={ev => { changePasswordConfirmState(ev.target.value) }} />
                <label className='text-lg' htmlFor="email">   Email:</label>
                <input className="border-black border-2 mb-4 rounded-sm" name="email" type="email" required value={emailState} onChange={ev => { changeEmailState(ev.target.value) }} />
                <label className='text-lg' htmlFor="telefono">  Telefono:</label>
                <input className="border-black border-2 mb-4 rounded-sm" name="telefono" type="tel" pattern="[0-9]{9}" title=" Un teléfono se compone de 9 cifras (Ejemplo 123456789)" value={telefonoState} onChange={ev => { changeTelefonoState(ev.target.value) }} required/>
                <p className="text-sm text-red-600" >{state}</p>
                <input className="border-black border-2 mb-4 cursor-pointer hover:bg-pink-200 hover:border-pink-200 duration-300 rounded-3xl" type="submit" placeholder="Enviar"/>
            </form>
        </>
    )
}
