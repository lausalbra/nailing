import { useRef, useState } from 'react'
import { useLocation } from 'wouter'

export function LoginForm() {

    const user = useRef()
    const password = useRef()

    const [state, changeState] = useState(true)
    const [locationPath, locationPush] = useLocation()

    const mock = {
        "user": "admin",
        "password": "password",
        "mail": "mockedMail@gmail.com",
        "phone": 601326967
    }

    function handleSubmit(evt) {
        evt.preventDefault()

        if (user.current.value === mock.user && password.current.value === mock.password) {
            sessionStorage.setItem("userLogged", mock);
            changeState(true)
            locationPush('/')
        } else {
            sessionStorage.setItem("userLogged", false);
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

            <input className="border-black border-2  rounded-sm mb-4" name="user" type="text" ref={user} />
            <label className='text-lg' htmlFor="password">   Contraseña:</label>
            <input className="border-black border-2 mb-4 rounded-sm" name="password" type="password" ref={password} />
            < p className='text-sm text-red-600' > Usuario o Contraseña No Válidos</p>
            <input className="border-black border-2 mb-4 cursor-pointer hover:bg-pink-200 hover:border-pink-200 duration-300 rounded-3xl" type="submit" value="Enviar" />

        </form >)


}