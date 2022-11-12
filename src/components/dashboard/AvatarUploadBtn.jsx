import {  Button, Modal, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useState,useRef } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { useModalState } from '../../misc/custom-hooks'
import AvatarEditor from 'react-avatar-editor'
import {getDownloadURL, ref as storageRef, uploadBytes} from 'firebase/storage'
import { database, storage } from '../../misc/firebase'
import { ref as dbRef, serverTimestamp, set, update } from 'firebase/database';
import { getUserUpdates } from '../../misc/helpers'
import ProfileAvatar from './ProfileAvatar'
import { profileActions } from '../../store/profileSlice'
const accepteableFileTypes=['image/png','image/jpeg','image/jpg']
const isFilesValid= (file) => accepteableFileTypes.includes(file.type)
const getBlob = canvas => {
    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('File process error'));
        }
      });
    });
  };
const AvatarUploadBtn = () => {
    const {isOpen,open,close}=useModalState()
    const [img,setImg]=useState(null)
    const [isLoading,setIsLoading]=useState(false)
    const avatarEditorRef= useRef()
    const dispatch = useDispatch()
    const profile=useSelector(state=>state.profile.profile)
    const onFileInputChange = (e) =>{
    //    console.log(e.target.files)
        const currentFiles= e.target.files;
        if(currentFiles.length === 1){
            const file=currentFiles[0]
            if(isFilesValid(file)){
                setImg(file)
                open()
            }
            else{
                alert("please upload image file")
            }
        }
    }

    const onUploadClick =async()=>{

        const canvas = avatarEditorRef.current.getImageScaledToCanvas()
        setIsLoading(true)
        try{
            const blob = await getBlob(canvas);
            // console.log('blob',blob)
            const avatarFileRef = storageRef(
                storage,
                `/profile/${profile.uid}/avatar`
              );
            await uploadBytes(avatarFileRef, blob, {
                cacheControl: `public, max-age=${3600 * 24 * 3}`,
            });
            const downloadUrl = await getDownloadURL(avatarFileRef); 
            

            await set(dbRef(database,`/profile/${profile.uid}/avatar`),(
              
              downloadUrl
            )
            )
            dispatch(profileActions.setProfile(
                {
                    ...profile,
                    avatar:downloadUrl
        }))

            const updates = await getUserUpdates(
                profile.uid,
                database
              );
            await update(dbRef(database), updates);
            setIsLoading(false)
            alert('Avatar has been uploaded')
        }catch(err){}
        setIsLoading(false)
        // alert('Avatar is not uploaded')

    }
  return (
    <Box sx={{marginTop:'1rem',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
       <ProfileAvatar/>
         <Button variant="text" 
        onChange={onFileInputChange}
        sx={{textTransform:'capitalize',display:{xs:'inline-block',md:'block'}}}
        component="label">
            Select new Avatar
  <input hidden accept="image/*" multiple type="file" onChange={onFileInputChange}/>
</Button>

<Modal

  open={isOpen}
  onClose={close}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',background:'#fff',width:{xs:'90%',md:'60%'},margin:'5rem auto',padding:'3rem 0'}}>
    <Typography  id="modal-modal-title" variant="h6" component="h2">
     Adjust and upload new avatar
    </Typography>
    <Box 
    
    sx={{ mt: 2,mb:2 ,display:'flex',justifyContent:'center',alignItems:'center',}} >
      {img && <AvatarEditor
        ref={avatarEditorRef}
        image={img}
        width={200}
        height={200}
        border={4}
        borderRadius={100}
        // color={[255, 255, 255, 0.6]} // RGBA
        scale={1.2}
        rotate={0}
      />}
    
    </Box>
    <Button variant='outlined' 
    onClick={onUploadClick}
    disabled={isLoading}
    sx={{display:'block'}} >
        Upload new avatar
    </Button>
  </Box>
</Modal>
    </Box>
  )
}

export default AvatarUploadBtn