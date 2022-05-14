import React from 'react'
import CardContent from '@mui/material/CardContent'
import { Box} from '@mui/material'

export function CitaCentro ({ cita }) {

    function dateParse(iso) {
        const date = new Date(iso)
        return date.toLocaleString("es-ES")
    }

    return (
        <Box style={{background: 'linear-gradient(145deg, rgba(255,226,239,1) 5%, rgba(235,190,210,1) 100%)'}}
            sx={{ width: '88%', flexDirection: 'row', mx:'1%', my:2, display: 'inline-flex', alignItems: 'center', justifyContent: 'space-around', border:2, borderRadius: 2, borderColor: '#e0b4c7' }}>
            <Box disableSpacing sx={{flexDirection: 'column', display: 'inline-flex', width: '24.5%'}}>
                <p className="m-2 text-lg text-center">{cita.usuario.usuario}</p>
                <p className="m-2 text-lg text-center">{cita.usuario.email}</p>
                <p className="m-2 text-lg text-center">{cita.usuario.telefono}</p>
            </Box>
            <Box disableSpacing sx={{flexDirection: 'column', display: 'inline-flex', width: '24.5%'}}>
                <p className="m-2 text-lg text-center">Inicio cita: {dateParse(cita.horaInicio)}</p>
                <p className="m-2 text-lg text-center">Final Cita: {dateParse(cita.horaFin)}</p>
                <p className="m-2 text-lg text-center">Precio: {cita.coste} €</p>
            </Box>
            <Box disableSpacing sx={{flexDirection: 'column', display: 'inline-flex', width: '24.5%'}}>
                <p className="m-2 text-lg text-center">Decoración: {cita.decoracion}</p>
                <p className="m-2 text-lg text-center">Acabado: {cita.acabado}</p>
                <p className="m-2 text-lg text-center">Base: {cita.base}</p>
                <p className="m-2 text-lg text-center">Tipo: {cita.tipo}</p>
            </Box>
            <Box disableSpacing sx={{flexDirection: 'column', display: 'inline-flex', width: '24.5%'}}>
                <p className="m-2 text-lg text-center">Diseño: {cita.disenyo}</p>
                <p className="m-2 text-lg text-center">Tamaño: {cita.tamanyo}</p>
                <p className="m-2 text-lg text-center">Forma: {cita.forma}</p>
            </Box>
        </Box>
    )
}