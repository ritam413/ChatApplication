import React from 'react'
import SearchInput from './SerachInput.jsx'
import Conversations from './conversations.jsx'
import { LogOut } from 'lucide-react';

const Sidebar = () => {
  return (
    <>
    <div className='flex flex-col h-full'>
      <h2 className='label-text flex justify-start pl-6
      pt-2 text-xl '>Chats</h2>
      <div className='border-r border-slate-500 p-4 flex flex-col flex-grow '>

        <SearchInput />

        <div className='divider px-3'></div>

        <Conversations />

       <div className='mt-auto text-white font-bold'>
          <LogOut />
        </div>
      </div>
    </div>
    </>
  )
}

export default Sidebar