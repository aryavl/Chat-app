import React from 'react'
import { Navigate, Route } from 'react-router';


const PrivateRoute = ({children, ...routeProps}) => {
  // console.log(...routeProps,children)
    const profile= false;
    if(!profile){
        return <Navigate to="/signin" replace />
    }
  return (
    <Route {...routeProps}>
        {children}
    </Route>
  )
}

export default PrivateRoute