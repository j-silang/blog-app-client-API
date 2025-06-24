import { useContext, useEffect } from 'react';
import UserContext from '../UserContext';
import { Navigate } from 'react-router-dom';

export default function Logout() {
  const { setUser, unsetUser } = useContext(UserContext);
  unsetUser(); 
  useEffect(() => {
    setUser({
        id: null,
        isAdmin: null
    });
  }, [setUser])

  return (
    <Navigate to='/login' />
  )
}