import React, { useState, useEffect } from 'react'
import { useLocation } from 'wouter'
import { styled } from '@mui/material/styles'
import { API_URL, RequestManager } from '../../components/RestUtils'
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import { Link } from 'wouter'

// npm install @mui/material @emotion/react @emotion/styled
export function CenterList ({ provincia }) {
  const [resObj, setObj] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [locationPath, locationPush] = useLocation()
  const url = API_URL + '/centros'
  const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('sm')]: {
      width: '100% !important', // Overrides inline-style
      height: 100
    },
    '&:hover, &.Mui-focusVisible': {
      zIndex: 1,
      '& .MuiImageBackdrop-root': {
        opacity: 0.15
      },
      '& .MuiImageMarked-root': {
        opacity: 0
      },
      '& .MuiTypography-root': {
        border: '4px solid currentColor'
      }
    }
  }))

  const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%'
  })

  const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white
  }))

  const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity')
  }))

  const ImageMarked = styled('span')(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity')
  }))

  useEffect(() => {
    function callback(centros) {
      setObj(centros)
    }
    RequestManager(url, 'GET', 'CenterList', null, locationPush, callback, null)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let filtrado = []
  if (!provincia || provincia === 'ninguna') {
    filtrado = resObj
  } else {
    filtrado = resObj.filter(c => c.provincia === provincia)
  }

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '111.1%' }}>
      {filtrado.map((image) => (
        <ImageButton
          focusRipple
          key={image.nombre}
          style={{
            width: '30%'
          }}
        >
          <ImageSrc style={{ backgroundImage: `url(${image.imagen})` }} />
          <ImageBackdrop className='MuiImageBackdrop-root' />
          <Image>
            <Typography
              component='span'
              variant='subtitle1'
              color='inherit'
              sx={{
                position: 'relative',
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`
              }}
            >
              <Link to={'/centrodetalle/' + image.id}>
                {image.nombre}
              </Link>
              <ImageMarked className='MuiImageMarked-root' />
            </Typography>
          </Image>
        </ImageButton>
      ))}
    </Box>
  )
}
