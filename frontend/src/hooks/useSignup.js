import { useContext, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useAuthContext } from '../Context/AuthContext.jsx';

const useSignup = () => {
  const [loading, setLoading] = useState(false)
  const { setAuthUser } = useAuthContext()
  const signup = async ({ fullname, username, password, confirmPassword, gender }) => {
    const succes = handleInputError({ fullname, username, password, confirmPassword, gender })

    if (!succes) return;
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ fullname, username, password, confirmPassword, gender })
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message || 'Signup failed');
      }
      if (data.error) {
        throw new Error(data.error)
      }

      //local Storage 
      localStorage.setItem('chatUser', JSON.stringify(data))

      //context
      setAuthUser(data)

      if (res.ok) {
        toast.success(data.message)
        return { success: true, message: data.message }
      } else {
        toast.error(data.message || 'signUp Failed')
        return { success: false, message: data.message }
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading }
}

export default useSignup

function handleInputError({ fullname, username, password, confirmPassword, gender }) {
  if (!fullname || !username || !password || !confirmPassword || !gender) {
    toast.error('All fields are required')
    return false
  };
  if (password !== confirmPassword) {
    toast.error("Password Do Not Match");
    return false
  };
  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false
  };

  return true;
}