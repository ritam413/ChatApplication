// src/components/ProfilePage.js
import { useUserStore } from '../../zustand/user.store.js';
import { useViewStore } from '../../zustand/view.store.js'
import { IoArrowBack } from "react-icons/io5"; // Example icon
import { useState } from 'react';




const ProfilePage = () => {
  const setView = useViewStore((state) => state.setView)
  const user = useUserStore((state) => state.user)
  const [showModal, setShowModal] = useState(false);

  if (!user) {
    return (
      <div className="p-6 text-center text-red-500">
        No user is logged in.
      </div>
    );
  }

  return (
    // No longer a dialog. Just a div that fills its container.
    <div className="p-6 md:p-8 h-full w-full overflow-y-auto bg-base-200">

      {/* Back Button to return to chat */}
      <button onClick={() => setView('chats')} className="btn btn-ghost mb-4">
        <IoArrowBack size={20} />
        Back to Chats
      </button>

      {/* The rest of your profile layout is the same */}
      <div className="max-w-md mx-auto">
        <div className="flex flex-col items-center">
          <div className="avatar mb-5">
            <div
              className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
              onClick={() => setShowModal(true)}
            >
              <img src={user.profilepic} alt={`${user.fullName} profile picture`} />
            </div>
          </div>
          <h2 className="text-3xl font-bold">{user.fullname}</h2>
          <p className="text-base-content/60">{user.username}</p>
        </div>

        <div className="my-6">
          <div className="divider divider-primary">About Me</div>
          <p className="text-left text-sm leading-relaxed">{user.description}</p>
        </div>
        {showModal && (
          <dialog id="profile_modal" className="modal modal-open">
            <div className="modal-box max-w-md md:max-w-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Profile Picture</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="btn btn-sm btn-circle btn-ghost"
                >
                  ✕
                </button>
              </div>
              <img
                src={user.profilepic}
                alt="Full profile"
                className="w-full rounded-lg"
              />
            </div>
            <form method="dialog" className="modal-backdrop">
              <button onClick={() => setShowModal(false)}>close</button>
            </form>
          </dialog>
        )}
        <div>
          <div className="divider divider-primary">Details</div>
          <div className="flex flex-col gap-3 text-left">
            <div className="flex justify-between items-center bg-base-100/50 p-3 rounded-lg">
              <span className="font-semibold text-base-content/70">Gender</span>
              <span className="font-medium">{user.gender}</span>
            </div>
            <div className="flex justify-between items-center bg-base-100/50 p-3 rounded-lg">
              <span className="font-semibold text-base-content/70">Location</span>
              <span className="font-medium">Berlin, Germany</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;