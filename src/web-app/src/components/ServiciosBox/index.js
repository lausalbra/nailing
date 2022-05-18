import { Box} from '@mui/material'

export function ServiciosBox({ title, pers}) {
    return (
        <Box style={{background: 'linear-gradient(145deg, rgba(255,226,239,1) 5%, rgba(235,190,210,1) 100%)'}}
            sx={{ width: '98%', flexDirection: 'column', mx:'1%', my:'2%', display: 'inline-flex', alignItems: 'center', justifyContent: 'space-around', border:2, borderRadius: 2, borderColor: '#e0b4c7' }}>
            <h3 className="text-xl font-bold">{title}</h3>
            <Box disableSpacing sx={{flexDirection: 'column', display: 'flex', width: '100%'}}>
                {pers}
            </Box>
        </Box>
    )
}