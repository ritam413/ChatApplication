import { useAuthContext } from '../../Context/AuthContext.jsx';
import { extractTime } from '../../utils/extractTime.js';
import useConversation from '../../zustand/useConversation.js';
import { useUserStore } from '../../zustand/user.store.js';
import { useState } from 'react';
const Messsage = ({ message, onPreviewOpen }) => {
  const { authUser } = useAuthContext();
  const { profilepic } = useUserStore((state) => state.user);
  const { selectedConversation } = useConversation();

  const fromMe = message.senderId === authUser.data._id;
  const chatClassname = fromMe ? 'chat chat-end' : 'chat chat-start';
  const profilePic = fromMe ? profilepic : selectedConversation?.profilepic;
  const bublleBgColour = fromMe ? 'bg-red-500' : 'bg-gray-200';
  const bubbleTextColor = fromMe ? 'text-white' : 'text-gray-950';
  const formattedTime = extractTime(message.createdAt);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const previewableMedia = message.mediaUrls
    ?.map(url => {
      if (url.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
        return { file: { type: 'image/' }, preview: url };
      }
      if (url.match(/\.(mp4|webm|ogg)$/i)) {
        return { file: { type: 'video/' }, preview: url };
      }
      return null;
    })
    .filter(Boolean);

  const totalMedia = previewableMedia?.length || 0;


  return (
    <div className={`${chatClassname}`}>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
          <img src={profilePic} alt="User Avatar" />
        </div>
      </div>

      <div className={`chat-bubble ${bubbleTextColor} ${bublleBgColour} text-start p-2`}>
        {/* Display message text if it exists */}
        {message.message && <p className="mb-1">{message.message}</p>}

        {/* --- THIS IS THE CORRECTED SECTION --- */}
        {/* Render media in a grid and make it clickable */}
        {previewableMedia && previewableMedia.length > 0 && (
          <div className="mt-1 space-y-1">
            {previewableMedia.length === 1 && (
              // Single full-width preview
              <div
                className="relative cursor-pointer rounded-md overflow-hidden h-64 w-full"
                onClick={() => onPreviewOpen(previewableMedia, 0)}
              >
                {previewableMedia[0].file.type.startsWith("image/") ? (
                  <img
                    src={previewableMedia[0].preview}
                    alt="media"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    src={previewableMedia[0].preview}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            )}

            {previewableMedia.length === 2 && (
              // Two side-by-side
              <div className="grid grid-cols-2 gap-1">
                {previewableMedia.map((media, idx) => (
                  <div
                    key={idx}
                    className="relative cursor-pointer rounded-md overflow-hidden h-40 w-full"
                    onClick={() => onPreviewOpen(previewableMedia, idx)}
                  >
                    {media.file.type.startsWith("image/") ? (
                      <img
                        src={media.preview}
                        alt="media"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <video
                        src={media.preview}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {previewableMedia.length === 3 && (
              <>
                {/* First 2 in grid */}
                <div className="grid grid-cols-2 gap-1">
                  {previewableMedia.slice(0, 2).map((media, idx) => (
                    <div
                      key={idx}
                      className="relative cursor-pointer rounded-md overflow-hidden h-40 w-full"
                      onClick={() => onPreviewOpen(previewableMedia, idx)}
                    >
                      {media.file.type.startsWith("image/") ? (
                        <img
                          src={media.preview}
                          alt="media"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <video
                          src={media.preview}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Last one full width */}
                <div
                  className="relative cursor-pointer rounded-md overflow-hidden h-40 w-full"
                  onClick={() => onPreviewOpen(previewableMedia, 2)}
                >
                  {previewableMedia[2].file.type.startsWith("image/") ? (
                    <img
                      src={previewableMedia[2].preview}
                      alt="media"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video
                      src={previewableMedia[2].preview}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </>
            )}

            {previewableMedia.length === 4 && (
              // 2x2 grid
              <div className="grid grid-cols-2 gap-1">
                {previewableMedia.map((media, idx) => (
                  <div
                    key={idx}
                    className="relative cursor-pointer rounded-md overflow-hidden h-40 w-full"
                    onClick={() => onPreviewOpen(previewableMedia, idx)}
                  >
                    {media.file.type.startsWith("image/") ? (
                      <img
                        src={media.preview}
                        alt="media"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <video
                        src={media.preview}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {previewableMedia.length > 4 && (
              // First 4 in grid + overlay
              <div className="grid grid-cols-2 gap-1">
                {previewableMedia.slice(0, 4).map((media, idx) => (
                  <div
                    key={idx}
                    className="relative cursor-pointer rounded-md overflow-hidden h-40 w-full"
                    onClick={() => onPreviewOpen(previewableMedia, idx)}
                  >
                    {media.file.type.startsWith("image/") ? (
                      <img
                        src={media.preview}
                        alt="media"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <video
                        src={media.preview}
                        className="w-full h-full object-cover"
                      />
                    )}

                    {/* Overlay only on last item */}
                    {idx === 3 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-2xl font-bold">
                        +{previewableMedia.length - 4}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}



      </div>

      <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>
        {formattedTime}
      </div>
    </div>
  );
};

export default Messsage;