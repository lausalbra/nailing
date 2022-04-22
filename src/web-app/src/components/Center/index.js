import React from 'react'
import CardContent from '@mui/material/CardContent'
import { Box} from '@mui/material'

export function Center ({ center, isAdmin, detailsFunc, editFunc, deleteFunc }) {

    return (
        <Box style={{background: 'linear-gradient(145deg, rgba(255,226,239,1) 5%, rgba(235,190,210,1) 100%)'}}
            sx={{ width: '88%', flexDirection: 'row', mx:'1%', my:2, display: 'inline-flex', alignItems: 'center', justifyContent: 'space-around', border:2, borderRadius: 2, borderColor: '#e0b4c7' }}>
            <CardContent sx={{ flexGrow: 1, width: '49%'}}>
                <div className="flex items-center">
                    <img src={center.imagen} alt={center.nombre} className="object-cover rounded-md shadow-md max-w-full float-left bg-white" />
                </div>
            </CardContent>
            <Box disableSpacing sx={{flexDirection: 'column', display: 'inline-flex', width: '49%'}}>
                <p className="m-1 text-center"><strong>{center.nombre}</strong></p>
                <button id="1" className="border-2 border-[#e0b4c7] bg-[#ffe2ef] text-black w-auto py-3 m-3 rounded-md text-1xl font-medium hover:bg-[#d9ebff] hover:border-[#abc2db] transition duration-300"
                    onClick={detailsFunc}>Más detalles</button>
            {isAdmin ?
                <>
                <button id="2" className="border-2 border-[#e0b4c7] bg-[#ffe2ef] text-black w-auto py-3 m-3 rounded-md text-1xl font-medium hover:bg-[#d9ebff] hover:border-[#abc2db] transition duration-300"
                    onClick={editFunc}>Editar centro</button>
                <button id="3" className="border-2 border-[#e0b4c7] bg-[#ffe2ef] text-black w-auto py-3 m-3 rounded-md text-1xl font-medium hover:bg-[#d9ebff] hover:border-[#abc2db] transition duration-300"
                    onClick={deleteFunc}>Borrar centro</button>
                </>
                :    
                <></>
            }   
            </Box>
        </Box>
    )
}