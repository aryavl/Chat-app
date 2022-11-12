import { Box, Typography } from '@mui/material'
import React from 'react'
import TimeAgo from 'timeago-react';
import ProfileAvatar from '../dashboard/ProfileAvatar';

const RoomItem = ({room}) => {
  const {createdAt,name,lastMessage}=room;
  return (
    <Box sx={{width:'100%',
    
   
  }}
    >
      <Box sx={{
        display:'flex',
        flexDirection:'row',
        gap:'1rem',
        justifyContent:'space-between',
        alignItems:'center'
      }}>
        <Typography variant='h3'
        sx={{whiteSpace:' nowrap !important',
          textOverflow: 'ellipsis !important',
          overflow:' hidden !important',
        }}
        >
         {name}
        </Typography>
        <TimeAgo
         datetime={lastMessage ? new Date(lastMessage.createdAt): new Date(createdAt)}
         style={{fontWeight: '400', color: 'rgba(0, 0, 0, 0.45)'}}
        />
      </Box>
      
      <Box sx={{
        display:'flex',
        alignItems:'center',
        gap:'0.5rem',
        color: ' rgba(0, 0, 0, 0.7)',

      }}>
        {
          lastMessage ? <>
          <Box sx={{display:'flex',alignItems:'center',}}>
            <ProfileAvatar
            
            src={lastMessage.authour.avatar} name={lastMessage.authour.name} size='sm'/>
          </Box>
          <Box>
            <Box ><em>{lastMessage.authour.name}</em></Box>
            <span>{lastMessage.text}</span>
          </Box>
          </>:
        <span>No messages yet...</span>
        }
      </Box>

    </Box>
  )
}

export default RoomItem