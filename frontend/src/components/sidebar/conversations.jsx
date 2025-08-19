import Conversation from './conversation.jsx'
import useGetConversations from '../../hooks/useGetConversations.js';
function Conversations() {
	const {loading, conversation} = useGetConversations();
	console.log(conversation)
  return (
   <div className='py-2 flex flex-col overflow-y-scroll'>
		{conversation.map((conversation,idx) => (
			console.log(conversation.fullname),
			<Conversation 
			key={conversation._id} 
			conversation={conversation} 
			fullname={conversation.fullname}
			profilepic={conversation.profilepic}
			lastIdx = {idx === conversation.length - 1}
			/> 
			
		))}

		{loading ? <span className='loading loading-spinner'> </span> : null}

			
			{/* <Conversation />
			<Conversation />
			<Conversation />
			<Conversation />
			<Conversation />
			<Conversation /> */}
	</div>
  )
}

export default Conversations