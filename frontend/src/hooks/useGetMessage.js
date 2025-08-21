import useConversation from "../zustand/useConversation"
import toast from "react-hot-toast"
import { useEffect, useState } from "react"
const useGetMessage = () => {
    const [loading, setLoading] = useState(false)
    const { messages, setMessages, selectedConversation } = useConversation()

    useEffect(() => {
        const getMessage = async () => {
            setLoading(true)

            try {
                const storedData = localStorage.getItem('chatUser');
                if (!storedData) throw new Error("No User Logged in ")

                const token = JSON.parse(storedData).token
                // console.log('Token: ', token)
                if (!token) throw new Error("No Token found")

                const res = await fetch('http://localhost:8000/api/messages/' + selectedConversation._id, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                const data = await res.json()
                if (data.error) throw new Error(data.error)

                setMessages(data)


            } catch (error) {
                toast.error(error.message)
            } finally {
                setLoading(false)
            }
        }
        
        if (selectedConversation?._id) getMessage()
        
    }, [selectedConversation?._id])

    return { messages, loading }
}

export default useGetMessage