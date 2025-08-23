
import { useSocketContext } from '../../Context/SocketContext';
import useConversation from '../../zustand/useConversation';
import Conversations from './conversations';

function Conversation({ _id, fullname, profilepic, lastIdx }) {

    const setSelectedConversation = useConversation(state => state.setSelectedConversation);
    const selectedConversation = useConversation(state => state.selectedConversation);

    const { onlineUsers } = useSocketContext();
    // console.log("Online Users:", onlineUsers);

    const isOnline = onlineUsers.includes(_id.toString());
    // console.log("Is Online?", fullname, isOnline);
    // console.log("Is ONline users: ",isOnline)
    
    const conversationData = { _id, fullname, profilepic };

    const isSelected = selectedConversation?._id === _id; // or use a unique _id

    // console.log("Selected:", selectedConversation?._id, "Current:", _id)

    return (
        <>
            <div className={`flex gap-2 items-center hover:bg-sky-300 rounded p-2 py-1 cursor-pointer ${isSelected ? 'bg-sky-500' : 'hover:bg-sky-300'}`
            }
                // onClick={() => setSelectedConversation(conversationData)}
                onClick={() => {
                    if (!isSelected) setSelectedConversation(conversationData)
                    else setSelectedConversation(null)
                }}

            >
                <div className={`avatar ${isOnline ? 'avatar-online' : ''}`}>
                    <div className={`w-12 rounded-full `}>
                        <img
                            src={profilepic}
                            alt='user avatar'
                        />
                    </div>
                </div>

                <div className='flex flex-col flex-1'>
                    <div className='flex gap-3 justify-between'>
                        <p className='font-bold text-gray-200'>{fullname}</p>
                        <span className='text-xl'>🎃</span>
                    </div>
                </div>
            </div>

            {!lastIdx && <div className='divider my-0 py-0 h-1'></div>}
        </>
    )
}

export default Conversation