import { useAuthContext } from '../../Context/AuthContext.jsx';
import { extractTime } from '../../utils/extractTime.js';
import useConversation from '../../zustand/useConversation.js';
import { useUserStore } from '../../zustand/user.store.js';
const Messsage = ({message}) => {
  const {profilepic} = useUserStore((state) => state.user)
  const {authUser} = useAuthContext();
  const {selectedConversation} = useConversation();
  const fromMe = (message.senderId === authUser.data._id)
  const chatClassname = fromMe ? 'chat chat-end' : 'chat chat-start';
  const profilePic = fromMe ? profilepic : selectedConversation?.profilepic
  const bublleBgColour = fromMe ? 'bg-red-500' : 'bg-gray-200'
  const bubbleTextColor = fromMe ? 'text-white' : 'text-gray-950';
  const formattedTime = extractTime(message.createdAt)
  console.log('Selected Conversation: ', selectedConversation);
  console.log(fromMe)

  return (
    <>
      <div className={`${chatClassname} `} >
        <div className='chat-image avatar'>
          <div className='w-10 rounded-full'>
            <img
              src={profilePic}
              alt="User Avatar"
            />
          </div>
        </div>

        <div 
          className={`chat-bubble ${bubbleTextColor} ${bublleBgColour} text-start `}
        >
          <p>{message.message}</p>
        </div>
        <div 
          className='chat-footer opacity-50 text-xs flex gap-1'
        > 
        {formattedTime}</div>
      </div>
    </>
  )
}

export default Messsage