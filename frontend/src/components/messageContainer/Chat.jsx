import { useEffect, useState, useRef } from "react";
import Messsage from "./Messsage.jsx";
import ChatInput from "./ChatInput.jsx";
import { useAuthContext } from "../../Context/AuthContext.jsx";
import useConversation from "../../zustand/useConversation.js";
import axios from "axios";
import io from "socket.io-client";

const Chat = () => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Connect to socket
  useEffect(() => {
    if (!selectedConversation) return;

    socketRef.current = io("http://localhost:8000"); // your backend
    socketRef.current.emit("joinRoom", selectedConversation._id);

    socketRef.current.on("newMessage", (msg) => {
      if (msg.conversationId === selectedConversation._id) {
        setMessages((prev) => [...prev, msg]);
        scrollToBottom();
      }
    });

    return () => {
        socketRef.current.off("newMessage");
        socketRef.current.disconnect();}
  }, [selectedConversation]);

  // Fetch messages on conversation change
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedConversation) return;
      try {
        const res = await axios.get(
          `http://localhost:8000/api/messages/${selectedConversation._id}`,
          { headers: { Authorization: `Bearer ${authUser.token}` } }
        );
        setMessages(res.data);
        scrollToBottom();
      } catch (err) {
        console.error(err);
      }
    };
    fetchMessages();
  }, [selectedConversation]);

  // Handle sending message from ChatInput (optimistic UI)
  const handleSendMessage = (tempMessage) => {
    setMessages((prev) => [...prev, tempMessage]);
    scrollToBottom();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-2">
        {messages.map((msg) => (
          <Messsage key={msg._id || msg.tempId} message={msg} />
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      {selectedConversation && (
        <ChatInput
          receiverId={selectedConversation.participants.find(
            (id) => id !== authUser.data._id
          )}
          onSend={handleSendMessage}
        />
      )}
    </div>
  );
};

export default Chat;
