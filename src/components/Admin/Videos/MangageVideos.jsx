import React, { useEffect, useState } from 'react'
import Sidebar from '../Dashboard/Sidebar'
import ragam from "../../../assets/ragam.jpeg";
import { FaSearch } from "react-icons/fa";

import { styled } from '@mui/material/styles';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StyledTableCell = styled(TableCell)({
  borderBottom: 'none',
  fontWeight: 'bold',
});

const StyledTableContainer = styled(TableContainer)({
  overflowX: 'auto',
});
const MangageVideos = () => {
  
  const [videos, setVideos] = useState([])
 
  const [boards, setBoards] = useState([])
  const [branches, setBranches] = useState([])

  const navigate = useNavigate()
  const [data, setData] = useState('data hereeeeee')
  const [order, setOrder] = useState('ASC')

  console.log(videos,"nooo");
  useEffect(() => {

    axios.get(`${import.meta.env.VITE_BASE_PATH}admin/videos`).then((res)=>{
      console.log(res);
      setVideos(res.data)
    })

    // axios.get(`${import.meta.env.VITE_BASE_PATH}admin/boards`).then((res)=>{
    //   console.log(res);
    //   setBoards(res.data.boards)
    // })

    // axios.get(`${import.meta.env.VITE_BASE_PATH}admin/branches`).then((res)=>{
    //   console.log(res,'3');
    //   setBranches(res.data.branches)
    // })
   
  }, [])
  

  const sorting =(col) =>{
    if(order === 'ASC'){
      const sorted = [...boards].sort((a,b)=>
      a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      )
      setBoards(sorted)
      setOrder('DSC')
    }
    if(order === 'DSC'){
      const sorted = [...boards].sort((a,b)=>
      a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      )
      setBoards(sorted)
      setOrder('ASC')
    }
  }

  const sortingBranch =(col) =>{
    if(order === 'ASC'){
      const sorted = [...branches].sort((a,b)=>
      a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      )
      setBranches(sorted)
      setOrder('DSC')
    }
    if(order === 'DSC'){
      const sorted = [...branches].sort((a,b)=>
      a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      )
      setBranches(sorted)
      setOrder('ASC')
    }
  }
  return (
    <div className='bg-sky-900 flex overflow-x-hidden'>
    <div>
    <Sidebar />
    </div>
    
    <div className='w-full  overflow-clip'>
    <p className='bg-white w-full p-3 my-5 uppercase font-bold text-center'>manage videos</p>
      <div className='flex justify-around'>
      {/* <div className="bg-white p-3 rounded-2xl inline-flex ">
<input type="text" name="" id="" placeholder='search' className='inline-block' />
<div className='bg-sky-900 p-3 text-white rounded-full inline-block'>
  <FaSearch />
</div>
</div> */}
<div className="bg-white p-3 rounded-2xl inline-flex flex-col md:flex-row md:w-auto mr-2">
<input type="text" name="" id="" placeholder='search' className='mb-2 md:mb-0 md:mr-2 inline-block w-full md:w-auto' />
<div className='bg-sky-900 p-3 text-white rounded-full  flex justify-center'>
  <FaSearch />
</div>
</div>

      {/* <div className='bg-white p-2 rounded-2xl flex'>
        <button className='font-bold text-sky-900' onClick={()=>navigate('/admin-add-branch')}>ADD VIDEOS</button>
      </div> */}
      </div>
     
    <StyledTableContainer component={Paper} className='rounded-2xl mt-3  border-4 border-white' >
    <Table className='min-w-2'>
      <TableHead>
        <TableRow className='bg-green-300'>
          <StyledTableCell className=''  >No</StyledTableCell>
          <StyledTableCell onClick={()=>sorting('name')}>Name of video</StyledTableCell>
          <StyledTableCell onClick={()=>sortingBranch('name')}>Name of subject</StyledTableCell>
          <StyledTableCell onClick={()=>sortingBranch('name')}>Name of Branch</StyledTableCell>
          <StyledTableCell onClick={()=>sortingBranch('name')}>Name of Board</StyledTableCell>
          <StyledTableCell className='text-center' >Actions</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {videos.map((video,index)=>(
<TableRow key={index} className='bg-gray-300 uppercase'>
<TableCell>{index+1}</TableCell>
   <TableCell>{video.video_name}</TableCell>
   <TableCell>{video.subject.name}</TableCell>
   <TableCell>{video.branch.name}</TableCell>
   <TableCell>{video.board.name}</TableCell>
   <TableCell className='flex justify-center'>
<button className='bg-sky-900 font-semibold text-white m-2 w-20 p-2 rounded-xl'>APPROVE</button>
<button className='bg-sky-900 font-semibold text-white m-2 w-20 p-2 rounded-xl'>EDIT</button>
<button className='bg-sky-900 font-semibold text-white m-2 w-20 p-2 rounded-xl'>UNLIST</button>
</TableCell>
</TableRow>
        ))}
       
      </TableBody>
    </Table>
  </StyledTableContainer>
    </div>
  </div>
  )
}

export default MangageVideos