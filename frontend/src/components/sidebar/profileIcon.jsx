// src/components/ProfileIcon.js
import {useUserStore} from '../../zustand/user.store.js'

// The component now expects an `onIconClick` prop
const ProfileIcon = ({onIconClick}) => {
  const user = useUserStore((state) => state.user)

  if(!user) {
    return (
    <div className=' spinner loading-spinner'> </div>
    )
  }
  return (
    <div
     className="avatar avatar-online cursor-pointer  "
      onClick={onIconClick}
      > {/* Use the passed-in function */}
      <div className="w-12 rounded-full"> {/* Adjusted size for a sidebar */}
        <img src={user.profilepic} alt="User profile icon" />
      </div>
    </div>
  )
}

export default ProfileIcon;