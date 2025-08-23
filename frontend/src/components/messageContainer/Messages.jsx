import Messsage from "./Messsage.jsx";
import useGetMessage from "../../hooks/useGetMessage.js";
import MessageSkeleton from "../Skeletons/MessageSkeleton.jsx";
import { useEffect, useState ,useRef} from "react";
import {formatDateHeading} from '../../utils/extractTime.js'

const Messages = () => {
  const { messages, loading } = useGetMessage();
  const [tick, setTick] = useState(0);
  
  const lastMessageRef = useRef()

  useEffect(()=>{lastMessageRef.current?.scrollIntoView({behavior:"smooth"})},[messages])

  return (
    <div className="px-4 flex-1 overflow-auto">
      {loading &&
        [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)
      }

      {!loading && messages.length === 0 && (
        <p className="text-center">
          Send a message To Start the Conversation
        </p>
      )}

      {!loading &&
        messages.length > 0 &&
        messages.map((msg, index) => 
        {
          const currentDate = formatDateHeading(msg.createdAt);
          const prevDate =
            index > 0
              ? formatDateHeading(messages[index - 1].createdAt)
              : null;

          const showDateHeading = currentDate !== prevDate;

          return (
            <div key={msg._id} className="flex flex-col">
              {showDateHeading && (
                <div className="flex justify-center my-4">
                  <div className="text-sm text-gray-100 0 px-3 py-1 rounded-lg shadow-md w-fit">
                    {currentDate}
                  </div>
                </div>
              )}
              <div 
              ref={index === messages.length - 1 ? lastMessageRef : null}
              >
              <Messsage message={msg} />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Messages;

