import { Button } from '@chakra-ui/react';
import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Rejected = () => {
  const navigate = useNavigate();
  const {tutor} = useSelector((state) => state.tutor);


  return (
    <div className="bg-green-200 min-h-screen max-w-screen-2xl mx-auto flex flex-col">
      <div className="bg-red-600">
        <p className="text-center font-semibold uppercase text-xl p-10 text-white">
          request is rejected
        </p>
      </div>
      <div className="flex flex-col  justify-center items-center bg-slate-400 h-full">
        <p className="font-bold text-2xl text-center">
          Your request to register as a tutor at EDU-HELP is rejected due to
        </p>
        <p className="font-bold text-2xl text-center text-white">
          {tutor.rejection_reason}
        </p>
        <button
          className="mt-10 bg-red-600 text-white p-3 rounded-md"
          onClick={() => {
            localStorage.removeItem("Ttoken");
            navigate("/tutor");
          }}
        >
          LOGOUT
        </button>
      </div>
    </div>
  );
}

export default Rejected