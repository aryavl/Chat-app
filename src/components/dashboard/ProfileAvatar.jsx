import { Avatar } from '@mui/material'
import React from 'react'
import {useSelector} from 'react-redux'
import { getNameInitials } from '../../misc/helpers'

const ProfileAvatar = () => {
    const profile=useSelector(state=>state.profile.profile)
    // console.log('PROFILE',profile.avatar)
  return (
    <Avatar
    sizes='xs'
    src={profile.avatar}
    sx={{
      
    }}
    >
       {getNameInitials(profile.name)}
    </Avatar>
  )
}

export default ProfileAvatar