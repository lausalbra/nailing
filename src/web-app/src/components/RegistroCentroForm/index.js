import { useRef, useState } from "react"
import { json_provincias } from '../Filter/provincias'
import ReactDOM from 'react-dom'
import Paypal from '../Paypal/PayPal';
import Select from 'react-select'

export function RegistroCentroForm() {

    //Atributos de centro
    const nombre = useRef()
    const imagen = useRef()
    const provincia = useRef()
    const aperturaam = useRef()
    const cierream = useRef()
    const aperturapm = useRef()
    const cierrepm = useRef()
    const suscripcion = useRef()

    const [stateProvincia, changeStateProvincia] = useState("")
    const [stateHoras, changeStateHora] = useState("")
    const [stateImagen, changeStateImagen] = useState("")

    const planes = [{ label: 'Básico', value: 'BASIC' },
      { label: 'Intermedio', value: 'MEDIUM' },
      { label: 'Avanzado', value: 'ADVANCED' },
      { label: 'Premium', value: 'PREMIUM' }
    ]
    
    const optionsDias = [
        { value: "MONDAY", label: "Lunes" },
        { value: "TUESDAY", label: "Martes" },
        { value: "WEDNESDAY", label: "Miércoles" },
        { value: "THURSDAY", label: "Jueves" },
        { value: "FRIDAY", label: "Viernes" },
        { value: "SATURDAY", label: "Sábado" },
        { value: "SUNDAY", label: "Domingo" },
    ]

    const [stateDiasApertura, changeStateDiasApertura] = useState(optionsDias)

    async function handleSubmit(evt) {
        evt.preventDefault()
        const provinciaConfirmada = confirmProvincia(provincia.current.getValue()[0].value, json_provincias)
        const horasConfirmadas = confirmHoras(aperturaam.current.value) && confirmHoras(cierream.current.value) && confirmHoras(aperturapm.current.value) && confirmHoras(cierrepm.current.value)
        const horasConfirmadasIncongruencias = confirmHorasIncongruencias(aperturaam.current.value, cierream.current.value, aperturapm.current.value, cierrepm.current.value);
        const imagenConfirmada = confirmImage(imagen.current.value)
        var planValidated = false;
        if (planes.filter((sus) => sus.value===suscripcion.current.getValue()[0].value).length !== 0){
            planValidated = true;
        }
        
        let diasString
        stateDiasApertura.map((dia) => {
            diasString += `,${dia.value}`;
            return diasString
        })
        diasString = diasString.slice(10, diasString.length)
        console.log(diasString)

        var money = 0;
        var credits = 0;
        switch (suscripcion.current.getValue()[0].value)
        {
            case "BASIC":
                money = 25;
                credits = 100;
                break;
            case "MEDIUM":
                money = 45;
                credits = 150;
                break;
            case "ADVANCED":
                money = 65;
                credits = 200;
                break;
            case "PREMIUM":
                money = 100;
                credits = 250;
                break;
            default:
                break;
        }

        let imagenUrl = "";
        if (imagen.current.value != null){
            imagenUrl = imagen.current.value
        } 
      
        if (horasConfirmadas && provinciaConfirmada && planValidated && imagenConfirmada && horasConfirmadasIncongruencias) {
            const bodyCentre = {
            "nombre": nombre.current.value,
            "imagen": imagenUrl,
            "provincia": provincia.current.getValue()[0].value,
            "aperturaAM": aperturaam.current.value,
            "cierreAM": cierream.current.value,
            "aperturaPM": aperturapm.current.value,
            "cierrePM": cierrepm.current.value,
            "diasDisponible": diasString,
            "suscripcion": suscripcion.current.getValue()[0].value,
            "creditosrestantes": credits,
            "ultimaSuscripcion": new Date(),
            "pagado": true,
            "valoracionMedia": 0,
            "valoracionTotal": 0,
            "numValoraciones": 0
            }
        
            var paypalDiv = document.getElementById("paypalDiv");
            paypalDiv.innerHTML = '';
            var newDiv = document.createElement("div");
            newDiv.className = "w-full flex justify-center";
            paypalDiv.appendChild(newDiv);
            ReactDOM.render(<Paypal json={bodyCentre} money={money} paymentType="NewCentre" />, newDiv);
        }
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

    function confirmHorasIncongruencias(aperturaAM, cierreAM, aperturaPM, cierrePM) {
        var aperturaAMDate = new Date('0000-01-01 ' + aperturaAM);
        var cierreAMDate = new Date('0000-01-01 ' + cierreAM);
        var aperturaPMDate = new Date('0000-01-01 ' + aperturaPM);
        var cierrePMDate = new Date('0000-01-01 ' + cierrePM);
        const result1 = aperturaAMDate < cierreAMDate && aperturaAMDate < aperturaPMDate && aperturaAMDate < cierrePMDate;
        const result2 = cierreAMDate < aperturaPMDate && cierreAMDate < cierrePMDate;
        const result3 = aperturaPMDate < cierrePMDate;
        if (!result1) {
            changeStateHora("La hora de apertura AM debe ser anterior a todas");
        } else if (!result2){
            changeStateHora("La hora de cierre AM debe ser anterior a las PM");
        } else if (!result3){
            changeStateHora("La hora de apertura PM debe ser anterior a la de cierre PM");
        } else {
            changeStateHora("")
        }
        return result1 && result2 && result3
    }

    function confirmImage(image) {
        const result = image.includes("https://");
        if (!result){
            changeStateImagen("Formato de imagen invalido, debe ser una URL");
        } else {
            changeStateImagen("");
        }
        return result;
    }

    const handleChangeDiasApertura = (value) => {
        changeStateDiasApertura(value)
        console.log(value)
    }
    return (
        <>
            <form className='grid border-2 border-pink-300 p-5 rounded-md' onSubmit={handleSubmit} >
                <label className='text-lg' htmlFor="nombre"> Nombre centro:</label>
                <input className="border-black border-2  rounded-sm mb-4" name="nombre" type="text" ref={nombre} required />
                <label className='text-lg' htmlFor="imagen">   Imagen:</label>
                <input className="border-black border-2 mb-4 rounded-sm" name="imagen" type="text" placeholder="https://i.imgur.com/vPk5Wv2.jpeg" ref={imagen} required/>
                <p className="text-sm text-red-600" >{stateImagen}</p>
                <label className='text-lg' htmlFor="provincia">   Provincia:</label>
                <Select className="border-black border-2 mb-4 rounded-sm" name="provincia" options={json_provincias} ref={provincia} isSearchable={false} required
                theme={(theme) => ({...theme, borderRadius: 3, colors: {...theme.colors, primary25: '#d9ebff', primary50: '#ffe2ef', primary: '#bf9dac',},})}/>
                <p className="text-sm text-red-600" >{stateProvincia}</p>
                <label className='text-lg' htmlFor="suscripcion">   Plan de suscripción:</label>
                <Select className="border-black border-2 mb-4 rounded-sm" name="suscripcion" options={planes} ref={suscripcion} isSearchable={false}required
                theme={(theme) => ({...theme, borderRadius: 3, colors: {...theme.colors, primary25: '#d9ebff', primary50: '#ffe2ef', primary: '#bf9dac',},})}/>
                <label className='text-lg' htmlFor="name">Días de apertura:</label>
                <Select className="p-3"
                    required
                    isMulti
                    Search
                    value={stateDiasApertura}
                    options={optionsDias}
                    onChange={handleChangeDiasApertura}
                />
                <label className='text-lg' htmlFor="aperturaam">   Hora de apertura horario de mañana:</label>
                <input className="border-black border-2 mb-4 rounded-sm" name="aperturaam" type="text" ref={aperturaam} placeholder="00:00:00" required/>
                <label className='text-lg' htmlFor="cierream">  Hora de cierre horario de mañana:</label>
                <input className="border-black border-2 mb-4 rounded-sm" name="cierream" type="text" ref={cierream} placeholder="00:00:00" required/>
                <label className='text-lg' htmlFor="aperturapm">   Hora de apertura horario de tarde:</label>
                <input className="border-black border-2 mb-4 rounded-sm" name="aperturapm" type="text" ref={aperturapm} placeholder="00:00:00" required/>
                <label className='text-lg' htmlFor="cierrepm">  Hora de cierre horario de tarde:</label>
                <input className="border-black border-2 mb-4 rounded-sm" name="cierrepm" type="text" ref={cierrepm} placeholder="00:00:00" required/>
                <p className="text-sm text-red-600" >{stateHoras}</p>
                <p className="text-sm text-red-600" >{stateDiasApertura.length === 0 ? "Debe seleccionar al menos un día de apertura" : ""}</p>
                <input className="border-black border-2 mb-4 cursor-pointer hover:bg-pink-200 hover:border-pink-200 duration-300 rounded-3xl" type="submit" value="Comprobar formulario" />
                <div id="paypalDiv" className="w-full flex justify-center"></div>
            </form>
        </>
    )
}
