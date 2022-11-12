import { Button, Chip } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { auth } from '../../misc/firebase'
import FacebookIcon from '@mui/icons-material/Facebook'
import GoogleIcon from '@mui/icons-material/Google'
import { Box } from '@mui/system'
import { FacebookAuthProvider, GoogleAuthProvider, linkWithPopup,unlink } from 'firebase/auth'
const ProviderBlock = () => {

    const [isConnected,setIsConnected]=useState({
        'google.com':auth.currentUser.providerData.some(data=>data.providerId=== 'google.com'),
        'facebook.com':auth.currentUser.providerData.some(data=>data.providerId=== 'facebook.com')
    })
    
    // to disconnect linked social media
    const updateIsConnected = (providerId,value) =>{
        setIsConnected(prev=>{
            return {
                ...prev,
                [providerId]:value,
            }
        })
    }
    // common unlink function
    const unlinkAuthProvider= async(providerId) =>{
        try{

            if (auth.currentUser.providerData.length === 1) {
                throw new Error(`You can not disconnect from ${providerId}`);
            }
            await unlink(auth.currentUser, providerId);
            updateIsConnected(providerId, false);
            
        }catch(err){
            alert(`${err.message}`)
        }
    }
    // unlink handlers
    const unLinkGoogle = () =>{
        unlinkAuthProvider('google.com')
    }
    const unLinkFacebook = () =>{
        unlinkAuthProvider('facebook.com')
    }
    // Common link function
    const link = async(provider) => {
        try{
            await linkWithPopup(auth.currentUser, provider);
            alert(`Linked to ${provider.providerId}`)

            updateIsConnected(provider.providerId,true)
        }catch(err){

        }
    }

    // link handlers
    const linkGoogle = () => {
        link(new GoogleAuthProvider())
    }
    const linkFacebook = () => {
        link(new FacebookAuthProvider())
    }

  return (
    <Box sx={{marginBottom:'0.5rem',display:'flex',gap:"1rem",flexDirection:'column'}}>
        <Box sx={{display:'flex',gap:"1rem",}} >
            { isConnected["google.com"] && <Chip
            label="Connected"
            color="success" onDelete={unLinkGoogle}  icon={<GoogleIcon/>}/>}
            { isConnected["facebook.com"] && <Chip
            label="Connected"
            color="primary" onDelete={unLinkFacebook}  icon={<FacebookIcon/>}/>}
        
        </Box>
        <Box sx={{display:'flex',gap:"0.5rem",flexDirection:'column',width:{xs:'80%'}}}>
            {!isConnected["google.com"] && <Button variant='contained' color='success'
            onClick={linkGoogle}
            >
                <GoogleIcon/>Link to Google
            </Button>}
            {!isConnected["facebook.com"] &&             <Button variant='contained' color='primary' onClick={linkFacebook}>
                <FacebookIcon/>Link to Facebook
            </Button>}

        </Box>
    </Box>
  )
}

export default ProviderBlock