import React from 'react'

const MessageSkeleton = () => {
    return (
        <>
            <div className="flex flex-col gap-3 p-4 w-full">
                {/* Received message */}
                <div className="flex items-start gap-2">
                    <div className="skeleton h-8 w-8 rounded-full"></div>
                    <div className="skeleton h-6 w-40 rounded-2xl"></div>
                </div>

                {/* Sent message */}
                <div className="flex items-start justify-end gap-2">
                    <div className="skeleton h-6 w-32 rounded-2xl"></div>
                    <div className="skeleton h-8 w-8 rounded-full"></div>
                </div>

                {/* Received message (longer bubble) */}
                <div className="flex items-start gap-2">
                    <div className="skeleton h-8 w-8 rounded-full"></div>
                    <div className="skeleton h-6 w-52 rounded-2xl"></div>
                </div>

                {/* Sent message (shorter bubble) */}
                <div className="flex items-start justify-end gap-2">
                    <div className="skeleton h-6 w-20 rounded-2xl"></div>
                    <div className="skeleton h-8 w-8 rounded-full"></div>
                </div>
            </div>
        </>
    )
}

export default MessageSkeleton