import { useState } from 'react'
import { useAuthContext } from '../Context/AuthContext.jsx'
import toast from 'react-hot-toast'
import { useUserStore } from '../zustand/user.store.js';
const useLogin = () => {
    const [loading, setloading] = useState(false)
    const { setAuthUser } = useAuthContext()

    const login = async (username, password) => {
        const success = handleInputError({ username, password })

        if (!success) return { success: false };

        setloading(true)
        try {
            const res = await fetch('http://localhost:8000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            })

            const data = await res.json()

            if (!res.ok) {
                const errorMsg = data?.error || data?.message || 'Login Failed'
                toast.error(errorMsg)
                return { success: false, message: data.message }
            }

            const { data: user, token } = data

            localStorage.setItem('chatUser', JSON.stringify({ data: user, token }))

            setAuthUser({ data: user, token })

            const { setUser } = useUserStore.getState();
            setUser(user);
            toast.success("Login successful");

        } catch (error) {
            toast.error(error.message)
            return { success: false, message: error.message }
        } finally {
            setloading(false)
        }
    }

    return { login, loading }
}

export default useLogin



function handleInputError({ username, password }) {
    if (!username || !password) {
        toast.error('All fields are required')
        return false
    };


    return true;
}