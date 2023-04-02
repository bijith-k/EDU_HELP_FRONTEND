import React from 'react'
import Sidebar from '../Dashboard/Sidebar'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'


const AddBoard = () => {
  const [board, setBoard] = useState({
    board:''
  })

  const token = localStorage.getItem("Adtoken");

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    }
  };

  const handleSubmit = (e) =>{
    e.preventDefault()
    console.log(board);
    axios.post(`${import.meta.env.VITE_BASE_PATH}admin/add-board`,board,config).then((res)=>{
console.log(res);
toast.success(res.data.message, {
  position: "top-center",
})
setBoard('')
    }).catch(err => {
      toast.error(err.message, {
        position: "top-center",
      })
      
      console.error(err,"err")});
  }

  return (
    <div className='bg-sky-900 flex overflow-x-hidden'>
      <div className=''>
      <Sidebar />
      </div>
      <div className='w-full mt-10'>
       
      <h1 className='text-center text-black font-extrabold bg-white p-3'>ADD BOARD/UNIVERSITY</h1>
      <form action="" onSubmit={handleSubmit} className='flex flex-col mx-auto w-3/4 mt-8'>
        {/* <label htmlFor="board" className='text-white'>Enter the name of board or university</label> */}
        <input type="text" name="board" className="block border border-grey-light w-full p-3 rounded mb-4 uppercase" placeholder='Enter name of board or University'  onChange={(e)=>setBoard({board:e.target.value})} id="" />
        <button type='submit' className='bg-gray-300 text-sky-900 p-3 font-semibold rounded-lg mt-2'>ADD BOARD/UNIVERSITY</button>
      </form>
    
    
    </div>
    </div>
  )
}

export default AddBoard