import React from 'react'
import CardContent from '@mui/material/CardContent'
import { Box} from '@mui/material'

export function Cita ({ cita, deleteFunc }) {

    function dateParse(iso) {
        const date = new Date(iso)
        return date.toLocaleString("es-ES")
    }

    return (
        <Box style={{backgroundColor: 'rgb(248, 225, 228)'}}
            sx={{ width: '88%', flexDirection: 'row', mx:'1%', my:2, display: 'inline-flex', alignItems: 'center', justifyContent: 'space-around', border:2, borderRadius: 2, borderColor: '#F39EEC' }}>
            <CardContent sx={{ flexGrow: 1, width: '49%'}}>
                <div className="flex items-center">
                    <img src={cita.centro.imagen} alt={cita.centro.nombre} className="object-cover rounded-md shadow-md max-w-full float-left bg-white" />
                </div>
            </CardContent>
            <Box disableSpacing sx={{flexDirection: 'column', display: 'inline-flex', width: '49%'}}>
                <p className="m-1 text-center"><strong>{cita.centro.nombre}</strong></p>
                <p className="m-1 text-center">{dateParse(cita.horaInicio)}</p>
                <p className="m-1 text-center">Coste: {cita.coste} €</p>
                <button id="1" className="border-2 border-purple-400 bg-pink-200 text-black w-auto py-3 m-3 rounded-md text-1xl font-medium hover:bg-purple-300 transition duration-300"
                    onClick={deleteFunc}>Cancelar cita</button>
            </Box>
        </Box>
    )
}