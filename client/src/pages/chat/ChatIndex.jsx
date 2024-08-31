import React, { useEffect } from 'react'
import { useAppStore } from '../../store/storeIndex'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'


function ChatIndex() {
    const { userInfo } = useAppStore()
    const navigate = useNavigate()

    useEffect(() => {
        if (userInfo && !userInfo.profileSetup) {
            toast("Please complete profile setup to contiue. Thank you!")
            return navigate("/profile")
        }
    }, [userInfo, navigate])

    return (
        <div>ChatIndex</div>
    )
}

export default ChatIndex