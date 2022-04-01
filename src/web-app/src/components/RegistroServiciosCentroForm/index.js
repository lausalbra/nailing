import { useRef, useState } from "react";
import Select from 'react-select';

export function RegistroServiciosCentroForm() {

    const optionsPersonalizacion = [
        { value: "esculpidas", label: "Uñas Esculpidas" },
        { value: "naturales", label: "Uñas Naturales" },
    ]

    const optionsEsculpidas = [
        { value: "relleno", label: "Relleno" },
        { value: "nueva", label: "Puesta Nueva" },
    ]

    const optionsNaturales = [
        { value: "semipermanente", label: "Semipermanente" },
        { value: "refuerzo", label: "Semipermanente con Refuerzo" },
        { value: "japonesa", label: "Manicura Japonesa" }
    ]

    const precio = useRef()
    const tiempo = useRef()

    const [selectedType, setSelectedType] = useState();
    const [selectedOptions, setSelectedOptions] = useState();
    const [availableOptions, setAvailableOptions] = useState()
    const [formState, setFormState] = useState(true)


    const onDropDownChangeType = (value) => {
        checkFormState()
        console.log(value)
        setSelectedType(value)
        value.value === 'esculpidas' ? setSelectedOptions(optionsEsculpidas) : setSelectedOptions(optionsNaturales)
    }

    const onDropDownChangeOptions = (value) => {
        console.log("Valores seleccionados", value)
        console.log("Valores Disponibles", availableOptions)
        switch (selectedType.value) {
            case "naturales":
                setAvailableOptions(optionsNaturales)
                break
            case "esculpidas":
                setAvailableOptions(optionsEsculpidas)
                break
            default:
        }

        checkFormState()
        setSelectedOptions(value)
    }

    function checkFormState() {

        if (selectedType === undefined || selectedOptions === undefined || selectedOptions.length === 0) {
            setFormState(false)
        } else {
            setFormState(true)
        }
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()
        checkFormState()
        console.log(selectedType, selectedOptions, precio.current.value, tiempo.current.value)
    }

    return (
        <>
            <form className="grid border-2 border-pink-300 p-5 rounded-md" onSubmit={handleSubmit}>
                <label className='text-lg' htmlFor="name">Selecciona una personalizacion</label>
                <Select className="p-3"
                    value={selectedType}
                    options={optionsPersonalizacion}
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
                        <input className="border-black border-2  rounded-sm mb-4 w-1/2 text-right" name="precio" type="text" id="precio" ref={precio} required /> €
                    </div>
                    <div>
                        <label className='text-lg p-3' htmlFor="tiempo">Tiempo:</label>
                        <input className="border-black border-2  rounded-sm mb-4 w-1/2 text-right" name="tiempo" type="text" id="tiempo" ref={tiempo} required /> min
                    </div>
                </div>
                <div className="center">
                    <input className="border-black border-2 mb-4 cursor-pointer hover:bg-pink-200 hover:border-pink-200 duration-300 rounded-3xl w-1/2" type="submit" value="Añadir" />
                </div>

                {formState ? <p></p> : <p className="text-sm text-red-500">Seleccione un tipo y una o varias opciones de personalizacion</p>}

            </form>

        </>
    )

}