import {  FormControl, IconButton, InputAdornment, OutlinedInput } from '@mui/material'
import React, { useCallback } from 'react'
import SendIcon from '@mui/icons-material/Send'
import { useDispatch, useSelector } from "react-redux";
import { chatInputAction } from '../../../store/chatInputSlice';
import {push, ref, serverTimestamp, update} from 'firebase/database'
import { database } from '../../../misc/firebase';


const assembleMessage=(profile,chatId)=>{
  
    return {
        roomId:chatId,
        authour:{
            name:profile.name,
            uid:profile.uid,
            createdAt:profile.createdAt,
            ...(profile.avatar? {avatar:profile.avatar}:{})
        },
        createdAt:serverTimestamp(),

    }
}

const Bottom = ({currentRoom,chatId}) => {
    const input=useSelector(state=>state.chat.input)
    const isLoading=useSelector(state=>state.chat.isLoading)
    const profile=useSelector(state=>state.profile.profile)
    const dispatch=useDispatch()
    const onInputChangeHandler = useCallback((e) =>{
        dispatch(chatInputAction.onInputChange(e.target.value))
    },[dispatch])

    const onSendClick = async() =>{
        if(input.trim()===''){
            return
        }

        const msgData = assembleMessage(profile,chatId);
        // console.log("dataaa",profile,chatId)
        msgData.text = input;
        const updates={};
        const messageId=push(ref(database,'messages')).key;
        updates[`/messages/${messageId}`] =msgData;
        updates[`/rooms/${chatId}/lastMessage`]={
            ...msgData,
            msgId:messageId,
        }
        dispatch(chatInputAction.setIsLoading(true))
        try{
            await update(ref(database), updates);
            dispatch(chatInputAction.onInputChange(''))
            dispatch(chatInputAction.setIsLoading(false))

        }catch(err){
            dispatch(chatInputAction.setIsLoading(false))
            alert(err.message)
        }
    }

    const onKeyDownHandler = (e) =>{
            if(e.keyCode === 13){
                e.preventDefault();
                onSendClick()
            }
    }
  return (
<FormControl sx={{  width: '100%' }} variant="outlined">
          <OutlinedInput
            value={input}
            placeholder='Write your Message here...'
            onChange={onInputChangeHandler}
            onKeyDown={onKeyDownHandler}
            endAdornment={<InputAdornment position="end">
                <IconButton 
                disabled={isLoading}
                onClick={onSendClick}>
                    <SendIcon 
                    sx={{color:'blue'}}
                   />
                
                </IconButton>


            </InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
          />
         
        </FormControl>
  )
}

export default Bottom