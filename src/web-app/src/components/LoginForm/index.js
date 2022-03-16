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
        <form className='grid border-2 border-red-300 p-5 rounded-md' onSubmit={handleSubmit} >
            <label htmlFor="user"> Usuario:</label>

            <input name="user" className="border-black border-2 mb-4" type="text" ref={user} />
            <label htmlFor="password"> Contraseña:</label>
            <input name="password" className="border-black border-2 mb-4" type="password" ref={password} />
            <input className="border-black border-2 mb-4 cursor-pointer" type="submit" value="Enviar" />

        </form>
    )

}