import React, { useEffect, useState } from 'react'

const CountDown = ({expiredAt}) => {
  const [timerDays, setTimerDays] = useState(10)
  const [timerHours, setTimerHours] = useState(10)
  const [timerMinutes, setTimerMinutes] = useState(10)
  const [timerSeconds, setTimerSeconds] = useState(10);

  let interval ;

  const startTimer = () => {

    const countDownDate = new Date(expiredAt).getTime()

    interval = setInterval(()=>{
      const now = new Date().getTime()
      const distance = countDownDate - now

      const days = Math.floor(distance/(24*60*60*1000))
      const hours = Math.floor(distance % (24*60*60*1000)/(1000*60*60))
      const minutes = Math.floor(distance % (60 * 60 * 1000) / (1000 * 60));
      const seconds = Math.floor((distance % ( 60 * 1000)) / 1000);

      if(distance<0){
        //clear timer
        clearInterval(interval.current)
      }else{
         //update timer
         setTimerDays(days)
         setTimerHours(hours)
         setTimerMinutes(minutes)
         setTimerSeconds(seconds)
      }
    })
  }

  useEffect(() => {
     startTimer()
  }, [])
  
  return (
    <>
      <div
        className={`flex justify-center p-7 gap-3 w-fit mx-auto animate-pulse rounded-xl my-5 ${
          timerDays == 1
            ? "bg-red-500 text-white"
            : "bg-gray-600 text-white"
        } `}
      >
        <p className=" font-bold md:text-2xl text-lg">
          Your plan will expire in
        </p>
        <p className=" font-extrabold md:text-2xl text-lg">{timerDays}</p>
        <p className="font-bold md:text-2xl text-lg ">Days</p>
      </div>
      {/* <p className="text-center">the plan will expire in</p>
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center">
          <p>{timerDays}</p>
          <small>Days</small>
        </div>
        <span>:</span>
        <div className="flex flex-col items-center">
          <p>{timerHours}</p>
          <small>Hours</small>
        </div>
        <span>:</span>
        <div className="flex flex-col items-center">
          <p>{timerMinutes}</p>
          <small>Minutes</small>
        </div>
        <span>:</span>
        <div className="flex flex-col items-center">
          <p>{timerSeconds}</p>
          <small>Seconds</small>
        </div>
      </div> */}
    </>
  );
}

export default CountDown