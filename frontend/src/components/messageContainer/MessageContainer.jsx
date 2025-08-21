import Messages from './Messages.jsx'
import MessagesInput from './MessageInput.jsx'
import { TiMessages } from 'react-icons/ti';
import useConversation from '../../zustand/useConversation.js';
import { useUserStore } from '../../zustand/user.store.js';

function MessageContainer() {
  const user = useUserStore((state) => state.user);

  const {selectedConversation,setSelectedConversation}=useConversation();
  return (
    <div className='md:min-w-[450px] flex flex-col h-full'>
      {!selectedConversation ? (
        <>
          <NoChatPlaceholder />
        </>
      ) : (
        <>
          {/* Header */}
          <div className='bg-slate-950/40 backdrop-blur-4xl rounded-b-3xl px-2 py-2 mb-2 flex '>
            <span className='label-text mr-2'>
              <div className='avatar'>
                <div className='w-8 rounded-full'>
                  <img src={selectedConversation.profilepic} alt="" />
                </div>
              </div>
            </span>
            <span className='text-gray-100 font-bold'>{selectedConversation.fullname}</span>
          </div>
          <Messages />
          <MessagesInput />

        </>
      )}
    </div>
  );
}

export default MessageContainer;



const NoChatPlaceholder  = () => {
  const user = useUserStore((state) => state.user);
  
  return (
    <div className='flex items-center justify-center w-full h-full'>
      <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
        <p>Welcome {user.fullname}👋 </p>
        <p>Select a chat to start messaging</p>
        <TiMessages className='text-3xl md:text-6xl text-center' />
      </div>
    </div>
  );
};
