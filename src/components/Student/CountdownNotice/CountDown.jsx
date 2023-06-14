// import React, { useEffect, useState } from 'react'

// const CountDown = ({expiredAt}) => {
//   const [timerDays, setTimerDays] = useState(10)
//   const [timerHours, setTimerHours] = useState(10)
//   const [timerMinutes, setTimerMinutes] = useState(10)
//   const [timerSeconds, setTimerSeconds] = useState(10);

//   let interval ;

//   const startTimer = () => {

//     const countDownDate = new Date(expiredAt).getTime()
 
//     interval = setInterval(()=>{
//       const now = new Date().getTime()
//       const distance = countDownDate - now

//       const days = Math.floor(distance/(24*60*60*1000))
//       const hours = Math.floor(distance % (24*60*60*1000)/(1000*60*60))
//       const minutes = Math.floor(distance % (60 * 60 * 1000) / (1000 * 60));
//       const seconds = Math.floor((distance % ( 60 * 1000)) / 1000);
 
//       if(distance<0){
//         //clear timer
//         clearInterval(interval.current)
//       }else{
//          //update timer
//          setTimerDays(days)
//          setTimerHours(hours)
//          setTimerMinutes(minutes)
//          setTimerSeconds(seconds)
//       }
//     })
//   }

//   useEffect(() => {
//      startTimer()
//   }, [])
  
//   return (
//     <>
//       <div
//         className={`flex justify-center p-7 gap-3 w-fit mx-auto animate-pulse rounded-xl my-5 ${
//           timerDays == 1 ? "bg-red-500 text-white" : "bg-[#232946] text-white"
//         } `}
//       >
//         <p className=" font-bold md:text-2xl text-lg">
//           Your plan will expire in
//         </p>
//         <p className=" font-extrabold md:text-2xl text-lg">{timerDays}</p>
//         <p className="font-bold md:text-2xl text-lg ">Days</p>
//       </div>
//     </>
//   );
// }

// export default CountDown


import React, { useEffect, useState, useRef } from "react";

const CountDown = ({ expiredAt }) => {
  const [timerDays, setTimerDays] = useState();
  const [timerHours, setTimerHours] = useState(10);
  const [timerMinutes, setTimerMinutes] = useState(10);
  const [timerSeconds, setTimerSeconds] = useState(10);
  const interval = useRef(null);

  const startTimer = () => {
    const countDownDate = new Date(expiredAt).getTime();

    interval.current = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      const days = Math.floor(distance / (24 * 60 * 60 * 1000));
      const hours = Math.floor(
        (distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (60 * 60 * 1000)) / (1000 * 60));
      const seconds = Math.floor((distance % (60 * 1000)) / 1000);

      if (distance <= 0) {
        // clear timer
        clearInterval(interval.current);
      } else {
        // update timer
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  };

  useEffect(() => {
    startTimer();

    return () => {
      // cleanup on component unmount
      clearInterval(interval.current);
    };
  }, []);

  return (
    <>
      <div
        className={`flex justify-center p-7 gap-3 w-fit mx-auto animate-pulse rounded-xl my-5 ${
          timerDays === 1 ? "bg-red-500 text-white" : "bg-[#232946] text-white"
        }`}
      >
        <p className="font-bold md:text-2xl text-lg">
          Your plan will expire in
        </p>
        <p className="font-extrabold md:text-2xl text-lg">{timerDays}</p>
        <p className="font-bold md:text-2xl text-lg">Days</p>
      </div>
    </>
  );
};

export default CountDown;
