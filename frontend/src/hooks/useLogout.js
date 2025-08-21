import { useState } from "react";
import { useAuthContext } from "../Context/AuthContext.jsx";
import toast from "react-hot-toast";
import { useUserStore } from "../zustand/user.store.js";
export const useLogout = ()=>{
    const [loading,setLoading]=useState(false)
    const clearUser = useUserStore(state=>state.clearUser)
    const {setAuthUser} = useAuthContext()    
    const logout = async()=>{
        setLoading(true)
        try {
            const res = await fetch('http://localhost:8000/api/auth/logout', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
            })
            
            const data = await res.json()
            if(data.error){
                throw new Error(data.error)
            }

            clearUser()
            localStorage.removeItem('chatUser')
            toast.success(data.message)
            setAuthUser(null);
        } catch (error) {
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }
    return {logout,loading}
}