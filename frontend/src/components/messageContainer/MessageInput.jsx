import React from 'react'
import { BsSend } from 'react-icons/bs'

const MessageInput = () => {
    return (
        <>
            <form className='px-4 my-3'>
 			<div className='w-full flex gap-1 justify-between items-center'>
 				<input
 					type='text'
 					className='border text-sm rounded-lg block w-full p-2.5  bg-gray-200 border-red-400  text-slate-950'
 					placeholder='Send a message'
 				/>
 				<button type='submit' className=' bg-white  text-red-600 font-bold justify-center text-center flex h-8 w-9 items-center cursor-pointer  rounded-full'>
 					<BsSend />
 				</button>
 			</div>
 		</form>
    </>
    )
}

export default MessageInput