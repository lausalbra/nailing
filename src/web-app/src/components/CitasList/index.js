import React, { useState, useEffect } from 'react'
import { useLocation } from 'wouter'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import { Link } from 'wouter'

// npm install @mui/material @emotion/react @emotion/styled
export function CitasList () {
  // const url = 'https://my.api.mockaroo.com/centros.json?key=64324960'
  const url_get = 'https://my.api.mockaroo.com/citas.json?key=86580d70'
  const user = sessionStorage.getItem("userLogged")
  // const endpoint = 'https://nailingdevelop.herokuapp.com'
  // const endpoint = 'https://nailingtest.herokuapp.com'
  // const url_get = endpoint + '/cita/user' + user.id
  const xhr_get = new XMLHttpRequest()
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

  useEffect(() => {
    xhr_get.open('get', url_get)
    xhr_get.send()
    xhr_get.onload = function () {
      if (this.status === 200) {
        try {
          setObj(JSON.parse(this.responseText))
          console.log('Petición Rest exitosa (getCitas)')

        } catch (e) {
          console.warn('Excepción capturada en la petición REST')
          sessionStorage.setItem(e)
          locationPush('/error')
        }
      } else {
        console.warn('Error en la petición REST')
        sessionStorage.setItem("La API Rest (" + url_get + ") ha devuelto el error " + this.status)
        locationPush('/error')
      }
    }
  }, [])
  // NO meter xhr en el array de dependencias

  console.log(resObj)
  const enlace = Link({ className: 'block w-64 h-20', to: '/' })

  function cancelarCita(obj) {
    // eslint-disable-next-line no-restricted-globals
    let accepted = confirm("¿Está seguro de que quiere cancelar su cita en " + obj.centro + "?");
    if (accepted) {
      // const url_del = endpoint + '/cita/delete/' + obj.id 
      const url_del = "https://my.api.mockaroo.com/resCita/" + obj.id + ".json?key=88b89640&__method=DELETE"
      const xhr_del = new XMLHttpRequest()
      xhr_del.open('delete', url_del)
      xhr_del.send()
      xhr_del.onload = function () {
        if (this.status === 200) {
          try {
            console.log('Petición Rest exitosa (delete cita)')
            locationPush('/miscitas')
          } catch (e) {
            console.warn('Excepción capturada en la petición REST')
            sessionStorage.setItem(e)
            locationPush('/error')
          }
        } else {
          console.warn('Error en la petición REST')
          sessionStorage.setItem("La API Rest (" + url_del + ") ha devuelto el error " + this.status)
          locationPush('/error')
        }
      }
    }
  }
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '111.1%' }}>
      {resObj.map((image) => ( 
        <ImageButton
          focusRipple
          LinkComponent={enlace}
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
