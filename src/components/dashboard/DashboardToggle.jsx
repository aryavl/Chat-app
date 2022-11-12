import React from 'react'
import Button from '@mui/material/Button'
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import {useDispatch,useSelector} from 'react-redux'
import { sidebarToggleActions } from '../../store/sidebarToggleSlice';
import  SwipeableDrawer  from '@mui/material/SwipeableDrawer';
import  Typography  from '@mui/material/Typography';
import  Box  from '@mui/material/Box';
import { IconButton } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import Dashboard from '.';



const DashboardToggle = () => {

    const dispatch=useDispatch();
    const open=useSelector(state=>state.toggle.open)

  return (
    <>
    <Button variant='contained'
     sx={{width:{xs:'100%',textTransform:"capitalize",}}}
    onClick={()=>{dispatch(sidebarToggleActions.setOpen())}}
    >
        <DashboardCustomizeIcon/>
        Dashboard
    </Button>
    <SwipeableDrawer 
    position='relative' 
    anchor='left'
    open={open}
    sx={{width:'100%',padding:'2rem'}}
    onOpen={()=>dispatch(sidebarToggleActions.setOpen())}
    onClose={()=>dispatch(sidebarToggleActions.setOpen())}
    >
        <Box>
        <Box>
        <IconButton sx={{position:'relative',left:{xs:'85vw',md:'40vw'},top:'1rem'}} onClick={()=>dispatch(sidebarToggleActions.setOpen())}>
                <ChevronRightIcon style={{color:'blue'}} />
            </IconButton>
        </Box>
        <Box sx={{width:{xs:'100vw',md:'40vw'},padding:'2rem'}}>
           <Dashboard/>
        </Box>
        </Box>

    </SwipeableDrawer>
    </>
  )
}

export default DashboardToggle