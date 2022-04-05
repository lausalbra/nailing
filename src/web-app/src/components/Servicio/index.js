import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import { Box } from '@mui/material'

export function Servicio ({ personalizaciones, deleteFunc }) {

    const nombres = personalizaciones.map(function(obj) {
        return obj.nombre
    }).join(", ").replace("_", " ")

    const coste = personalizaciones[0].coste
    const tiempo = personalizaciones[0].tiempo

    return (
        <Box sx={{flexDirection: 'row', my:1, display: 'grid', gridAutoColumns: '1fr', gap: 1}}>
            <Box sx={{ gridRow: '1', gridColumn: 'span 4', mx:1 }}>
                <p>{nombres}</p>
            </Box>
            <Box sx={{ gridRow: '1', gridColumn: 'span 2', mx:1 }}>
                <p>{coste} €</p>
            </Box>
            <Box sx={{ gridRow: '1', gridColumn: 'span 2', mx:1 }}>
                <p>{tiempo} mins</p>
            </Box>
            <Box sx={{ gridRow: '1', gridColumn: 'span 1', mx:2, justifyContent:'flex-end' }}
                className="flex justify-end">
                <button onClick={deleteFunc}>
                    <DeleteIcon />
                </button>
            </Box>
            
        </Box>
    )
}