import React from 'react'
import CardContent from '@mui/material/CardContent'
import { Box} from '@mui/material'

export function Cita ({ cita, deleteFunc }) {

    function dateParse(iso) {
        const date = new Date(iso)
        return date.toLocaleString("es-ES")
    }

    return (
        <Box style={{background: 'linear-gradient(145deg, rgba(255,226,239,1) 5%, rgba(235,190,210,1) 100%)'}}
            sx={{ width: '88%', flexDirection: 'row', mx:'1%', my:2, display: 'inline-flex', alignItems: 'center', justifyContent: 'space-around', border:2, borderRadius: 2, borderColor: '#e0b4c7' }}>
            <CardContent sx={{ flexGrow: 1, width: '49%', p:'1%'}}>
                <div className="flex items-center">
                    <img src={cita.centro.imagen} alt={cita.centro.nombre} className="object-cover mx-auto rounded-[20%] shadow-md w-[100%] md:w-[80%] lg:w-[60%] float-left bg-white" />
                </div>
            </CardContent>
            <Box disableSpacing sx={{flexDirection: 'column', display: 'inline-flex', width: '49%'}}>
                <p className="m-2 text-lg text-center"><strong>{cita.centro.nombre}</strong></p>
                <p className="m-2 text-lg text-center">{dateParse(cita.horaInicio)}</p>
                <p className="m-2 text-lg text-center">Precio: {cita.coste} €</p>
                <button id="1" className="border-2 border-purple-300 bg-pink-200 text-black w-auto py-3 rounded-md text-1xl font-medium hover:bg-purple-300 transition duration-300"
                    onClick={deleteFunc}>Cancelar cita</button>
            </Box>
        </Box>
    )
}