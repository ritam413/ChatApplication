import Messages from './Messages.jsx'
import MessagesInput from './MessageInput.jsx'
import { TiMessages } from 'react-icons/ti';
import ProfilePage from '../sidebar/profile.jsx';

function MessageContainer() {
  const noChatSelected = true; // renamed to avoid conflict

  return (
    <div className='md:min-w-[450px] flex flex-col h-full'>
      {noChatSelected ? (
        <>
          <NoChatPlaceholder />
        </>
      ) : (
        <>
          {/* Header */}
          <div className='bg-slate-500 px-4 py-2 mb-2'>
            <span className='label-text'>To:</span>
            <span className='text-gray-900 font-bold'>John doe</span>
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
  return (
    <div className='flex items-center justify-center w-full h-full'>
      <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
        <p>Welcome 👋 </p>
        <p>Select a chat to start messaging</p>
        <TiMessages className='text-3xl md:text-6xl text-center' />
      </div>
    </div>
  );
};
