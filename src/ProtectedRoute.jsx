import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useFirebase } from './context/firebase'

function ProtectedRoute() {
  const location = useLocation();
  const {user} = useFirebase()

  if(user) {
    return <Outlet/>
  } else {
    return <Navigate to='/' state={{from: location}} replace/>
  }

}

export default ProtectedRoute