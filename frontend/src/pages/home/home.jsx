import Sidebar from "../../components/sidebar/sidebar.jsx"
import MessageContainer from "../../components/messageContainer/messageContainer.jsx"
import ProfilePage from "../../components/sidebar/profile.jsx"
import { useState } from "react"
import { useViewStore } from "../../zustand/view.store.js"
const Home = () => {

  const currentView = useViewStore((state)=>state.currentView)

  return (
  <>
   <div className='flex  rounded-lg w-11/12  min-h-11/12overflow-hidden bg-gray-400/30 bg-clip-padding  backdrop-filter backdrop-blur-lg bg-opacity-0 justify-between h-max '>
			<div className="w-1/3   h-screen max-h-fit   ">
        <Sidebar />
      </div>
      <div className="w-2/3   max-h-fit h-screen ">
      {currentView==='profile'?  <ProfilePage/>:<MessageContainer  />}
		  	
      </div>
    </div>

  </>
)
}

export default Home