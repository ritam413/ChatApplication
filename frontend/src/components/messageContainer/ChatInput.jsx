import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../Context/AuthContext.jsx";
import userSendMessages from "../../hooks/useSendMessages.js";
import { FaPaperclip } from "react-icons/fa6";

const ChatInput = ({ receiverId, onSend }) => {
    const { authUser } = useAuthContext();
    const { sendMessage, loading } = userSendMessages();

    const [text, setText] = useState("");
    const [imageFiles, setImageFiles] = useState([]);
    const [docFiles, setDocFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    // Handle image selection
    const handleImageSelect = (e) => {
        const files = Array.from(e.target.files);
        setImageFiles((prev) => [...prev, ...files]);
        setImagePreviews((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))]);
    };

    // Handle document selection
    const handleDocSelect = (e) => {
        const files = Array.from(e.target.files);
        setDocFiles((prev) => [...prev, ...files]);
    };

    // Remove selected image preview
    const removeImage = (idx) => {
        // Revoke the memory for the image
        URL.revokeObjectURL(idx)

        // Remove from state
        setImageFiles((prev) => prev.filter((_, i) => i !== idx));
        setImagePreviews((prev) => prev.filter((_, i) => i !== idx));

    };

    // Remove selected doc
    const removeDoc = (idx) => {
        setDocFiles((prev) => prev.filter((_, i) => i !== idx));
    };

    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files);

        files.forEach(file => {
            if (file.type.startsWith("image/")) {
                setImageFiles(prev => [...prev, file]);
                setImagePreviews(prev => [...prev, URL.createObjectURL(file)]);
            } else {
                setDocFiles(prev => [...prev, file]);
            }
        });
    };

    // Send message
    const handleSend = async () => {
        if (!text && imageFiles.length === 0 && docFiles.length === 0) return;


        const tempMessage = {
            tempId: Date.now(), // temp id for UI
            senderId: authUser.data._id,
            receiverId,
            message: text,
            mediaUrls: [
                ...imageFiles.map((f) => URL.createObjectURL(f)),
                ...docFiles.map((f) => URL.createObjectURL(f)),
            ],
            type: imageFiles.length
                ? "image"
                : docFiles.length
                    ? "file"
                    : "text",
            createdAt: new Date().toISOString(),
            conversationId: receiverId, // temp
        };

        // Optimistic UI
        onSend(tempMessage);

        //Build Payload
        const formData = new FormData();
        formData.append("message", text);
        imageFiles.forEach((file) => formData.append("media", file));
        docFiles.forEach((file) => formData.append("media", file));

        await sendMessage(formData);

        // cleanup
        imagePreviews.forEach(URL.revokeObjectURL);
        setText("");
        setImageFiles([]);
        setDocFiles([]);
        setImagePreviews([]);
    };

    return (
        <div className="p-2 border-t border-gray-300">
            {/* Preview images */}
            {imagePreviews.length > 0 && (
                <div className="flex gap-2 mb-2 overflow-x-auto">
                    {imagePreviews.map((src, idx) => (
                        <div key={idx} className="relative">
                            <img src={src} alt="preview" className="w-20 h-20 object-cover rounded" />
                            <button
                                onClick={() => removeImage(idx)}
                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Preview docs */}
            {docFiles.length > 0 && (
                <div className="flex flex-col gap-1 mb-2">
                    {docFiles.map((file, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-gray-100 px-2 py-1 rounded">
                            <span>{file.name}</span>
                            <button onClick={() => removeDoc(idx)} className="text-red-500 font-bold">
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <div className="flex gap-2 items-center">
               

                {/* Doc Upload */}
                <label className="cursor-pointer bg-gray-200 px-2 py-1 rounded flex items-center justify-center">
                    <FaPaperclip className="text-gray-700" />
                    <input
                        type="file"
                        multiple
                        className="hidden"
                        onChange={handleFileSelect}
                    />
                </label>

                {/* Text Input */}
                <input
                    type="text"
                    placeholder="Type a message"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="flex-1 border rounded px-2 py-1 focus:outline-none"
                />

                {/* Send Button */}
                <button
                    onClick={handleSend}
                    disabled={loading}
                    className="bg-blue-500 text-white px-4 py-1 rounded disabled:opacity-50"
                >
                    {loading ? "..." : "Send"}
                </button>
            </div>
        </div>
    );
};

export default ChatInput;
