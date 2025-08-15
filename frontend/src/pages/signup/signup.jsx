import React from 'react'
import GenderCheckbox from './genderCheckbox.jsx'
const SignUp = () => {
  return (
    <div 
      className='flex flex-col items-center justify-center min-w-96 mx-auto'
    >
      <div className='p-6  w-full bg-grey-900/5 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg  '>
        <h1 className='font-semibold'>Sign Up<span className=' font-semibold text-slate-950'>ChatApp</span></h1>

        <form action="">
          <div className='mt-2 mb-1' >
            <label htmlFor="" className="label p-2 flex jsutify-start ">
              <span className="label-text">Full Name</span>
            </label>
            <input type="text" placeholder='eg:- William Shakespeare' className='w-full input input-bordered h-10' />
          </div>
          <div className='mt-2 mb-1'>
            <label htmlFor="" className="label p-2 flex jsutify-start ">
              <span className="label-text">Username</span>
            </label>
            <input type="text" placeholder='Create a Username' className='w-full input input-bordered h-10' />
          </div>
          <div className='mt-2 mb-1'>
            <label htmlFor="" className="label p-2 flex jsutify-start ">
              <span className="label-text">Password</span>
            </label>
            <input type="password" placeholder='Passowrd must be greater than 6' className='w-full input input-bordered h-10' />
          </div>
          <div className='mt-2 mb-1'>
            <label htmlFor="" className="label p-2 flex jsutify-start ">
              <span className="label-text">Confirm Password</span>
            </label>
            <input type="password" placeholder='Confirm Password' className='w-full input input-bordered h-10' />
          </div>

          <GenderCheckbox/>

          <p
            className='text-sm hover:underline hover:text-blue-400 mt-4 flex justify-start'
          >
          Already Have an Account?
          </p>

          <div>
            <button className='btn btn-block btn-sm mt-2 hover:border-slate-400 hover:text-red-400 hover:bg-slate-300 font-semibold border'>
              SignUp
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp