import { Button, Divider, Typography } from '@mui/material'
import React from 'react'
import { useCallback } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { auth, database } from '../../misc/firebase'
import { profileActions } from '../../store/profileSlice'
import { sidebarToggleActions } from '../../store/sidebarToggleSlice'
import Box from '@mui/material/Box'
import EditableInputs from '../EditableInputs'
import ProviderBlock from './ProviderBlock'
import AvatarUploadBtn from './AvatarUploadBtn'
import { ref, set } from 'firebase/database'
import {isOfflineForDatabase} from '../../pages/SignIn'
const Dashboard = () => {
  const profile=useSelector(state=>state.profile.profile)
 const dispatch=useDispatch()

  const onSignOut =useCallback(() =>{
    set(ref(database, `/status/${auth.currentUser.uid}`), isOfflineForDatabase)
    .then(()=>{

      auth.signOut();
      dispatch(sidebarToggleActions.setOpen())
      dispatch(profileActions.setIsLoading(false))
    }).catch(err=>{
      alert(err.message)
    })
    
  },[dispatch])
  return (
    <>
    <Box sx={{
      display:'flex',
      flexDirection:{xs:'column',md:'row'},
      justifyContent:'space-between',
      
    }} >
      
        <Typography variant='h4'>Dashboard</Typography>
        <Button
          variant='contained'
          color='error'
         sx={{position:'relative',right:{md:'0rem',},
        width:{xs:'80%',md:'30%'}
        }}
          onClick={onSignOut}
          >Sign out</Button>
      
    </Box>
    <Box>
      <main>
        <h3>Hey, {profile.name}</h3>
        <ProviderBlock/>
      <Divider/>
        <Box sx={{marginTop:'1.5rem'}}>
          <EditableInputs/>
          <AvatarUploadBtn/>
        </Box>
      </main>
     
    </Box>
    </>
  )
}

export default Dashboard