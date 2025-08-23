import React, { useState } from 'react'
import { BsSend } from 'react-icons/bs'
import { FaPaperclip } from "react-icons/fa6";
import useSendMessages from '../../hooks/useSendMessages'
const MessageInput = () => {

	const [message, setMessage] = useState("")
	const { loading, sendMessage } = useSendMessages();
	const [files, setFiles] = useState([])
	const handleSubmit = async (e) => {
		e.preventDefault()
		if (!message && files.length === 0) return

		let payload;

		if (files.length > 0) {
			payload = new FormData();
			if (message) payload.append("message", message);
			files.forEach(item => payload.append("media", item.file));
		} else {
			payload = message; // text only
		}

		await sendMessage(payload);

		// cleanup
		setMessage("");
		setFiles([]);
	}

	const handleFileSelect = (e) => {
		const selectedFiles = Array.from(e.target.files).map(file => 
			({
				file,
				preview: URL.createObjectURL(file)
			})
		);
		setFiles(prev => [...prev, ...selectedFiles]);
	};
	 const removeFile = (indexToRemove) => {
        // Find the file to be removed to revoke its URL
        const fileToRemove = files[indexToRemove];
        if (fileToRemove) {
            URL.revokeObjectURL(fileToRemove.preview);
        }

        // Update the state by filtering out the file at the specified index
        setFiles(currentFiles =>
            currentFiles.filter((_, index) => index !== indexToRemove)
        );
    };
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
							multiple
							accept='file'
							className='hidden'
							onChange={handleFileSelect}

						/>
					</label>

					<button type='submit' className=' bg-white  text-red-600 font-bold justify-center text-center flex h-8 w-9 items-center cursor-pointer  rounded-full'>
						{loading ? <div className='loading loading-spinner'> </div> : <BsSend />}


					</button>
				</div>
				{/* Show selected file names (optional preview) */}
				{files.length > 0 && (
					// Main horizontal scrolling container
					<div className="mt-2 flex items-center gap-3 overflow-x-auto p-2 bg-gray-100 rounded-lg">
						{files.map((file, idx) => (
							// Each thumbnail is a relative container for the remove button
							<div
								key={idx}
								className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 shadow-md"
							>
								{/* Image preview */}
								<img
									src={file.preview}
									alt={file.name}
									className="w-full h-full object-cover"
									onError={() => URL.revokeObjectURL(file.preview)}
								/>

								{/* Remove Button - styled and positioned on the top-right */}
								<button
									onClick={() => removeFile(idx)}
									className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold hover:bg-red-600 transition-colors"
									aria-label="Remove file"
								>
									✕
								</button>
							</div>
						))}
					</div>
				)}
			</form>
		</>
	)
}

export default MessageInput