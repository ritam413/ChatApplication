import React from 'react'

const Login = () => {
    return (
        <div className='flex flex-col items-center justify-center min-w-96 h-screen mx-auto'>
            <div className="p-6  w-full bg-yellow-900/5rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg  ">
                <h1 className="text-3xl font-semibold text-center text-gray-300 text ">
                    Login
                    <span className='text-red-400'>Chat App</span>
                </h1>

                <form action="">
                    <label  className='label p-2 flex justify-start'>
                        <span className='text-base label-text '> Username </span>
                    </label>
                    <input type="text" placeholder='Enter Username' className='input input-bordered w-full h-10' />

                    <label  className=' flex justify-start label p-2'>
                        <span className='text-base label-text '> Password </span>
                    </label>
                    <input type="text" placeholder='Enter Password' className='input input-bordered w-full h-10' />

                    <a href="#" className='text-xs hover:underline hover:text-blue-400 mt-2 flex justify-start'>{"Dont't"} have an account? </a>

                    <div>
                        <button className='btn btn-block btn-sm mt-2 text-gray-300 hover:text-white'>
                            Login
                        </button>
                    </div>

                </form>
            </div>




        </div>
    )
}

export default Login