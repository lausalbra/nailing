import { useRef, useState, useEffect } from 'react'
import { useLocation } from 'wouter'
import { postData } from '../../services/common/common'

export function LoginForm() {

    const user = useRef()
    const password = useRef()
    const [state, changeState] = useState(true)
    const [locationPath, locationPush] = useLocation()
    const headers = {
        "Content-Type": "application/json",
        "Authorization": "Basic " + btoa(sessionStorage.getItem("userName") + ":" + sessionStorage.getItem("userPassword"))
    }

    useEffect(() => {
        if (sessionStorage.getItem("isLogged") === 'true') {
            locationPush("/")
        }
    })

    async function handleSubmit(evt) {
        evt.preventDefault()

        const url = "https://nailingtest.herokuapp.com/login"
        const body = {
            "user": user.current.value,
            "password": password.current.value
        }

        await postData(url, body, {
            "Content-Type": "application/json",
        })
            .then(async function (data) {

                const user = data

                sessionStorage.setItem("userId", user.id)
                sessionStorage.setItem("userName", user.usuario)
                sessionStorage.setItem("userPassword", password.current.value)
                sessionStorage.setItem("userPasswordCoded", user.password)
                sessionStorage.setItem("userEmail", user.email)
                sessionStorage.setItem("userPhone", user.telefono)
                sessionStorage.setItem("userRole", user.rol)
                sessionStorage.setItem("userCenter", user.rol === "OWNER" ? user.centro.id : "")
                sessionStorage.setItem("isLogged", true)

                //Hago la llamada con oauth

                await postData(url, body, headers)

                locationPush('/')
            }
            ).catch(
                setTimeout(() => {
                    changeState(false)
                }, 750)
            );



    }

    return state ? (
        <form className='grid border-2 border-pink-300 p-5 rounded-md' onSubmit={handleSubmit} >
            <label className='text-lg' htmlFor="user"> Usuario:</label>
            <input className="border-black border-2  rounded-sm mb-4" name="user" type="text" ref={user} required minLength="2" maxLength="100" />
            <label className='text-lg' htmlFor="password">   Contraseña:</label>
            <input className="border-black border-2 mb-4 rounded-sm" name="password" type="password" ref={password} required minLength="2" maxLength="100" />
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