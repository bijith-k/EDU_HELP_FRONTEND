import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import Sidebar from '../Dashboard/Sidebar'
import { useNavigate } from 'react-router-dom'
import axios from "../../../axios";
import { toast } from 'react-toastify'

const StudentsList = () => {

  const navigate = useNavigate()
  const Token = localStorage.getItem("Adtoken")
  const [students, setStudents] = useState([])
  const [toastMessage, setToastMessage] = useState("");
console.log(students);
  useEffect(() => {
    axios
      .get(`admin/students`, {
        headers: {
          authorization: `Bearer ${Token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setStudents(res.data);
      });
      
  }, [toastMessage]);

  const handleBlockUnblock = (id) => {
    axios
      .put(
        `admin/block-unblock-student?student=${id}`,null,
        {
          headers: {
            authorization: `Bearer ${Token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setToastMessage(id);
        toast.success(res.data.message, {
          position: "top-center",
        });
      })
      .catch((err) => {
        console.log(err);
        setToastMessage(id);
        toast.error(err.message, {
          position: "top-center",
        });
      });
  };

   
  return (
    <div className="bg-sky-900 flex overflow-x-hidden">
    <div>
      <Sidebar />
    </div>
    <div className="w-full overflow-clip">
    <p className="bg-white w-full p-3 my-5 uppercase font-bold text-center">
          manage students
        </p>
      <div className="flex justify-around">
        {/* <div className="bg-white p-3 rounded-2xl inline-flex ">
<input type="text" name="" id="" placeholder='search' className='inline-block' />
<div className='bg-sky-900 p-3 text-white rounded-full inline-block'>
  <FaSearch />
</div>
</div> */}
        <div className="bg-white p-3 rounded-2xl inline-flex flex-col md:flex-row md:w-auto mr-2">
          <input
            type="text"
            name=""
            id=""
            placeholder="search"
            className="mb-2 md:mb-0 md:mr-2 inline-block w-full md:w-auto"
          />
          <div className="bg-sky-900 p-3 text-white rounded-full  flex justify-center">
            <FaSearch />
          </div>
        </div>
      </div>
<div className='p-1 mt-2 bg-white w-full h-fit rounded-lg overflow-x-auto'>
<table className='table-auto h-fit w-full border-2  border-white'>
        <thead>
          <tr className='bg-green-300 h-14 '>
             <th className='p-3 border'>No</th>
             <th className='p-3 border'>Name</th>
             <th className='p-3 border'>Email</th>
             <th className='p-3 border'>Phone</th>
             <th className='p-3 border'>Board</th>
             <th className='p-3 border'>Class/Branch</th>
             <th className='p-3 border'>School/College</th>
             <th className='p-3 border'>Actions</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {students.map((student,index) => (
              <tr className='bg-gray-300 h-16' key={index}>
              <td className='border'>{index+1}</td>
              <td className='border uppercase'>{student.name}</td>
              <td className='border'>{student.email}</td>
              <td className='border'>{student.phone}</td>
              <td className='border'>{student.board.name}</td>
              <td className='border'>{student.branch.name}</td>
              <td className='border'>{student.school}</td>
              <td className='border flex justify-center'>
               
                        {student.blocked ? (
                          <button
                            className="bg-sky-900 font-semibold text-white m-2 w-24 p-2 rounded-xl"
                            onClick={() => handleBlockUnblock(student._id)}
                          >
                            UNBLOCK
                          </button>
                        ) : (
                          <button
                            className="bg-sky-900 font-semibold text-white m-2 w-24 p-2 rounded-xl"
                            onClick={() => handleBlockUnblock(student._id)}
                          >
                            BLOCK
                          </button>
                        )}
                      
                    

                     
              </td>
            </tr>
          ))}
        </tbody>
       </table>
</div>
      
    </div>
  </div>
  )
}

export default StudentsList
