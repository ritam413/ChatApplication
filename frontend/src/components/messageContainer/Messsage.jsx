import { useAuthContext } from '../../Context/AuthContext.jsx';
import { extractTime } from '../../utils/extractTime.js';
import useConversation from '../../zustand/useConversation.js';
import { useUserStore } from '../../zustand/user.store.js';

const Messsage = ({ message }) => {

  //*Getitng Necessary Data from Stores and Context
  const { authUser } = useAuthContext();
  const { profilepic } = useUserStore((state) => state.user)
  const { selectedConversation } = useConversation();

  //* Determine if message is from me or the other person AND set styles accordingly
  const fromMe = (message.senderId === authUser.data._id)
  const chatClassname = fromMe ? 'chat chat-end' : 'chat chat-start';
  const profilePic = fromMe ? profilepic : selectedConversation?.profilepic
  const bublleBgColour = fromMe ? 'bg-red-500' : 'bg-gray-200'
  const bubbleTextColor = fromMe ? 'text-white' : 'text-gray-950';
  const formattedTime = extractTime(message.createdAt)
  // console.log('Selected Conversation: ', selectedConversation);
  // console.log(fromMe)

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
          {/* text */}
          {message.type === 'text' && <p>{message.message}</p>}

          {/* media - images */}
          {message.mediaUrls?.map((url, idx) =>
            url.match(/\.(jpg|jpeg|png|gif)$/i) ? (
              <img key={idx} src={url} alt="media" className="max-w-xs rounded my-1" />
            ) : url.match(/\.(mp4|webm|ogg)$/i) ? (
              <video key={idx} controls className="max-w-xs rounded my-1">
                <source src={url} />
              </video>
            ) : (
              <a key={idx} href={url} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                {url.split("/").pop()}
              </a>
            )
          )}


          {/* media - files */}
          {message.type === "file" && message.mediaUrls?.map((url, idx) => (
            <a
              key={idx}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-500 underline mt-1"
            >
              {url.split("/").pop()}
            </a>
          ))}

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








































