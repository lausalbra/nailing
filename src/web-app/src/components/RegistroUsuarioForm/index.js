import { useRef, useState } from "react"
import { postData } from "../../services/common/common"
import { useLocation } from "wouter"
export function RegistroUsuarioForm() {

    const user = useRef()
    const password = useRef()
    const email = useRef()
    const telefono = useRef()
    const passwordConfirm = useRef()

    const [state, changeState] = useState("")
    const [locationPath, locationPush] = useLocation()
    console.log(locationPath);
    async function handleSubmit(evt) {
        evt.preventDefault()

        const url = "https://nailingtest.herokuapp.com/signUp"
        const header = {
            "Content-Type": "application/json"
        }

        const body = {
            'user': user.current.value,
            'password': password.current.value,
            'email': email.current.value,
            'telefono': telefono.current.value,
        }

        const isConfirmed = confirmPassword(password.current.value, passwordConfirm.current.value)
        const telefonoConfirmed = confirmTelefono(telefono.current.value)

        if (isConfirmed && telefonoConfirmed) {
            await postData(url, body, header)
                .then((response) => {

                    console.log(response.status)
                    if (response.status === 500) {
                        changeState("El usuario ya existe. Pruebe con uno nuevo")
                    } else {
                        alert("Usuario creado con éxito")
                        locationPush("/login")
                        console.log(response)
                        changeState("")
                    }

                }).catch((e) => {
                    console.log(e)
                })
        }



        // console.log(user.current.value, password.current.value, passwordConfirm.current.value, email.current.value, telefono.current.value)
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

    function confirmTelefono(_telefono) {
        let regex = new RegExp(/\d{9}$/)
        const result = _telefono.match(regex)
        if (!result) {
            changeState("El telefono no tiene el formato correcto, 9 números enteros")
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
                <input className="border-black border-2  rounded-sm mb-4" name="user" type="text" ref={user} required maxLength="100" />
                <label className='text-lg' htmlFor="password">   Contraseña:</label>
                <input className="border-black border-2 mb-4 rounded-sm" name="password" type="password" ref={password} required minLength="8" maxLength="100" />
                <label className='text-lg' htmlFor="passwordConfirm">  Confirmar Contraseña:</label>
                <input className="border-black border-2 mb-4 rounded-sm" name="passwordConfirm" type="password" ref={passwordConfirm} required minLength="8" maxLength="100" />
                <label className='text-lg' htmlFor="email">   Email:</label>
                <input className="border-black border-2 mb-4 rounded-sm" name="email" type="email" ref={email} required />
                <label className='text-lg' htmlFor="telefono">  Telefono:</label>
                <input className="border-black border-2 mb-4 rounded-sm" name="telefono" type="tel" ref={telefono} pattern="[0-9]{9}" required />
                <p className="text-sm text-red-600" >{state}</p>
                <p className="text-sm " >Al registrarte aceptas nuestros <a className="underline" href="/terminoscondiciones">Terminos y Condiciones</a></p>
                <input className="border-black border-2 mb-4 cursor-pointer hover:bg-pink-200 hover:border-pink-200 duration-300 rounded-3xl" type="submit" value="Enviar" placeholder="123456789" />
            </form>
        </>
    )
}
