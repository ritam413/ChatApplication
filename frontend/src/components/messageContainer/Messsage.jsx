import React from 'react'

const Messsage = () => {
  return (
    <>
        <div className='chat chat-end'>
            <div className='chat-image avatar'>
                <div className='w-10 rounded-full'>
                    <img src="https://images.pexels.com/photos/22498861/pexels-photo-22498861.jpeg" alt="TailwindCSS Chat Bubble" />
                </div>
            </div>

            <div className='chat-bubble text-white bg-red-500'>
                <p>Hi, How are you?</p>
            </div>
        </div>
    </>
  )
}

export default Messsage