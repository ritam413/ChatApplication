import React, { useState } from 'react'
import { BsSend } from 'react-icons/bs'
import { FaPaperclip } from "react-icons/fa6";
import useSendMessages from '../../hooks/useSendMessages'
const MessageInput = () => {

	const [message, setMessage] = useState("")
	const { loading, sendMessage } = useSendMessages();
	const handleSubmit = async (e) => {
		e.preventDefault()

		if (!message) return

		await sendMessage(message)
		setMessage("");
	}
	return (
		<>
			<form
				className='px-4 my-3'
				onSubmit={handleSubmit}
			>
				<div className='w-full flex gap-1 justify-between items-center'>
					<input
						type='text'
						className='border text-sm rounded-lg block w-full p-2.5  bg-gray-200 border-red-400  text-slate-950'
						placeholder='Send a message'
						value={message}
						onChange={(e) => setMessage(e.target.value)}
					/>
					{/* Image Upload Button */}
					<label className='bg-white text-red-600 font-bold flex h-8 w-9 items-center justify-center cursor-pointer rounded-full'>
						<FaPaperclip />
						<input
							type='file'
							accept='file'
							className='hidden'
							
						/>
					</label>
					
					<button type='submit' className=' bg-white  text-red-600 font-bold justify-center text-center flex h-8 w-9 items-center cursor-pointer  rounded-full'>
						{loading ? <div className='loading loading-spinner'> </div> : <BsSend />}


					</button>
				</div>
			</form>
		</>
	)
}

export default MessageInput