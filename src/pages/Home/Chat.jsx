import { Box } from '@mui/material'


import React from 'react'
import { useSelector } from 'react-redux'
import { Loader } from 'rsuite'
import Bottom from '../../components/chat-window/bottom'
import Messages from '../../components/chat-window/messages'
import Top from '../../components/chat-window/top'


const Chat = ({content,locationId}) => {
const rooms=useSelector(state=>state.room.room)
const chatId=locationId.slice(6)

if(!rooms){
  return <Loader center vertical size='md' content="Loading..." speed='slow'/>
}
const currentRoom= rooms.length>0 && rooms.find(room=>room.id === chatId);
// console.log(currentRoom)
if(!currentRoom){
  return <h6 style={{marginTop:'150px',textAlign:'center'}}>Chat {chatId} not found</h6>
}
  return (
    <>
     
            <Box sx={{height:'100vh',width:'55vw',display:'flex',flexDirection:"column",
          justifyContent:'space-between',
          margin:'0',paddingLeft:'1rem'
          }}>
              <Box sx={{height:'75px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            }}>
               <Top currentRoom={currentRoom}/>
                
              </Box>
              <Box sx={{height:'calc(100vh - 75px - 65px)'}}>
               <Messages content={content} currentRoom={currentRoom}
               chatId={chatId}
               />

              </Box>
              <Box sx={{height:'65px',display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',}}>
               <Bottom currentRoom={currentRoom} chatId={chatId}/>

              </Box>

            </Box>
            
    </>
  )
}

export default Chat