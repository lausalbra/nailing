import { Box} from '@mui/material'

export function ServiciosBox({ title, pers}) {
    return (
        <Box style={{backgroundColor: 'rgb(248, 225, 228)'}}
            sx={{ width: '98%', flexDirection: 'column', mx:'1%', my:'2%', display: 'inline-flex', alignItems: 'center', justifyContent: 'space-around', border:2, borderRadius: 2, borderColor: '#F39EEC' }}>
            <h3 className="text-3xl font-bold underline underline-offset-2">{title}</h3>
            <Box disableSpacing sx={{flexDirection: 'column', display: 'flex', width: '100%'}}>
                {pers}
            </Box>
        </Box>
    )
}