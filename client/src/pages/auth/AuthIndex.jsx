import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { apiClient } from '../../lib/api-client'
import { LOGIN_ROUTE, SIGNUP_ROUTE } from '../../utils/constants'
import { useNavigate } from "react-router-dom"


function AuthIndex() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmpassword, setConfirmpassword] = useState("")
    const navigate = useNavigate()

    const validateSignup = () => {
        if (!email.length) {
            toast.error("Email is required")
            return false
        }
        if (!password.length) {
            toast.error("Password is required")
            return false
        }
        if (!confirmpassword.length) {
            toast.error("Confirempassword is required")
            return false
        }
        if (password !== confirmpassword) {
            toast.error("Password and Confirempassword should be same")
            return false
        }
        return true
    }

    const validateLogin = () => {
        if (!email.length) {
            toast.error("Email is required")
            return false
        }
        if (!password.length) {
            toast.error("Password is required")
            return false
        }
        return true
    }

    const handleSignup = async () => {
        if (validateSignup()) {
            const response = await apiClient.post(SIGNUP_ROUTE, { email, password }, { withCredentials: true })

            if (response.status === 201) {
                navigate("/profile")
            }
            console.log(response.data);
        }
    }


    const handleLogin = async () => {
        if (validateLogin()) {
            const response = await apiClient.post(LOGIN_ROUTE, { email, password }, { withCredentials: true })
            console.log(response.data);
            navigate("/chat")
        }
    }


    return (
        <div className='flex items-center justify-center h-[100vh] w-[100vw]'>
            <div className='h-[80vh] w-[80vw] bg-white border-2 border-white text-opacity-90 shadow-2xl md:w-[90vw] lg:w-[70vh] xl:w-[60vw] rounded-2xl grid xl:grid-cols-2'>
                <div className='flex items-center justify-center flex-col gap-10'>
                    <div className='flex items-center justify-center flex-col'>
                        <div className='flex items-center justify-center'>
                            <h2 className='text-xl md:text-4xl font-bold mb-6'>Welcome !!!</h2>

                        </div>
                        <p className='font-medium text-center'>Provide your details to set up your account and start chatting with ease in our premium app</p>
                    </div>
                    <div className='flex items-center justify-center w-full'>
                        <Tabs className="w-3/4" defaultValue="login">
                            <TabsList className="bg-transparent rounded-none w-full">
                                <TabsTrigger value="login" className="data-[state=active]:bg-transparent data-[state=active]:text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:font-semibold data-[state=active]:border-b-purple-300 p-3 transition-all duration-300">Login</TabsTrigger>
                                <TabsTrigger value="signup" className="data-[state=active]:bg-transparent data-[state=active]:text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:font-semibold data-[state=active]:border-b-purple-300 p-3 transition-all duration-300">Signup</TabsTrigger>
                            </TabsList>
                            <TabsContent value='login' className='flex flex-col gap-5 mt-10'>
                                <Input
                                    placeholder="Email"
                                    type='email'
                                    className='rounded-2xl p-6'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Input
                                    placeholder="Password"
                                    type='password'
                                    className='rounded-2xl p-6'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Button className='rounded-lg p-6 font-bold text-[16px] bg-green-500 mt-3' onClick={handleLogin}>Login</Button>
                            </TabsContent>
                            <TabsContent value='signup' className='flex flex-col gap-5'>
                                <Input
                                    placeholder="Email"
                                    type='email'
                                    className='rounded-2xl p-6'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Input
                                    placeholder="Password"
                                    type='password'
                                    className='rounded-2xl p-6'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Input
                                    placeholder="Confirm Password"
                                    type='password'
                                    className='rounded-2xl p-6'
                                    value={confirmpassword}
                                    onChange={(e) => setConfirmpassword(e.target.value)}
                                />
                                <Button className='rounded-lg p-6 font-bold text-[16px] bg-purple-500 mt-3' onClick={handleSignup} >Signup</Button>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
                <div className="hidden xl:flex items-center justify-center">
                    <img src="/Login.png" alt="Login" className='h-[500px]' />
                </div>
            </div>
        </div>
    )
}

export default AuthIndex
