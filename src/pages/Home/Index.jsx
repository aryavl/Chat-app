
import  Grid  from '@mui/material/Grid'
import React from 'react'
import Sidebar from '../../components/Sidebar'
import { useLocation } from 'react-router-dom'

import Chat from './Chat'

import { Hidden } from '@mui/material'

const Home = () => {

const location=useLocation()

  return (
    <div>
     <>
        <Grid container sx={{height:'100%',display:'flex',flexDirection:'row'}} >
          {location.pathname !=='/' && 
          <Hidden smDown>
          <Grid  item xs={6} md={4} sx={{height:'100%'}}  >
                <Sidebar/>
            </Grid>
            </Hidden>
            }
            {location.pathname ==='/' && <Grid item xs={12} md={4} sx={{height:'100%'}}  >
                <Sidebar/>
            </Grid>}
            
          {location.pathname !=='/' && <Grid item xs={12} sm={4} md={3}  >
                <Chat content="" locationId={location.pathname}/>
                </Grid>
           }
              
          {location.pathname ==='/' && <Grid item>
                <Chat content="Please select chat" locationId={location.pathname}/>
                </Grid>
           }
              
        </Grid>
        </>
    </div>
  )
}

export default Home