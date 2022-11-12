import { Divider, Grid } from '@mui/material'
import  Box  from '@mui/material/Box'
import React, { useEffect, useRef, useState } from 'react'
import CreateRoomBtnModal from './dashboard/CreateRoomBtnModal'
import DashboardToggle from './dashboard/DashboardToggle'
import ChatRoomList from './rooms/ChatRoomList'

const Sidebar = () => {
const topSidebarRef=useRef()
const [height,setHeight]=useState(0)

useEffect(()=>{
  if(topSidebarRef.current){
  
    setHeight(topSidebarRef.current.scrollHeight)
  }
},[topSidebarRef])

  return (
    <Box
    sx={{height:'100%',paddingTop:'10px'}}
    >
      <Box 
      ref={topSidebarRef}
      sx={{display:'flex',flexDirection:'column',gap:'1rem',paddingBottom:'1rem'}}>
        
            <DashboardToggle/>
            <CreateRoomBtnModal/>     
            <Divider>Join Conersation</Divider>
        </Box>

        <Box >
            <ChatRoomList aboveElHeight={height}/>
        </Box>
    </Box>
  )
}

export default Sidebar