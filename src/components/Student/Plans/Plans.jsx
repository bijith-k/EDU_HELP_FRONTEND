import React, { useEffect, useState } from 'react'
import Navbar from '../Home/Navbar'
import axios from 'axios'


const Plans = () => {
  const [plans, setPlans] = useState([])
  const token = localStorage.getItem('Stoken')
  useEffect(() => {
    axios
    .get(`${import.meta.env.VITE_BASE_PATH}get-plans`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log(res);
      setPlans(res.data);
    });
  }, [])
  
  return (
    <div className="h-screen w-full bg-slate-300 overflow-x-hidden">
      <Navbar />
      <div className="bg-gray-400 h-72">
        <h1 className="text-center font-extrabold text-white shadow-inner font-serif text-4xl md:pt-32 pt-20">
          "SUCCESS DOESN'T COME TO YOU, YOU GO TO IT"
        </h1>
      </div>
      <div className="bg-blue-500">
        
          <h1 className="font-bold text-white text-center text-lg uppercase h-12 p-2">
            available plans
          </h1>
        
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 p-3 h-full'>
        {plans.map((plan,index)=>(
          <div className='bg-dark-purple hover:opacity-90 text-white  w-full rounded-xl mt-5 p-10 h-fit text-center' key={index}>
          <p className='font-black text-2xl uppercase border-b w-fit mx-auto'>{plan.plan} plan</p>
          <p className='font-serif text-lg mt-8'>Chat with tutors and clear <br /> your doubts</p>
          {/* <p>exclusive notes from tutors</p> */}
          <p className='font-serif text-lg mt-3'>Plan validity : {plan.duration} Month</p>
          <p className='font-serif text-lg mt-3'>Price : {plan.price} </p>
          <span > <p className='bg-gray-200 p-2 text-black rounded-3xl uppercase font-bold mt-5 w-2/3 hover:bg-slate-500 hover:text-white mx-auto'>buy now</p> </span>
        </div>
        ))}
      
      </div>
      
    </div>
  )
}

export default Plans