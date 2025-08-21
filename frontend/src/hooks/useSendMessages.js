import { useState } from "react"
import toast from "react-hot-toast"
import useConversation from "../zustand/useConversation.js"
const useSendMessages = () => {
    const [loading, setLoading] = useState(false)
    const { messages, setMessages, selectedConversation } = useConversation()

    const storedData = localStorage.getItem('chatUser');
    const token = JSON.parse(storedData).token
    // console.log('Token: ', token)
    if (!token) throw new Error("No Token found")


    const sendMessage = async (message) => {
        setLoading(true);
        // console.log("id of selected conversation", selectedConversation._id, "\n Token of selected conversation", selectedConversation.token)
        if (!selectedConversation?._id) {
            console.error("No conversation selected!");
            setLoading(false);
            return;
        }
        try {
            const res = await fetch(`http://localhost:8000/api/messages/send/${selectedConversation._id}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            })

            const data = await res.json()
            if (data.error) {
                throw new Error(data.error)
            }

            setMessages([...messages, data])
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    return { sendMessage, loading }
}

export default useSendMessages