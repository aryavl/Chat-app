import { FormControl, IconButton, InputAdornment, OutlinedInput } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import DoneIcon from '@mui/icons-material/Done'
import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { useState } from 'react'
import { useCallback } from 'react'
import { ref, set, update } from 'firebase/database'
import { database } from '../misc/firebase'
import { profileActions } from '../store/profileSlice'
import { getUserUpdates } from '../misc/helpers'

const EditableInputs = () => {
    const profile=useSelector(state=>state.profile.profile)
    const [input,setInput]=useState(profile.name)
    const [isEditable,setIsEditable]=useState(false)
    const dispatch=useDispatch()
    

    const onSave = async(newData) =>{
        const userNickNameRef = ref(database, `/profile/${profile.uid}/name`);
        try{
            await set(userNickNameRef,newData)
            console.log("Nickname has been updated");
            dispatch(profileActions.setProfile(
                {...profile,
                    name:newData,
                    
                    
        }))
       
        }catch(err){
            console.log(err.message)
        }

    }
    const onInputChange = useCallback((event)=>{
        setInput(event.target.value)
    },[])
    const onEditClick = useCallback(()=>{
        setIsEditable(prevState=>!prevState)
        setInput(profile.name)
        },[profile])
    const onSaveClick = async()=>{
        const trimmed= input.trim();
        if(trimmed === ''){
            console.log('invalid input')
        }
        if(trimmed !== profile.name){
            await onSave(trimmed)
        }
        setIsEditable(false)
    }
  return (
    <div>
      
        <FormControl sx={{  width: '80%' }} variant="outlined">
          <OutlinedInput
            disabled={!isEditable}
            placeholder='Write your value'
            value={input}
            onChange={onInputChange}
            endAdornment={<InputAdornment position="end">
                <IconButton onClick={onEditClick}>
                    {isEditable ? <CloseIcon/> : <EditIcon/>}
                </IconButton>
                {isEditable && ( <IconButton onClick={onSaveClick}>
                        <DoneIcon/>
                </IconButton>)}


            </InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
          />
         
        </FormControl>
    </div>
  )
}

export default EditableInputs