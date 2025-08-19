import React from 'react'
import GenderCheckbox from './genderCheckbox.jsx'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import useSignup from '../../hooks/useSignup.js'
import { toast } from 'react-hot-toast';

const SignUp = () => {
  const { signup, loading } = useSignup();
  const [inputs, setInputs] = useState({
    fullname: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: '',
  });



  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender })
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signup(inputs)

    if(res.success) {
      toast.success(res.message)
    };

    console.log(inputs);
  }

  return (
    <div
      className='flex flex-col items-center justify-center min-w-96 mx-auto'
    >
      <div className='p-6  w-full bg-grey-900/5 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg  '>
        <h1 className='font-semibold'>Sign Up<span className=' font-semibold text-slate-950'>ChatApp</span></h1>

        <form action="" onSubmit={handleSubmit}>
          <div className='mt-2 mb-1' >
            <label
              htmlFor=""
              className="label p-2 flex jsutify-start "

            >
              <span className="label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder='eg:- William Shakespeare'
              className='w-full input input-bordered h-10'
              value={inputs.fullname}
              onChange={(e) => setInputs({ ...inputs, fullname: e.target.value })}
            />
          </div>
          <div className='mt-2 mb-1'>
            <label htmlFor="" className="label p-2 flex jsutify-start ">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder='Create a Username'
              className='w-full input input-bordered h-10'
              value={inputs.username}
              onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
            />
          </div>
          <div className='mt-2 mb-1'>
            <label htmlFor="" className="label p-2 flex jsutify-start ">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder='Passowrd must be greater than 6' className='w-full input input-bordered h-10'
              value={inputs.password}
              onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            />
          </div>
          <div className='mt-2 mb-3'>
            <label htmlFor="" className="label p-2 flex jsutify-start ">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder='Confirm Password'
              className='w-full input input-bordered h-10'
              value={inputs.confirmPassword}
              onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
            />
          </div>

          <GenderCheckbox oncheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

          <Link to={"/login"}
            className='text-sm hover:underline hover:text-red-600 mt-4 flex justify-start'
          >
            Already Have an Account?
          </Link>

          <div>
            <button className='btn btn-block btn-sm mt-2 hover:border-slate-400 hover:text-red-400 hover:bg-slate-200  hover:font-bold font-semibold border'>
              SignUp
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp