import React, { useState } from 'react'
import { Search } from 'lucide-react';
import { IoSearchSharp } from "react-icons/io5"
import useConversation from '../../zustand/useConversation';
import useGetConversations from '../../hooks/useGetConversations';
import toast from 'react-hot-toast';
const SearchInput = () => {


  const {setSelectedConversation } = useConversation()
  const conversations = useGetConversations()
  const [ search , setSearch ] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!search) return ;
    if(search.length<3){
      return toast.error("Search must be at least 3 characters")
    }

    console.log("conversation : ",conversations)

    const conversation = conversations.conversation.find((e)=>e.fullname.toLowerCase().includes(search.toLowerCase()))

    const filteredConversations = conversations.conversation.filter((e)=>e.fullname.toLowerCase().includes(search.toLowerCase()))
    
    if(conversation){
      setSelectedConversation(conversation)
      setSearch('')
    }else{
      toast.error("Conversation not found")
    }
  }
  return (
    <>
      <form 
        className='flex items-center gap-2'
        onSubmit={handleSubmit}
      >
 			<input 
        type='text' 
        placeholder='Search…' 
        className='input input-bordered rounded-full hover:bg-gray-950'
        value={search}
        onChange={(e) => setSearch(e.target.value)} 
      />
 			<button type='submit' className='btn btn-circle bg-red-500 text-white hover:bg-red-600'>
 				<IoSearchSharp className='w-6 h-6 outline-none' />
 			</button>
 		</form>
    </>
  )
}

export default SearchInput



// const SearchInput = () => {
//   const { conversation } = useGetConversations(); // array of conversations
//   const [search, setSearch] = useState("");

//   const filteredConversations = conversation.filter((c) =>
//     c.fullname.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Search..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         className="w-full px-3 py-2 rounded-md"
//       />

//       <div className="mt-2">
//         {filteredConversations.map((conv) => (
//           <Conversations key={conv._id} data={conv} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SearchInput;