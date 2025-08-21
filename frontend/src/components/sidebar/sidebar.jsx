import SearchInput from './SerachInput.jsx'
import Conversations from './conversations.jsx'
import {LogOutButton} from './LogoutBtn.jsx'
import ProfileIcon from './profileIcon.jsx'
import { useViewStore } from '../../zustand/view.store.js'
import { useUserStore } from '../../zustand/user.store.js'
const Sidebar = () => {
  const setView = useViewStore((state) => state.setView)

 
  return (
    <>
    <div className='flex flex-col h-full'>
     
      <div className='border-r border-slate-500 p-4 flex flex-col flex-grow h-full '>
       <h2 className='label-text flex justify-start pl-6
      pt-2 text-2xl text-white font-semibold '> Chats </h2>
        <SearchInput  />

        <div className='divider px-3'></div>
        <div className='overflow-auto'>
          <Conversations  />
        </div>

       <div className='mt-auto p-4  flex-col    font-bold'>
         <div className=''> 
            <ProfileIcon onIconClick = {()=>setView('profile')} />
          </div>
         
            <LogOutButton />
         
        </div>
      </div>
    </div>
    </>
  )
}

export default Sidebar