import {Link, useLocation} from 'react-router-dom'
import React, { Children } from 'react'
import { useRooms } from '../../context/rooms.context'
import RoomItem from './RoomItem'
import {Nav} from 'rsuite'
import Loader from 'rsuite/Loader';
import { useSelector } from 'react-redux'
import Chat from '../../pages/Home/Chat'


const ChatRoomList = ({aboveElHeight}) => {
  
 
  const rooms=useSelector(state=>state.room.room)



  return (
    
        <Nav 
       
       appearance='subtle'
       vertical
       reversed 
       
        style={{overflowY:'scroll', 
        '&::WebkitScrollbar':{
            width: '4px',
          },
         ' &::WebkitScrollbarTrack':{
            background: '#ddd',
          },
          '&::WebkitScrollbarThumb': {
            background: 'darken(#ddd, 20%)',
          },        
        height:`calc(100vh - ${aboveElHeight}px)`,       
          }}
          >
           
            {!rooms && <Loader center vertical content='Loading...' speed='slow' size='md' />}
            {rooms && rooms.length>0 && rooms.map(room=>(
              
              <Link
              to={`/chat/${room.id}`}
              key={room.id}
              style={{textDecoration:'none',color:'rgba(0,0,0,0.70)'}}
              
              >

                <RoomItem room={room}/>
              
              
              </Link>
              

            ))}
           
           

        </Nav>

  )
}

export default ChatRoomList