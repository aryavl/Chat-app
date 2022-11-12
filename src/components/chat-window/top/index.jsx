import { Box, Hidden, Typography } from '@mui/material'
import React from 'react'
import LeftArrowIcon from '@mui/icons-material/ArrowCircleLeftRounded'
import { Link } from 'react-router-dom'
import { ButtonToolbar } from 'rsuite'
import RoomInfoBtnModal from './RoomInfoBtnModal'

const Top = ({currentRoom}) => {
 
  return (
    <Box sx={{
        display:'flex',justifyContent:{lg:'space-between'},
        alignItems:'center',
        }}>
            <Typography variant='h4'
            sx={{ whiteSpace: 'nowrap' ,
                textOverflow: 'ellipsis',
                overflow: 'hidden',display:'flex',alignItems:'center',justifyContent:'center' }}
            >
                <Hidden smUp>
                <Link
                sx={{textDecoration:'none',}}
                to='/'><LeftArrowIcon
                sx={{color:'blue',fontSize:'2rem',
                display:'flex',alignItems:'center',justifyContent:'center' 
            }}
                /></Link>
                </Hidden>
                <span>{currentRoom.name}</span>
                
                </Typography>


        <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
           
            <RoomInfoBtnModal currentRoom={currentRoom}/>
        </Box>
        </Box>
  )
}

export default Top