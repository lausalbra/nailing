import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

export function BasicRating() {

    const [value, setValue] = React.useState(2);
    return (
        <Box
        sx={{
            '& > legend': { mt: 2 },
        }}
        >
        <Typography component="legend"><strong>Valoración:</strong> <Rating name="read-only" value={value} readOnly /></Typography>
        
        </Box>
    );
}