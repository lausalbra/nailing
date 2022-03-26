import React, { useState, useEffect } from 'react'
import { useLocation } from 'wouter'
import { API_URL, RequestManager } from '../../components/RestUtils'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'

export function CitasList () {
  const id = sessionStorage.getItem('userId')
  const url = API_URL
  // eslint-disable-next-line no-unused-vars
  const [locationPath, locationPush] = useLocation()
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

  const [resObj, setObj] = useState([])
  const url_get = url + '/cita/user/' + id
  useEffect(() => {
    function callback(citas) {
      setObj(citas)
    }
    RequestManager(url_get, 'GET', 'CitasList (get)', null, locationPush, callback, null)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function cancelarCita (obj) {
    // eslint-disable-next-line no-restricted-globals
    const accepted = confirm('¿Está seguro de que quiere cancelar su cita en ' + obj.centro + '?')
    if (accepted) {
      const url_del = url + '/cita/delete/' + obj.id
      RequestManager(url_del, 'DELETE', 'CitasList (delete)', '/miscitas', locationPush, null, null)
    }
  }

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '111.1%' }}>
      {resObj.map((image) => (
        <ImageButton
          focusRipple
          key={image.id}
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
              <button onClick={() => cancelarCita(image)}>
                {image.hora_inicio} - {image.hora_fin} <br /> {image.centro}
              </button>
              <ImageMarked className='MuiImageMarked-root' />
            </Typography>
          </Image>
        </ImageButton>
      ))}
    </Box>
  )
}
