import { useRef, useState } from "react"
import { putData, postData } from "../../services/common/common"
import { useLocation } from "wouter"
export function EditarUsuarioForm() {

    const user = useRef()
    const password = useRef()
    const email = useRef()
    const telefono = useRef()
    const passwordConfirm = useRef()

    const [state, changeState] = useState("")
    const [locationPath, locationPush] = useLocation()


    async function handleSubmit(evt) {
        evt.preventDefault()
        const isConfirmed = confirmPassword(password.current.value, passwordConfirm.current.value)

        if (isConfirmed) {

            const body = {
                'id': sessionStorage.getItem('userId'),
                'usuario': user.current.value,
                'contrasenya': password.current.value,
                'email': email.current.value,
                'telefono': telefono.current.value,
                'rol': 'USER',
                'centro': null
            }

            const url = "https://nailingtest.herokuapp.com/usuarios/edit"
            const headers = {
                "Content-Type": "application/json",
                "Authorization": "Basic " + btoa(sessionStorage.getItem("userName") + ":" + sessionStorage.getItem("userPassword"))
            }

            await putData(url, body, headers)
                .then(async function (response) {
                    await postData(url, body, headers)
                        .then(function (data) {
                        }
                            //Tiene que ir al catch porque devuelve 204 y lo pilla como error
                        ).catch((error) => {
                            sessionStorage.setItem("userId", "")
                            sessionStorage.setItem("userName", "")
                            sessionStorage.setItem("userPassword", "")
                            sessionStorage.setItem("userEmail", "")
                            sessionStorage.setItem("userPhone", "")
                            sessionStorage.setItem("isLogged", false)
                            alert("Usuario actualizado con éxito, es necesario reiniciar la sesión")
                            locationPush('/')
                        }
                        );
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
                <input className="border-black border-2  rounded-sm mb-4" name="user" type="text" ref={user} required maxLength="100" placeholder={sessionStorage.getItem("userName")} />
                <label className='text-lg' htmlFor="password"> Nueva Contraseña:</label>
                <input className="border-black border-2 mb-4 rounded-sm" name="password" type="password" ref={password} required minLength="8" maxLength="100" />
                <label className='text-lg' htmlFor="passwordConfirm">  Confirmar Nueva Contraseña:</label>
                <input className="border-black border-2 mb-4 rounded-sm" name="passwordConfirm" type="password" ref={passwordConfirm} required minLength="8" maxLength="100" />
                <label className='text-lg' htmlFor="email">   Email:</label>
                <input className="border-black border-2 mb-4 rounded-sm" name="email" type="email" ref={email} required placeholder={sessionStorage.getItem("userEmail")} />
                <label className='text-lg' htmlFor="telefono">  Telefono:</label>
                <input className="border-black border-2 mb-4 rounded-sm" name="telefono" type="tel" ref={telefono} placeholder={sessionStorage.getItem("userPhone")} />
                <p className="text-sm text-red-600" >{state}</p>
                <input className="border-black border-2 mb-4 cursor-pointer hover:bg-pink-200 hover:border-pink-200 duration-300 rounded-3xl" type="submit" placeholder="Enviar" />
            </form>
        </>
    )
}
