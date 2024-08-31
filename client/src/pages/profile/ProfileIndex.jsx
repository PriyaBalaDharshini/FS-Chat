import React, { useEffect, useState } from 'react'
import { useAppStore } from '../../store/storeIndex'
import { useNavigate } from 'react-router-dom'
import { IoAdd, IoArrowBack, IoTrash } from 'react-icons/io5'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { colors, getColor } from '../../lib/utils'
import { toast } from 'sonner'
import { apiClient } from '../../lib/api-client.js'
import { UPDATE_PROFILE_ROUTE } from '../../utils/constants'


function ProfileIndex() {
    const { userInfo, setUserInfo } = useAppStore()
    const navigate = useNavigate()

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [image, setImage] = useState(null)
    const [hover, setHover] = useState(false)
    const [selectedColour, setSelectedColour] = useState(0)

    useEffect(() => {
        if (userInfo.profileSetup === true) {
            setFirstName(userInfo.firstName)
            setLastName(userInfo.lastName)
            setSelectedColour(userInfo.color)
        }
    }, [userInfo])


    const validateProdile = () => {
        if (!firstName) {
            toast.error("Please fill First Name")
            return false
        }

        if (!lastName) {
            toast.error("Please fill Last Name")
            return false
        }
        return true
    }

    const saveChanges = async () => {
        if (validateProdile()) {
            try {
                const response = await apiClient.post(UPDATE_PROFILE_ROUTE, { firstName, lastName, color: selectedColour }, { withCredentials: true })
                if (response.status === 200 && response.data) {
                    setUserInfo({ ...response.data });
                    toast.success("Profile Updated Successfully")
                    navigate("/chat")
                }

            } catch (error) {
                console.log(error);
            }
        }
    }



    return (
        <div className='bg-slate-700 h-[100vh] flex items-center justify-center flex-col gap-10'>
            <div className="flex flex-col gap-10 w-[80vw] md:w-auto">
                <div> <IoArrowBack className='text-4xl text-white/80 cursor-pointer lg:text-6l' /> </div>
            </div>

            {/* New wrapper div around avatar and input */}
            <div className="flex flex-col items-center justify-center gap-10">
                <div className="grid grid-cols-2">
                    <div className="flex justify-center items-center h-full w-32 md:w-48 md:h-48 relative"
                        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                        <Avatar className='h-32 w-32 md:h-48 md:w-48 rounded-full overflow-hidden'>
                            {
                                image ? <AvatarImage src={image} alt='profileImage' className='object-cover h-full w-full' /> :
                                    (<div className={`uppercase h-32 w-32  md:h-48 md:w-48 text-4xl border-[1px] flex items-center justify-center rounded-full text-white ${getColor(selectedColour)}`}>
                                        {firstName ? firstName.split("").shift() : userInfo.email.split("").shift()}
                                    </div>)
                            }
                        </Avatar>

                        {
                            hover && (
                                <div className='absolute inset-0 flex items-center justify-center cursor-pointer rounded-full'>
                                    {
                                        image ?
                                            <IoTrash className='text-[30px] bg-white/90  p-2 rounded-full' /> :
                                            <IoAdd className='text-[30px] bg-white/90 p-2 rounded-full' />
                                    }
                                </div>
                            )
                        }
                    </div>

                    <div className='flex min-w-32 md:min-w-64 flex-col gap-5 items-center justify-center'>
                        <div className='w-full'>
                            <Input placeholder="Email" type="email" disabled value={userInfo.email} className='rounded-2xl p-6 border-none' />
                        </div>

                        <div className='w-full'>
                            <Input placeholder="Firstname" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className='rounded-2xl p-6 border-none' />
                        </div>

                        <div className='w-full'>
                            <Input placeholder="Lastname" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className='rounded-2xl p-6 border-none' />
                        </div>

                        <div className='w-full flex items-center justify-center gap-6 mt-3'>
                            {colors.map((color, index) =>
                                <div
                                    className={`rounded-full h-8 w-8 ${color} cursor-pointer duration-300 transition-all ${selectedColour === index ? 'outline outline-white outline-2' : ""}`}
                                    key={index}
                                    onClick={() => setSelectedColour(index)}>

                                </div>)
                            }
                        </div>
                    </div>
                </div>

                {/* Button placed in the center under both sections */}
                <div className="w-full">
                    <Button className={`h-14 w-full ${getColor(selectedColour)}  hover:text-white transition-all duration-500`} onClick={saveChanges}>
                        Save Changes
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ProfileIndex