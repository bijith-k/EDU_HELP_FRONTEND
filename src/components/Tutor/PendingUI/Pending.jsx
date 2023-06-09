import { Button, Spinner } from '@chakra-ui/react';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Pending = () => {
  const navigate = useNavigate()
  return (
    <div className="bg-green-200 min-h-screen max-w-screen-2xl mx-auto flex flex-col">
      <div className="bg-green-200 flex justify-between items-center">
        <p className="text-center font-semibold uppercase text-xl p-10">
          welcome to edu-help
        </p>
        <button
          className="mr-10 bg-red-500 text-white p-3 rounded-md"
          onClick={() => {
            localStorage.removeItem("Ttoken");
            navigate("/tutor");
          }}
        >
          LOGOUT
        </button>
      </div>
      <div className="flex flex-col  justify-center items-center bg-slate-400 h-screen">
        <p className="font-bold text-2xl text-center">Hi</p>
        <p className="font-bold text-2xl text-center">
          Your request to register as a tutor is reviewing by admin
        </p>
        <p className="font-bold text-2xl text-center">
          Please login after sometimes or check your mail for updates ....{" "}
        </p>
        <Spinner className="h-14 w-14 mt-5" />
      </div>
    </div>
  );
}

export default Pending