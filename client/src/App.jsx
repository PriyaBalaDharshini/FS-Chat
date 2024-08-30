import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import AuthIndex from './pages/auth/AuthIndex'
import ChatIndex from './pages/chat/ChatIndex'
import ProfileIndex from './pages/profile/ProfileIndex'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth' element={<AuthIndex />} />
        <Route path='/chat' element={<ChatIndex />} />
        <Route path='/profile' element={<ProfileIndex />} />
        <Route path='*' element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App