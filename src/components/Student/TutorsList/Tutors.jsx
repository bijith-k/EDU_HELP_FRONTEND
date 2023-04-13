import React from 'react'
import Navbar from '../Home/Navbar'
import user from '../../../assets/user.png'

const Tutors = () => {
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
            tutors
          </h1>
        
      </div>
      {/* <div className='grid grid-cols-1  p-3 h-full'> */}
        {/* {plans.map((plan,index)=>( */}
        <div className='p-4'>
          <div className='bg-dark-purple flex flex-col justify-evenly md:flex-row hover:opacity-90 text-white  w-full rounded-xl mt-5 p-5 h-fit text-center'>
            {/* <img src={user} className='w-full' alt="" />
          <p className='font-black text-2xl uppercase border-b w-fit mx-auto'> plan</p>
          <p className='font-serif text-lg mt-8'>Chat with tutors and clear <br /> your doubts</p> */}
          {/* <p>exclusive notes from tutors</p> */}
          {/* <p className='font-serif text-lg mt-3'>Plan validity :  Month</p>
          <p className='font-serif text-lg mt-3'>Price :  </p> */}
          {/* <span > <p className='bg-gray-200 p-2 text-black rounded-3xl uppercase font-bold mt-5 w-2/3 hover:bg-slate-500 hover:text-white mx-auto'>buy now</p> </span> */}
          <div className=' w-fit flex flex-col mx-auto md:mx-0'>
          <img src={user} className='w-40 rounded-full' alt="" />
          </div>
          <div className='flex flex-col justify-center md:items-start uppercase'>
            <div className='mb-4 font-bold'>bijith k</div> 
           <div >Board: ktu</div> 
           <div>Branch: ece</div> 
           <div>Subject: physics</div> 
           <div>time available : 8pm to 11 pm</div> 


          </div>
          <div className='flex flex-col justify-center'>
          <span > <p className='bg-gray-200 p-2 text-black rounded-3xl uppercase font-bold mt-5 w-full hover:bg-slate-500 hover:text-white mx-auto'>message</p> </span>
          </div>
           </div>
        {/* ))} */}
      
      {/* </div> */}
      
      </div>
    </div>
  )
}

export default Tutors