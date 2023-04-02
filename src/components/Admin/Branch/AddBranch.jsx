import React from 'react'
import Sidebar from '../Dashboard/Sidebar'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { toast } from 'react-toastify'


const AddBranch = () => {
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState('');
  const [branch, setBranch] = useState('');
console.log(boards,"boards");
  useEffect(() => {
    // Fetch boards from server on component mount
    axios.get(`${import.meta.env.VITE_BASE_PATH}admin/boards`)
      .then(res => setBoards(res.data.boards))
      .catch(err => console.error(err));
  }, []);

  const handleBoardChange = (e) => {
    setSelectedBoard(e.target.value);
  };

  const token = localStorage.getItem("Adtoken");

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    }
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    axios.post(`${import.meta.env.VITE_BASE_PATH}admin/add-branch`,{board:selectedBoard,branch:branch},config).then((res)=>{
console.log(res);
toast.success(res.data.message, {
  position: "top-center",
})
setSelectedBoard('')
setBranch('')
    }) .catch(err => {
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
       
      <h1 className='text-center text-black font-extrabold bg-white p-3 '>ADD BRANCH</h1>
      <form action="" onSubmit={handleSubmit} className='flex flex-col mx-auto  w-3/4 mt-8'>
        
      {/* <label htmlFor="board" className='text-white'>Board</label> */}
      <select id="board" value={selectedBoard} onChange={handleBoardChange}  className="block border border-grey-light w-full p-3 rounded mb-4 uppercase">
        <option value="" disabled>Select Board</option>
        {boards.map(board => (
          <option key={board._id} value={board._id}>{board.name}</option>
        ))}
      </select>
        {/* <label htmlFor="branch" className='text-white'>Enter the name of branch</label> */}
        <input type="text" placeholder='Enter name of branch..'  value={branch} onChange={(e) => setBranch(e.target.value)} id="branch" className="block border border-grey-light w-full p-3 rounded mb-4 uppercase"  />
        <button type='submit' className='bg-gray-300 text-sky-900 p-3 font-semibold rounded-lg mt-2'>ADD BRANCH</button>
      </form>
    
    
    </div>
    </div>
  )
}

export default AddBranch