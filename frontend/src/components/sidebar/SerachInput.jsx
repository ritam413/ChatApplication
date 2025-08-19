import React from 'react'
import { Search } from 'lucide-react';
import { IoSearchSharp } from "react-icons/io5"
const SearchInput = () => {
  return (
    <>
      <form className='flex items-center gap-2'>
 			<input type='text' placeholder='Search…' className='input input-bordered rounded-full hover:bg-gray-950' />
 			<button type='submit' className='btn btn-circle bg-red-500 text-white hover:bg-red-600'>
 				<IoSearchSharp className='w-6 h-6 outline-none' />
 			</button>
 		</form>
    </>
  )
}

export default SearchInput