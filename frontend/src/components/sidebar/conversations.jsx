import Conversation from './conversation.jsx'
import useGetConversations from '../../hooks/useGetConversations.js';
import { useViewStore } from '../../zustand/view.store.js'
import { useUserStore } from '../../zustand/user.store.js'
function Conversations() {
	
	const setView = useViewStore((state) => state.setView)
	const { loading, conversation } = useGetConversations();
	// console.log(conversation)

	return (
		<div className='py-2 flex flex-col overflow-y-scroll'>
			{conversation.map((conversation, idx) => (
				// console.log(conversation.length),
				<Conversation
					key={conversation._id}
					conversation={conversation}
					fullname={conversation.fullname}
					profilepic={conversation.profilepic}
					_id={conversation._id}
					lastIdx={idx === conversation.length - 1}
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