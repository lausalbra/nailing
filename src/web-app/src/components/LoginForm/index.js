import { useRef } from 'react'

export function LoginForm() {

    const user = useRef()
    const password = useRef()

    function handleSubmit(evt) {
        evt.preventDefault()

        if (user.current.value === "user" && password.current.value === "password") {
            sessionStorage.setItem("userLogged", true);
        } else {
            sessionStorage.setItem("userLogged", false);
        }
        console.log(user.current.value, password.current.value)
    }

    return (
        <form className='grid border-2 border-pink-300 p-5 rounded-md' onSubmit={handleSubmit} >
            <label className='text-lg' htmlFor="user"> Usuario:</label>

            <input className="border-black border-2  rounded-sm mb-4" name="user" type="text" ref={user} />
            <label className='text-lg' htmlFor="password">   Contraseña:</label>
            <input className="border-black border-2 mb-4 rounded-sm" name="password" type="password" ref={password} />
            <input className="border-black border-2 mb-4 cursor-pointer hover:bg-pink-200 hover:border-pink-200 duration-300 rounded-3xl" type="submit" value="Enviar" />

        </form>
    )

}