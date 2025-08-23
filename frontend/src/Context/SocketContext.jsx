import { createContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext.jsx";
import io from 'socket.io-client'
import { useContext } from "react";
import useConversation from "../zustand/useConversation.js";


export const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
}


export const SocketContextProvider = ({ children }) => {

    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const { authUser } = useAuthContext();
    const { setMessages, selectedConversation } = useConversation()
    // console.log("Auth User:", authUser);
    useEffect(() => {
        if (authUser?.data._id) {
            const newsocket = io('http://localhost:8000', {
                query: {
                    userId: authUser.data._id,
                }
            })

            setSocket(newsocket)

            const handleOnlineUsers = (data) => {
                console.log("🟢 Online users from server:", data);
                setOnlineUsers(data || [])
            }


            newsocket.on("getOnlineUsers", handleOnlineUsers)

            return () => {
                newsocket.off("getOnlineUsers", handleOnlineUsers)
                newsocket.close();
                setSocket(null)
                setOnlineUsers([])
            };
        } else {
            setSocket(null)
            setOnlineUsers([])
        }
    }, [authUser?._id])

    return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>
}