import React from 'react'
import CardContent from '@mui/material/CardContent'
import { Box} from '@mui/material'

export function Center ({ center, isAdmin, detailsFunc, editFunc, deleteFunc }) {

    if (center.suscripcion === "PREMIUM") {
        return (
            <Box style={{border: '3px solid gold', background: 'linear-gradient(145deg, rgba(255,100,239,1) 5%, rgba(235,190,210,1) 100%)'}}
                sx={{ width: '88%', flexDirection: 'row', mx:'1%', my:2, display: 'inline-flex', alignItems: 'center', justifyContent: 'space-around', border:2, borderRadius: 2, borderColor: '#e0b4c7' }}>
                <CardContent sx={{ flexGrow: 1, width: '49%', p:'1%'}}>
                    <p>Anuncio</p>
                    <div className="flex items-center">
                        <img src={center.imagen} alt={center.nombre} style={{objectFit: "contain", height: "10rem", background: 'linear-gradient(145deg, rgba(255,226,239,1) 5%, rgba(235,190,210,1) 100%)'}} className="object-cover mx-auto rounded-[20%] shadow-md w-[100%] md:w-[80%] lg:w-[60%] float-left bg-white" />
                    </div>
                </CardContent>
                <Box disableSpacing sx={{flexDirection: 'column', display: 'inline-flex', width: '49%'}}>
                    <p className="m-1 text-lg text-center"><strong>{center.nombre}</strong></p>
                    <button id="1" className="border-2 border-[#e0b4c7] bg-[#ffe2ef] text-lg text-black w-auto py-3 m-3 rounded-md text-1xl font-medium hover:bg-[#d9ebff] hover:border-[#abc2db] transition duration-300"
                        onClick={detailsFunc}>Más detalles</button>
                {isAdmin ?
                    <>
                    <button id="2" className="border-2 border-[#e0b4c7] bg-[#ffe2ef] text-lg text-black w-auto py-3 m-3 rounded-md text-1xl font-medium hover:bg-[#d9ebff] hover:border-[#abc2db] transition duration-300"
                        onClick={editFunc}>Editar centro</button>
                    <button id="3" className="border-2 border-[#e0b4c7] bg-[#ffe2ef] text-lg text-black w-auto py-3 m-3 rounded-md text-1xl font-medium hover:bg-[#d9ebff] hover:border-[#abc2db] transition duration-300"
                        onClick={deleteFunc}>Borrar centro</button>
                    </>
                    :    
                    <></>
                }   
                </Box>
            </Box>
        )
    }
    else {
        return (
            <Box style={{background: 'linear-gradient(145deg, rgba(255,226,239,1) 5%, rgba(235,190,210,1) 100%)'}}
                sx={{ width: '88%', flexDirection: 'row', mx:'1%', my:2, display: 'inline-flex', alignItems: 'center', justifyContent: 'space-around', border:2, borderRadius: 2, borderColor: '#e0b4c7' }}>
                <CardContent sx={{ flexGrow: 1, width: '49%', p:'1%'}}>
                    <div className="flex items-center">
                        <img src={center.imagen} alt={center.nombre} style={{objectFit: "contain", height: "10rem", background: 'linear-gradient(145deg, rgba(255,226,239,1) 5%, rgba(235,190,210,1) 100%)'}} className="object-cover mx-auto rounded-[20%] shadow-md w-[100%] md:w-[80%] lg:w-[60%] float-left bg-white" />
                    </div>
                </CardContent>
                <Box disableSpacing sx={{flexDirection: 'column', display: 'inline-flex', width: '49%'}}>
                    <p className="m-1 text-lg text-center"><strong>{center.nombre}</strong></p>
                    <button id="1" className="border-2 border-[#e0b4c7] bg-[#ffe2ef] text-lg text-black w-auto py-3 m-3 rounded-md text-1xl font-medium hover:bg-[#d9ebff] hover:border-[#abc2db] transition duration-300"
                        onClick={detailsFunc}>Más detalles</button>
                {isAdmin ?
                    <>
                    <button id="2" className="border-2 border-[#e0b4c7] bg-[#ffe2ef] text-lg text-black w-auto py-3 m-3 rounded-md text-1xl font-medium hover:bg-[#d9ebff] hover:border-[#abc2db] transition duration-300"
                        onClick={editFunc}>Editar centro</button>
                    <button id="3" className="border-2 border-[#e0b4c7] bg-[#ffe2ef] text-lg text-black w-auto py-3 m-3 rounded-md text-1xl font-medium hover:bg-[#d9ebff] hover:border-[#abc2db] transition duration-300"
                        onClick={deleteFunc}>Borrar centro</button>
                    </>
                    :    
                    <></>
                }   
                </Box>
            </Box>
        )
    }
}