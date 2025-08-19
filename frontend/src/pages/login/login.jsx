import { Link } from 'react-router-dom'
import { useState } from 'react'
import useLogin from "../../hooks/userLogin.js"
import { LuEyeClosed } from "react-icons/lu";
import { LuEye } from "react-icons/lu";


const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const { login, loading } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(username, password)
    }


    return (
        <div className='flex flex-col items-center justify-center min-w-96 h-screen mx-auto'>
            <div className="p-6  w-full bg-yellow-900/5rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg  ">
                <h1 className="text-3xl font-semibold text-center text-gray-300 text ">
                    Login
                    <span className='text-red-400'>Chat App</span>
                </h1>

                <form action=""
                    onSubmit={handleSubmit}
                >
                    <label className='label p-2 flex justify-start'>
                        <span className='text-base label-text '> Username </span>
                    </label>
                    <input
                        type="text"
                        placeholder='Enter Username' className='input input-bordered w-full h-10'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <label className=' flex justify-start label p-2'>
                        <span className='text-base label-text '> Password </span>
                    </label>
                    <div className="relative w-full">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder='Enter Password'
                            className='input input-bordered w-full h-10 pr-10' // add padding to right for the icon
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button
                            type="button"
                            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-xl text-gray-600"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <LuEye  className='text-red-400  hover:text-red-300' />
                            ) : (
                                <LuEyeClosed  className='text-white hover:text-red-100 '/>
                            )}
                        </button>
                    </div>
                    <Link to="/signup" className='text-xs hover:underline hover:text-red-600 mt-2 flex justify-start'>{"Dont't"} have an account? </Link>

                    <div>
                        <button
                            disabled={loading}
                            className='btn btn-block btn-sm mt-2 text-gray-300 hover:text-white'>
                            {loading ? <span className='loading loading-spinner'></span> : "Login"}
                        </button>
                    </div>

                </form>
            </div>




        </div>
    )
}

export default Login