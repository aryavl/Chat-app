// eslint-disable-next-line
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import GoogleIcon from '@mui/icons-material/Google'
import FacebookIcon from '@mui/icons-material/Facebook'
import {
    GoogleAuthProvider,
    FacebookAuthProvider,
    signInWithPopup,
    getAdditionalUserInfo,
    onAuthStateChanged,
  } from 'firebase/auth';
 
import { auth , database, writeUserData} from '../misc/firebase'
import { useEffect } from 'react'
import {useDispatch} from 'react-redux'
import { profileActions } from '../store/profileSlice'
//import {useSelector} from 'react-redux'
import {   off, onDisconnect, onValue, ref, serverTimestamp, set } from 'firebase/database'


const isOfflineForDatabase = {
    state: 'offline',
    last_changed: serverTimestamp(),
};

const isOnlineForDatabase = {
    state: 'online',
    last_changed: serverTimestamp(),
};
const SignIn = () => {
//const profile=useSelector(state=>state.profile.profile)
// const isLoading=useSelector(state=>state.profile.isLoading)
    const dispatch=useDispatch()


    
    useEffect(()=>{ 
        let  userRef
        let userStatusRef
        const authUnsub = onAuthStateChanged(auth, async authObj => {
            if (authObj) { 
                userStatusRef = ref(database, `/status/${authObj.uid}`);
                userRef = ref(database, `/profiles/${authObj.uid}`);
            onValue(userRef, snap => {
                if(snap.exists()){

                    const {createdAt,name,avatar}=snap.val()
                    
                    dispatch(profileActions.setProfile(
                        {
                            name,
                            createdAt,
                            avatar,
                            uid:authObj.uid,
                            email:authObj.email
                }))
               dispatch(profileActions.setIsLoading(false))
                }
            }) 
            
            onValue(ref(database, '.info/connected'), snapshot => {
                if (!!snapshot.val() === false) {
                  return;
                }
                onDisconnect(userStatusRef)
                .set(isOfflineForDatabase)
                .then(() => {
                    set(userStatusRef, isOnlineForDatabase);
                });
            });
           
          
            
        }else{
            
            if (userRef) {
                off(userRef);
              }
            if(userStatusRef){
                off(userStatusRef)
            }
            off(ref(database, '.info/connected'));
            dispatch(profileActions.setProfile(null))
            
            dispatch(profileActions.setIsLoading(false))
            
        }
    
    })
    
    return ()=>{
        authUnsub()
        // off(ref(database, '.info/connected'));

        if (userRef) {
            off(userRef);
          }
        if(userStatusRef){
            off(userStatusRef)
        }
    }
},[dispatch])
    const signInwithProvider=async(provider)=>{
        try{

            const credential = await signInWithPopup(auth, provider);
            const userMeta = getAdditionalUserInfo(credential);
           
            if (userMeta.isNewUser) {
                 writeUserData(credential.user.uid,credential.user.displayName)
               
                
            }


        }catch(err){
           
        }


    }
    const onFacebookSignIn = ()=>{
        signInwithProvider(new FacebookAuthProvider())
    }
    const onGoogleSignIn = ()=>{
        signInwithProvider(new GoogleAuthProvider())
    }

  return (
    <Container >
        <Grid container
        sx={{
            display:'flex', 
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            textAlign:'center',
            marginTop:{xs:'8rem',md:'10rem'}
            }}
        >
                <Grid item xs={12} md={6}>
                        <Box>
                        <Box  >
                            <Typography variant='h4' 
                            color={"#4a4d52"}
                            sx={{fontWeight:'bold'}}
                            >Welcome to Chat app</Typography>
                            <p
                            style={{color:"#4a4d52"}}
                            >Progressive Chat platform for neophytes</p>
                        </Box>
                        <Box>
                            <Button variant='contained' 
                            sx={{width:{xs:'100%',textTransform:"capitalize",marginTop:'1rem'}}}
                            onClick={onFacebookSignIn}
                            >
                                <FacebookIcon/>
                                Continue with Facebook
                            </Button>
                            <Button variant='contained'
                            color='success' 
                            sx={{width:{xs:'100%',textTransform:"capitalize",marginTop:'0.5rem'}}}
                            onClick={onGoogleSignIn}
                            >
                                <GoogleIcon/>
                                Continue with Google
                            </Button>
                        </Box>
                        </Box>
                </Grid>
        </Grid>
    </Container>
  )
}

export default SignIn