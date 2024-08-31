import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import AuthIndex from './pages/auth/AuthIndex'
import ChatIndex from './pages/chat/ChatIndex'
import ProfileIndex from './pages/profile/ProfileIndex'
import { useAppStore } from './store/storeIndex'
import { apiClient } from './lib/api-client'
import { GET_USER_INFO } from './utils/constants'

const PrivateRoutes = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo; //The !!userInfo is a shorthand to convert userInfo into a boolean.
  return isAuthenticated ? children : <Navigate to='/auth' />
}

const AuthRoutes = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo; //The !!userInfo is a shorthand to convert userInfo into a boolean.
  return isAuthenticated ? <Navigate to='/chat' /> : children
}

function App() {
  const { userInfo, setUserInfo } = useAppStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await apiClient.get(GET_USER_INFO, { withCredentials: true });
        if (response.status === 200 && response.data.id) {
          setUserInfo(response.data)
        } else {
          setUserInfo(undefined)
        }
        //console.log({ response });
      } catch (error) {
        setUserInfo(undefined)
      } finally {
        setLoading(false)
      }
    }
    if (!userInfo) {
      getUserData()
    } else {
      setLoading(false)
    }
  }, [userInfo, setUserInfo])

  if (loading) {
    return <div>Loading... Please wait</div>
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth' element={<AuthRoutes> <AuthIndex /></AuthRoutes>} />
        <Route path='/chat' element={<PrivateRoutes>  <ChatIndex /></PrivateRoutes>} />
        <Route path='/profile' element={<PrivateRoutes> <ProfileIndex /></PrivateRoutes>} />
        <Route path='*' element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App