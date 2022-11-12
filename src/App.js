import {Route,Routes,Navigate, Router, useLocation} from 'react-router'
import Home from './pages/Home/Index';
import SignIn from './pages/SignIn';
import {useSelector} from 'react-redux'
import Chat from './pages/Home/Chat';



function App() {
  
  const profile=useSelector(state=>state.profile.profile);
  const isLoading=useSelector(state=>state.profile.isLoading);
  const rooms=useSelector(state=>state.room.room);
  const location=useLocation()
  // console.log("ISLOAD",(isLoading && !profile.length>0 ))
  // console.log("location",location)
  
  return (
    <Routes >
{/* 
<Route 
      path='/'
      element={isLoading  ? <Navigate to='/'/> : <SignIn/>}
    />  */}
   {/* <Route 
      path='/signin'
      element={!isLoading  ? <Navigate to='/signin'/> : <Home/>}
    />   */}
    <Route 
      path='*'
      element={(!isLoading&&profile!==null )  ?<Navigate to='/signin'/> : <Home/>}
    /> 
    <Route 
      path='/signin'
      element={(isLoading && !profile.length>0 ) ? <Navigate to='/'/> : <SignIn/>} 
    /> 
   
   
                  {/* <Route
                  path='/chat/:chatId'
                  element={<Chat />}
                  /> */}


 <Route path='*' element={<Navigate to='/' replace/>}/>
    </Routes>
    // <Routes>
    //   <PubliceRoute path='/signin'>
    //     <SignIn/>
    //   </PubliceRoute>
    //   <PrivateRoute path='/'>
    //     <Home/>
    //   </PrivateRoute>
    // </Routes>
  );
}

export default App;
