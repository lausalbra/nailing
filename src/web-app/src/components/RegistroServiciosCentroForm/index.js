import { useRef, useState } from "react";
import Select from 'react-select';
import { postData, getData } from "../../services/common/common";


export function RegistroServiciosCentroForm({ updater, listTipos, listBases, listDisenos, listFormas, listTamanos, listDecoraciones, listAcabados }) {

    //Obtengo usuario desencriptado
    var cryptoJS = require("crypto-js");
    const user = JSON.parse(cryptoJS.AES.decrypt(sessionStorage.getItem("userEncriptado"), "NAILING").toString(cryptoJS.enc.Utf8))
    //Al añadir personalizaciones de tamaño: updater['tamanyos']()

    // Fases a seleccionar
    const optionsFases = [
        { value: "tipos", label: "Tipo de Manicura" },
        { value: "bases", label: "Material / Base" },
        { value: "formas", label: "Formas" },
        { value: "tamanyos", label: "Tamaños" },
        { value: "disenyos", label: "Diseños" },
        { value: "decoraciones", label: "Decoraciones" },
        { value: "acabados", label: "Acabados" },
    ]

    // Capturo el precio y el tiempo indicados en formulario
    const precio = useRef()
    const tiempo = useRef()

    // Estados del componente 
    const [selectedType, setSelectedType] = useState();
    const [selectedOptions, setSelectedOptions] = useState();
    const [availableOptions, setAvailableOptions] = useState()
    const [formState, setFormState] = useState(true)
    const [optionsEmpty, changeOptionsEmpty] = useState(false)

    // Auxiliares para la llamada
    const headers = {
        "Content-Type": "application/json",
        "Authorization": "Basic " + btoa(user.usuario + ":" + user.contrasenya)
    }

    const url = "https://nailing-sprint3.herokuapp.com/"
    let suffix = ""

    async function onDropDownChangeType(value) {
        setSelectedType(value)

        let escogidos

        switch (value.value) {
            case "tipos":
                suffix = "tipos/all"
                escogidos = listTipos
                break
            case "bases":
                suffix = "bases/all"
                escogidos = listBases
                break
            case "formas":
                suffix = "formas/all"
                escogidos = listFormas
                break
            case "tamanyos":
                suffix = "tamanyos/all"
                escogidos = listTamanos
                break
            case "disenyos":
                suffix = "disenyos/all"
                escogidos = listDisenos
                break
            case "decoraciones":
                suffix = "decoraciones/all"
                escogidos = listDecoraciones
                break
            case "acabados":
                suffix = "acabados/all"
                escogidos = listAcabados
                break
            default:
                break
        }

        escogidos = escogidos.map(x => { return x.nombre })

        let opcionesVacias = 0

        await getData(url + suffix, headers)
            .then((res) => {

                console.log("ESCOGIDOS", escogidos)

                let options = res.map(op => {

                    console.log("OP", op)

                    if (!escogidos.includes(op)) {
                        return { "value": op, "label": op.replaceAll("_", " ") }

                    } else {
                        opcionesVacias++
                    }
                })

                options.length === opcionesVacias ? changeOptionsEmpty(true) : changeOptionsEmpty(false)

                console.log("OPTIONS", options)
                console.log("OPTIONS TYPE", typeof options)

                setAvailableOptions(options)
                setSelectedOptions(options)
            }).catch((ex) => {
                console.log(ex)
            })

    }

    const onDropDownChangeOptions = (value) => {
        setSelectedOptions(value)
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault()

        if (selectedType === undefined || selectedOptions === undefined || selectedOptions.length === 0) {
            setFormState(false)
        } else {
            setFormState(true)
            switch (selectedType.value) {
                case "tipos":
                    suffix = "tipos/add/centro"
                    break
                case "bases":
                    suffix = "bases/add/centro"
                    break
                case "formas":
                    suffix = "formas/add/centro"
                    break
                case "tamanyos":
                    suffix = "tamanyos/add/centro"
                    break
                case "disenyos":
                    suffix = "disenyos/add/centro"
                    break
                case "decoraciones":
                    suffix = "decoraciones/add/centro"
                    break
                case "acabados":
                    suffix = "acabados/add/centro"
                    break
                default:
                    break
            }

            const arrayOptions = []
            selectedOptions.map(op => {

                if (typeof op !== 'undefined') {
                    return arrayOptions.push(op.value)
                }

            })
            const body = {
                "personalizaciones": arrayOptions,
                "tiempo": [tiempo.current.value],
                "coste": [precio.current.value],
                "centro": [user.centro.id.toString()]
            }


            await postData(url + suffix, body, headers)
                .then((res) => {
                    alert(`${selectedType.label} añadido con éxito`)
                    precio.current.value = ""
                    tiempo.current.value = ""
                    setSelectedType("")
                    setSelectedOptions("")
                    updater[selectedType.value]()
                }).catch((ex) => {
                    console.log(ex)
                })
        }

    }

    return (
        <>
            <form className="grid border-2 border-pink-300 p-5 rounded-md max-w-xl" onSubmit={handleSubmit}>
                <label className='text-lg' htmlFor="name">Selecciona una personalizacion</label>
                <Select className="p-3"
                    value={selectedType}
                    options={optionsFases}
                    onChange={onDropDownChangeType}
                />

                <label className='text-lg' htmlFor="name">¡Elige tus opciones!</label>
                <Select className="p-3"
                    isMulti
                    value={selectedOptions}
                    options={availableOptions}
                    onChange={onDropDownChangeOptions}
                />

                <div className="grid grid-rows grid-cols-2 items-center">
                    <div>
                        <label className='text-lg p-3' htmlFor="precio">Precio:</label>
                        <input className="border-black border-2  rounded-sm mb-4 w-1/2 text-right" name="precio" type="number" min={1} id="precio" ref={precio} required /> €
                    </div>
                    <div>
                        <label className='text-lg p-3' htmlFor="tiempo">Tiempo:</label>
                        <input className="border-black border-2  rounded-sm mb-4 w-1/2 text-right" name="tiempo" type="number" min={1} id="tiempo" ref={tiempo} required /> min
                    </div>
                </div>
                <div >
                    <input className="border-black border-2 mb-4 cursor-pointer hover:bg-pink-200 hover:border-pink-200 duration-300 rounded-3xl w-full" type="submit" value="Añadir" />
                </div>

                {formState ? <p></p> : <p className="text-sm text-red-500 text-center">¡Debes escoger al menos una opción!</p>}
                {console.log(optionsEmpty)}
                {optionsEmpty ? <p className="text-sm text-red-500 text-center">Ya están escogidas todas las opciones</p> : <p></p>}

            </form>

        </>
    )

}