import React from 'react'
import DoubleArrowRoundedIcon from '@mui/icons-material/DoubleArrowRounded'
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import { Box, ButtonBase, ButtonGroup, styled, Typography } from '@mui/material'

export function Center ({ center, isAdmin, detailsFunc, editFunc, deleteFunc }) {

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

    return (
        <ImageButton
          key={center.nombre}
          style={{
            width: '30%'
          }}
        >
          <ImageSrc style={{ backgroundImage: `url(${center.imagen})` }} />
          <ImageBackdrop className='MuiImageBackdrop-root' />
          <Image
            style={{
              justifyContent: "space-between", alignItems: "center"
            }}>
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
              {center.nombre}
              
              <ImageMarked className='MuiImageMarked-root' />
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 100}}
                component="span"
                m={1} //margin
                className="justifyContent:flex-end alignItems:flex-end"
              >
                  {isAdmin ? 
                    <ButtonGroup
                        orientation="vertical"
                        aria-label="vertical secondary contained button group"
                    >
                        <DoubleArrowRoundedIcon onClick={detailsFunc}
                        sx={{ fontSize: 30 }}/>
                        <BorderColorRoundedIcon onClick={editFunc}
                        sx={{ fontSize: 30 }}/>
                        <DeleteRoundedIcon onClick={deleteFunc}
                        sx={{ fontSize: 30 }}/>
                    </ButtonGroup>
                    :
                    <DoubleArrowRoundedIcon onClick={detailsFunc}
                        sx={{ fontSize: 30 }}/>
                  }
              </Box>
          </Image>
        </ImageButton>
    )
}