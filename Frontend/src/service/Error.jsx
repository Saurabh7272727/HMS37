import React from 'react'
import { useNavigate } from 'react-router-dom';
const Error = () => {
  const navi = useNavigate();
  return (
    <div className='flex flex-col justify-center items-center'>
      <img src="../../6333074.jpg" alt="Error image" className='w-[600px] h-[500px] min-w-[400px]' />
      <h1 className='text-3xl font-semibold text-slate-700 pt-4'>Not found page</h1>
      <p className='text-5 text-red-400 pt-2 font-thin'>Note : may have you not login</p>
      <button onClick={() => navi('/')} className='m-5 rounded-sm ring-2 ring-slate-700 w-[130px] h-[45px] bg-slate-500 text-white hover:bg-slate-400 hover:text-black '>Home</button>
    </div>
  )
}

export default Error;