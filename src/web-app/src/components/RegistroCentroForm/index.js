import { useRef, useState } from "react"
import { json_provincias } from '../Filter/provincias'
import { postData } from '../../services/common/common'
import { useLocation } from 'wouter'
import Select from 'react-select'

export function RegistroCentroForm() {

    //Atributos de usuario
    const user = useRef()
    const password = useRef()
    const email = useRef()
    const telefono = useRef()
    const passwordConfirm = useRef()

    //Atributos de centro
    const nombre = useRef()
    const imagen = useRef()
    const provincia = useRef()
    const aperturaam = useRef()
    const cierream = useRef()
    const aperturapm = useRef()
    const cierrepm = useRef()

    const [state, changeState] = useState("")
    const [locationPath, locationPush] = useLocation()

    const [stateProvincia, changeStateProvincia] = useState("")
    const [stateHoras, changeStateHora] = useState("")

    async function handleSubmit(evt) {
        evt.preventDefault()

        const urlUser = "https://nailingtest.herokuapp.com/signUp"
        const header = {
            "Content-Type": "application/json"
        }

        const bodyUser = {
            'user': user.current.value,
            'password': password.current.value,
            'email': email.current.value,
            'telefono': telefono.current.value,
        }

        const isConfirmed = confirmPassword(password.current.value, passwordConfirm.current.value)
        const provinciaConfirmada = confirmProvincia(provincia.current.getValue()[0].value, json_provincias)
        const horasConfirmadas = confirmHoras(aperturaam.current.value) && confirmHoras(cierream.current.value) && confirmHoras(aperturapm.current.value) && confirmHoras(cierrepm.current.value)

        if (isConfirmed && horasConfirmadas && provinciaConfirmada) {
            await postData(urlUser, bodyUser, header)
                .then((response) => {

                    console.log(response.status)
                    if (response.status === 500) {
                        changeState("El usuario ya existe. Pruebe con uno nuevo")
                    } else {
                        const urlCentre = "https://nailingtest.herokuapp.com/centros/add/" + response.id;
                        const bodyCentre = {
                            "nombre": nombre.current.value,
                            "imagen": imagen.current.value,
                            "provincia": provincia.current.getValue()[0].value,
                            "aperturaAM": aperturaam.current.value,
                            "cierreAM": cierream.current.value,
                            "aperturaPM": aperturapm.current.value,
                            "cierrePM": cierrepm.current.value,
                            "suscripcion": "BASIC"
                        }

                        if (horasConfirmadas && provinciaConfirmada) {
                            postData(urlCentre, bodyCentre, {
                                "Content-Type": "application/json",
                                "Authorization": "Basic " + btoa(user.usuario + ":" + user.contrasenya)
                            })
                            locationPush("/");

                        }
                    }

                }).catch((e) => {
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

    function confirmProvincia(provincia2, provincias) {
        var array = provincias.filter(x => x.label === provincia2)
        const result = array.length !== 0
        if (!result) {
            changeStateProvincia("Provincia no válida")
        } else {
            changeStateProvincia("")
        }
        return result
    }

    function confirmHoras(hora) {
        let regex = new RegExp(/[0-2]\d:[0-5]\d:[0-5]\d/)
        const result = hora.match(regex)
        if (!result) {
            changeStateHora("Formato de hora no válido")
        } else {
            changeStateHora("")
        }
        return result

    }

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

                <label className='text-lg' htmlFor="nombre"> Nombre centro:</label>
                <input className="border-black border-2  rounded-sm mb-4" name="nombre" type="text" ref={nombre} required />
                <label className='text-lg' htmlFor="imagen">   Imagen:</label>
                <input className="border-black border-2 mb-4 rounded-sm" name="imagen" type="text" ref={imagen} required />
                <label className='text-lg' htmlFor="provincia">   Provincia:</label>
                <Select className="border-black border-2 mb-4 rounded-sm" name="provincia" options={json_provincias} ref={provincia} required />
                <p className="text-sm text-red-600" >{stateProvincia}</p>
                <label className='text-lg' htmlFor="aperturaam">   Hora de apertura horario de mañana:</label>
                <input className="border-black border-2 mb-4 rounded-sm" name="aperturaam" type="text" ref={aperturaam} placeholder="00:00:00" />
                <label className='text-lg' htmlFor="cierream">  Hora de cierre horario de mañana:</label>
                <input className="border-black border-2 mb-4 rounded-sm" name="cierream" type="text" ref={cierream} placeholder="00:00:00" />
                <label className='text-lg' htmlFor="aperturapm">   Hora de apertura horario de tarde:</label>
                <input className="border-black border-2 mb-4 rounded-sm" name="aperturapm" type="text" ref={aperturapm} placeholder="00:00:00" />
                <label className='text-lg' htmlFor="cierrepm">  Hora de cierre horario de tarde:</label>
                <input className="border-black border-2 mb-4 rounded-sm" name="cierrepm" type="text" ref={cierrepm} placeholder="00:00:00" />
                <p className="text-sm text-red-600" >{stateHoras}</p>
                <input className="border-black border-2 mb-4 cursor-pointer hover:bg-pink-200 hover:border-pink-200 duration-300 rounded-3xl" type="submit" value="Enviar" />
            </form>
        </>
    )
}
