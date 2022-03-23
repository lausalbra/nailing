import { useRef, useState } from 'react'
import { useLocation } from 'wouter'
import { httpRequest } from '../../services/common/commonService'

export function LoginForm() {

    const [state, changeState] = useState(true)
    const [locationPath, locationPush] = useLocation()
    const user = useRef()
    const password = useRef()

    const mock = {
        "user": "admin",
        "password": "password",
        "mail": "mockedMail@gmail.com",
        "phone": 601326967
    }

    function handleSubmit(evt) {
        evt.preventDefault()
        const url = "https://nailingtest.herokuapp.com/login"
        const body = {
            "user": user,
            "password": password
        }
        const userLogged = httpRequest('POST', url, [], body)


        if (userLogged.getResponseHeader('status') === 200) {
            //Añado el id y el estado isLogged
            sessionStorage.setItem("userLogged", userLogged);
            sessionStorage.setItem("isLogged", true);

            //Aqui hago get del usuario para obtener sus datos
            const url = `https://nailingtest.herokuapp.com/usuarios/${userLogged}`
            // Cabezera authorization generada con https://www.blitter.se/utils/basic-authentication-header-generator/ y datos usuario1 usuario1
            const data = httpRequest('GET', url, ["Authorization: Basic dXN1YXJpbzE6dXN1YXJpbzE="], "")
            sessionStorage.setItem("userName", data.nombre);
            sessionStorage.setItem("userEmail", data.email);
            sessionStorage.setItem("userPhone", data.telefono);
            changeState(true)
            locationPush('/')
        } else {
            changeState(false)

        }
        console.log(user.current.value, password.current.value)
    }

    return state ? (
        <form className='grid border-2 border-pink-300 p-5 rounded-md' onSubmit={handleSubmit} >
            <label className='text-lg' htmlFor="user"> Usuario:</label>
            <input className="border-black border-2  rounded-sm mb-4" name="user" type="text" ref={user} />
            <label className='text-lg' htmlFor="password">   Contraseña:</label>
            <input className="border-black border-2 mb-4 rounded-sm" name="password" type="password" ref={password} />
            <input className="border-black border-2 mb-4 cursor-pointer hover:bg-pink-200 hover:border-pink-200 duration-300 rounded-3xl" type="submit" value="Enviar" />
        </form>
    )
        :
        (<form className='grid border-2 border-pink-300 p-5 rounded-md' onSubmit={handleSubmit} >
            <label className='text-lg' htmlFor="user"> Usuario:</label>

            <input className="border-black border-2  rounded-sm mb-4" name="user" type="text" ref={user} required minLength={1} maxLength={100} />
            <label className='text-lg' htmlFor="password">   Contraseña:</label>
            <input className="border-black border-2 mb-4 rounded-sm" name="password" type="password" ref={password} required minLength={8} maxLength={100} />
            < p className='text-sm text-red-600 pb-2' > Usuario o Contraseña No Válidos</p>
            <input className="border-black border-2 mb-4 cursor-pointer hover:bg-pink-200 hover:border-pink-200 duration-300 rounded-3xl" type="submit" value="Enviar" />

        </form >)

}
