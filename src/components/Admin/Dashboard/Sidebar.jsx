import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ragam from "../../../assets/control.png";
import student from "../../../assets/student.png";
import dashboard from "../../../assets/dashboard.png";
import tutor from "../../../assets/tutors.png";
import notes from "../../../assets/books.png";
import videos from "../../../assets/videos.png";
import question from "../../../assets/questionPaper.png";
import events from "../../../assets/events.png";
import board from "../../../assets/board.png";
import branch from "../../../assets/branch.png";
import subject from "../../../assets/subject.png";
import { AiFillCaretRight } from 'react-icons/ai';

const Sidebar = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [ind, setInd] = useState(0)
  const [title, setTitle] = useState('Dashboard')
   
  const Menus = [
    {title:'Dashboard',src:dashboard,route:'/admin-dashboard'},
    {title:'Students',src:student,gap:true,route:''},
    {title:'Tutors',src:tutor,route:''},
    {title:'Notes',src:notes,gap:true,route:'/admin-notes'},
    {title:'Videos',src:videos,route:'/admin-videos'},
    {title:'Question Papers',src:question,route:'/admin-question-papers'},
    {title:'Events',src:events,route:''},
    {title:'Board',src:board,gap:true,route:'/admin-board'},
    {title:'Branch',src:branch,route:'/admin-branch'},
    {title:'Subject',src:subject,route:'/admin-subject'},
  ]
  return (
    <div className='flex'>
      <div className={`${open ? 'w-72' : 'w-20'} duration-300 h-full p-5 pt-8 bg-dark-purple relative`}>
        <img src={ragam} className={`absolute cursor-pointer rounded-full -right-3 top-9 w-7 border-2 border-dark-purple ${!open && 'rotate-180'}`}
        onClick={()=>setOpen(!open)} />
        <div className='flex gap-x-4 items-center'>
          <img src={ragam} className={`cursor-pointer duration-500 w-10 ${open && 'rotate-[360deg]'}`} alt="" />
          
          <h1 className={`text-white origin-left font-bold text-xl duration-300 ${!open && 'scale-0'}`}>ADMIN</h1>
        </div>
        <ul className='pt-6'>
          {Menus.map((menu,index)=>(
            <li key={index} className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md 
            ${menu.gap ? 'mt-8' : 'mt-2'} ${index === ind && 'bg-light-white'}`} onClick={()=>{setInd(index)
            setTitle(menu.title) 
            navigate(menu.route)
           } } >
              <img src={menu.src} className='w-10' />
              {/* {!open && <div className='bg-gray-400 text-white p-2 rounded-md'>{menu.title}</div>} */}
              <span className={`${!open && 'hidden'} origin-left duration-200 font-semibold`} >{menu.title}</span>
              
            </li>
          ))}

        </ul>
      </div>
      {/* <div className='p-7 text-2xl font-semibold flex-1 h-screen '>
        <h1>{title}</h1>
      </div> */}
    </div>
  )
}

export default Sidebar