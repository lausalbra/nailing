import { useRef, useState } from "react";
import Select from 'react-select';
import { postData, getData } from "../../services/common/common";
export function RegistroServiciosCentroForm({ updater }) {

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

    // Auxiliares para la llamada
    const headers = {
        "Content-Type": "application/json",
        "Authorization": "Basic " + btoa(sessionStorage.getItem("userName") + ":" + sessionStorage.getItem("userPassword"))
    }

    const url = "https://nailing-sprint2.herokuapp.com/"
    let suffix = ""

    async function onDropDownChangeType(value) {
        setSelectedType(value)

        switch (value.value) {
            case "tipos":
                suffix = "tipos/all"
                break
            case "bases":
                suffix = "bases/all"
                break
            case "formas":
                suffix = "formas/all"
                break
            case "tamanyos":
                suffix = "tamanyos/all"
                break
            case "disenyos":
                suffix = "disenyos/all"
                break
            case "decoraciones":
                suffix = "decoraciones/all"
                break
            case "acabados":
                suffix = "acabados/all"
                break
            default:
                break
        }

        await getData(url + suffix, headers)
            .then((res) => {
                const options = res.map(op => { return { "value": op, "label": op } })
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

        console.log(selectedType, selectedOptions)

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
            selectedOptions.map(op => { return arrayOptions.push(op.value) })
            const body = {
                "personalizaciones": arrayOptions,
                "tiempo": [tiempo.current.value],
                "coste": [precio.current.value],
                "centro": [sessionStorage.getItem("userCenter")]
            }

            console.log(body)

            await postData(url + suffix, body, headers)
                .then((res) => {
                    console.log(res)
                    alert(`${selectedType.label} añadido con éxito`)
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
                        <input className="border-black border-2  rounded-sm mb-4 w-1/2 text-right" name="precio" type="number" min={0} id="precio" ref={precio} required /> €
                    </div>
                    <div>
                        <label className='text-lg p-3' htmlFor="tiempo">Tiempo:</label>
                        <input className="border-black border-2  rounded-sm mb-4 w-1/2 text-right" name="tiempo" type="number" min={0} id="tiempo" ref={tiempo} required /> min
                    </div>
                </div>
                <div >
                    <input className="border-black border-2 mb-4 cursor-pointer hover:bg-pink-200 hover:border-pink-200 duration-300 rounded-3xl w-full" type="submit" value="Añadir" />
                </div>

                {formState ? <p></p> : <p className="text-sm text-red-500 text-center">¡Debes escoger al menos una opción!</p>}

            </form>

        </>
    )

}