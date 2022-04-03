import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import { Box } from '@mui/material'

export function Servicio ({ personalizaciones, deleteFunc }) {

    const nombres = personalizaciones.map(function(obj) {
        return obj.nombre
    }).join(", ")

    const coste = personalizaciones[0].coste
    const tiempo = personalizaciones[0].tiempo

    return (
        <Box style={{backgroundColor: 'rgb(248, 225, 228)'}}
            sx={{ width: '88%', flexDirection: 'row', mx:'1%', my:1, display: 'inline-flex', alignItems: 'center', justifyContent: 'space-around', border:2, borderRadius: 2, borderColor: '#F39EEC' }}>
            <div className="flex items-center">
                <p>{nombres}</p>
            </div>
            <div className="flex items-center">
                <p>{coste} €</p>
            </div>
            <div className="flex items-center">
                <p>{tiempo} minutos</p>
            </div>
            <button onClick={deleteFunc}>
                <DeleteIcon />
            </button>
        </Box>
    )
}