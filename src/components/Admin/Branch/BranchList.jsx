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

const BranchList = () => {

  const [boards, setBoards] = useState([])
  const [branches, setBranches] = useState([])

  const navigate = useNavigate()
  const [data, setData] = useState('data hereeeeee')
  const [order, setOrder] = useState('ASC')

  useEffect(() => {

    axios.get(`${import.meta.env.VITE_BASE_PATH}admin/boards`,
    {
      headers: {
         authorization: `Bearer ${localStorage.getItem('Adtoken')}`
             }
    }).then((res)=>{
      console.log(res);
      setBoards(res.data.boards)
    })

    axios.get(`${import.meta.env.VITE_BASE_PATH}admin/branches`,
    {
      headers: {
         authorization: `Bearer ${localStorage.getItem('Adtoken')}`
             }
    }).then((res)=>{
      console.log(res,'3');
      setBranches(res.data.branches)
    })
   
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
      <div className='w-full p-5 overflow-clip'>
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

        <div className='bg-white p-2 rounded-2xl flex'>
          <button className='font-bold text-sky-900' onClick={()=>navigate('/admin-add-branch')}>ADD BRANCH</button>
        </div>
        </div>
       
      <StyledTableContainer component={Paper} className='rounded-2xl mt-3' >
      <Table className='min-w-2'>
        <TableHead>
          <TableRow className='bg-green-300'>
            <StyledTableCell className=''  >No</StyledTableCell>
            <StyledTableCell onClick={()=>sorting('name')}>Name of Board/University</StyledTableCell>
            <StyledTableCell onClick={()=>sortingBranch('name')}>Branch</StyledTableCell>
            <StyledTableCell >Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {boards.map((board,index)=>(
            <React.Fragment key={board._id}>
            <TableRow className='bg-gray-400 uppercase'>
            <TableCell>{index+1}</TableCell>
            <TableCell>{board.name}</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            </TableRow>
            {branches.filter((branch)=>branch.board === board._id)
                .map((branch)=>(
                  <TableRow key={branch._id} className='bg-gray-300 uppercase'>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>{branch.name}</TableCell>
                    <TableCell>
<button onClick={()=>(branch._id)} className='bg-sky-900 font-semibold text-white m-2 w-20 p-2 rounded-xl'>EDIT</button>
<button className='bg-sky-900 font-semibold text-white m-2 w-20 p-2 rounded-xl'>UNLIST</button>
                    </TableCell>

                    </TableRow>
                ))}
              
          </ React.Fragment>
          ))}
          
           
        </TableBody>
      </Table>
    </StyledTableContainer>
      </div>
    </div>
  )
}

export default BranchList