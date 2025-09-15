import React from 'react'
import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../../App'

// A wrapper for authenticated routes
const ProtectedRoute = ({ requireEmailVerification, requireAccountVerification }) => {
  const { auth } = useAuth();

  const isAuthorized = () => {
    if(!auth) return false;
    if(requireEmailVerification && requireAccountVerification){
      if(auth.isEmailVerified && auth.isAccountVerified) return true;
      return false;
    }
    if(requireEmailVerification){
      if(auth.isEmailVerified) return true;
      return false;
    }
    if(requireAccountVerification){
      if(auth.isAccountVerified) return true;
      return false;
    }
    return true;
  }
  return ( isAuthorized() ? <Outlet /> :
     <Navigate to={!auth? "/se-connecter": !auth.isEmailVerified? "/verification-email": "/verification-compte"} replace/>)
}

export default ProtectedRoute