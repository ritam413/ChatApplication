import React from 'react'

const GenderCheckbox = () => {
  return (
    <>
      <div className='flex gap-2'>
        <div className='form-control'>
          <label htmlFor="" className={"label gap-2 cursor-pointer"}>
            <span className='label-text' >Male</span>
            <input type="checkbox" className="checkbox bg-clip-padding text-blue-500 
  border-white
  text-2xl w-5 h-5
  checked:bg-blue-100 checked:text-blue-500" />
          </label>
        </div>


        <div className='form-control ml-1.5'>
          <label htmlFor="" className={"label gap-2 cursor-pointer"}>
            <span className='label-text' >Female</span>
            <input type="checkbox" className="checkbox bg-clip-padding text-fuchsia-500 
  text-2xl w-5 h-5
  border-white
  checked:bg-fuchsia-100 checked:text-fuchsia-500" />
          </label>
        </div>
        <div className='form-control ml-1.5'>
          <label htmlFor="" className={"label gap-2 cursor-pointer"}>
            <span className='label-text' >Others</span>
            <input type="checkbox" className="checkbox bg-clip-padding text-orange-500 
  text-2xl w-5 h-5
  border-white
  checked:bg-fuchsia-100 checked:text-orange-500" />
          </label>
        </div>


      </div>

    </>
  )
}

export default GenderCheckbox