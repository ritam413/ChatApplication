import useConversation from "../zustand/useConversation"
import toast from "react-hot-toast"
import { useEffect, useState } from "react"
import { useSocketContext } from "../Context/SocketContext.jsx";
const useGetMessage = () => {
    const [loading, setLoading] = useState(false)
    const { messages, setMessages, selectedConversation } = useConversation()
    const { socket } = useSocketContext();

    //* Fetch Old Messages when user selects a conversation 
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

                setMessages(Array.isArray(data) ? data : [data])


            } catch (error) {
                toast.error(error.message)
            } finally {
                setLoading(false)
            }
        }

        if (selectedConversation?._id) {
            getMessage()
        }


    }, [selectedConversation?._id, setMessages])

    //*  Listen for real-time new Messages via Socket
    useEffect(() => {
        if (!socket) return;

        console.log("🌐 Socket connected?", socket.connected); // should be true

        socket.emit('joinConversation', selectedConversation?._id);
        toast(`Joined Conversation Room: ${selectedConversation?.fullname || "Unknown"}`,{
            icon: '🟢'
        })
        console.log("🟢 Joined conversation room:", selectedConversation?._id);


        const handleNewMessage = (message) => {
            console.log("🔥 Incoming message event::", message);
            if (
                selectedConversation &&
                message.conversationId === selectedConversation._id
            ) {
                setMessages((prev) => {
                    const tempindex = prev.findIndex((msg) => msg._id.startsWith('temp-') &&
                        msg.senderId === message.senderId &&
                        msg.message === message.message)

                    if (tempindex !== -1) {
                        console.log("🔄 Replacing temp message with server-confirmed:", message);
                        const updatedMessages = [...prev];
                        updatedMessages[tempindex] = message; // Replace temp message with the one from server
                        return updatedMessages;
                    }

                    if (prev.some((m) => m._id === message._id)) {
                        console.log("⚠️ Duplicate message ignored:", message._id);
                        return prev;
                    }
                    

                    console.log("✅ Appening new Message:",message);
                    return [...prev, message];
                });
            } else {
                console.log("⛔ Ignored (different conversation)");
            }
        };

        socket.on("newMessage", handleNewMessage)

        // socket.on("connect", () => {
        //     console.log("✅ Socket connected! ID:", socket.id);
        // })

        // socket.on("disconnect", () => {
        //     console.log("⚠️ Socket disconnected");
        // });

        return () => {
            socket.emit('leaveConversation', selectedConversation?._id);
            setTimeout(()=>{
                toast(`Left Conversation Room: ${selectedConversation?.fullname || "Unknown"}`,{
                icon: '➡️'
            })
            },0) // to allow time for the leave event to be sent
            
            console.log("➡️ Left conversation room:", selectedConversation?.fullname);
            socket.off("newMessage", handleNewMessage)
        }


    // }, [setMessages])
    }, [socket, selectedConversation, setMessages])

    const sendMessage = (senderId, recieverId, text) => {
        if (!socket) return;

        const tempId = `temp-${Date.now()}`; // Temporary ID for optimistic UI
        const message = {
            _id: tempId,
            senderId,
            recieverId,
            message:text,
            conversationId: selectedConversation._id,
            pending: true,
        }

        console.log("📤 Sending message:", message);

        socket.emit('sendMessages', message)

        setMessages((prev) => {
            console.log("💬 Current messages:", prev);
            return [...prev, message]
        }) // Optimistic UI update
    }

    useEffect(()=>{
        if(!socket) return;

        const handleNotification = (message) => {
            console.log("🔔 Notification received:", message);
            if (message.conversationId !== selectedConversation?._id) {
                toast(`New message from ${message.senderId}: ${message.message}`);
            }
        }

        socket.on('notification', handleNotification);

        return () => {
            socket.off('notification', handleNotification);
        }
    },[socket, selectedConversation?._id]);

    return { messages, loading, sendMessage }
}

export default useGetMessage





















// import useConversation from "../zustand/useConversation";
// import toast from "react-hot-toast";
// import { useEffect, useState } from "react";
// import { useSocketContext } from "../Context/SocketContext.jsx";

// const useGetMessage = () => {
//   const [loading, setLoading] = useState(false);
//   const { messages, setMessages, selectedConversation } = useConversation();
//   const { socket } = useSocketContext();

//   //* Fetch Old Messages when user selects a conversation
//   useEffect(() => {
//     const getMessage = async () => {
//       setLoading(true);

//       try {
//         const storedData = localStorage.getItem("chatUser");
//         if (!storedData) throw new Error("No User Logged in");

//         const token = JSON.parse(storedData).token;
//         if (!token) throw new Error("No Token found");

//         const res = await fetch(
//           "http://localhost:8000/api/messages/" + selectedConversation._id,
//           {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         const data = await res.json();
//         if (data.error) throw new Error(data.error);

//         setMessages(Array.isArray(data) ? data : [data]);
//       } catch (error) {
//         toast.error(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (selectedConversation?._id) {
//       getMessage();
//     }
//   }, [selectedConversation?._id, setMessages]);

//   //* Join/leave conversation rooms + listen for messages
//   useEffect(() => {
//     if (!socket || !selectedConversation?._id) return;

//     const conversationId = selectedConversation._id;

//     // ✅ Join room
//     socket.emit("joinConversation", conversationId);
//     console.log("🚪 Joined conversation room:", conversationId);

//     const handleNewMessage = (message) => {
//       console.log("🔥 Incoming message event::", message);

//       if (message.conversationId === conversationId) {
//         setMessages((prev) => {
//           // Replace temp message with confirmed one
//           const tempindex = prev.findIndex(
//             (msg) =>
//               msg._id.startsWith("temp-") &&
//               msg.senderId === message.senderId &&
//               msg.message === message.message
//           );

//           if (tempindex !== -1) {
//             const updatedMessages = [...prev];
//             updatedMessages[tempindex] = message;
//             return updatedMessages;
//           }

//           if (prev.some((m) => m._id === message._id)) {
//             console.log("⚠️ Duplicate message ignored:", message._id);
//             return prev;
//           }

//           return [...prev, message];
//         });
//       } else {
//         console.log("⛔ Ignored (different conversation)");
//       }
//     };

//     socket.on("newMessage", handleNewMessage);

//     // ✅ Cleanup on unmount / conversation switch
//     return () => {
//       socket.emit("leaveConversation", conversationId);
//       console.log("🚪 Left conversation room:", conversationId);
//       socket.off("newMessage", handleNewMessage);
//     };
//   }, [socket, selectedConversation, setMessages]);

//   //* Send message
//   const sendMessage = (senderId, recieverId, text) => {
//     if (!socket || !selectedConversation?._id) return;

//     const tempId = `temp-${Date.now()}`;
//     const message = {
//       _id: tempId,
//       senderId,
//       recieverId,
//       message: text,
//       conversationId: selectedConversation._id,
//       pending: true,
//     };

//     console.log("📤 Sending message:", message);

//     // ✅ Send to server
//     socket.emit("sendMessages", message);

//     // Optimistic UI update
//     setMessages((prev) => [...prev, message]);
//   };

//   //* Notifications
//   useEffect(() => {
//     if (!socket) return;

//     const handleNotification = (message) => {
//       console.log("🔔 Notification received:", message);
//       if (message.conversationId !== selectedConversation?._id) {
//         toast(`New message from ${message.senderId}: ${message.message}`);
//       }
//     };

//     socket.on("notification", handleNotification);

//     return () => {
//       socket.off("notification", handleNotification);
//     };
//   }, [socket, selectedConversation?._id]);

//   return { messages, loading, sendMessage };
// };

// export default useGetMessage;






