import Sidebar from "../../components/sidebar/sidebar.jsx"
import MessageContainer from "../../components/messageContainer/messageContainer.jsx"
const Home = () => {
    return (
  <>
   <div className='flex sm:h-[450px] md:h-[750px] rounded-lg w-11/12  min-h-11/12overflow-hidden bg-gray-400/30 bg-clip-padding  backdrop-filter backdrop-blur-lg bg-opacity-0 justify-between '>
			<div className="w-[30%] h-full">
        <Sidebar  />
      </div>
      <div className="w-[70%] h-full">
		  	<MessageContainer  />
      </div>
    </div>

  </>
)
}

export default Home