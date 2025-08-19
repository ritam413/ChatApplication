import {create} from 'zustand'

const useConversation = create((set)=>({
    selectedConversation: null,
    selectedConversation: (selectedConversation)=>set({selectedConversation}),
    messages:[],
    setMessages: (messages)=>set({messages}),
}))

export default useConversation