import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import axiosInstance from '../axios'
import { useDispatch } from 'react-redux'
import { setStudent } from '../features/studentSlice'
import { useToast } from '@chakra-ui/react'
import { setTutor } from '../features/tutorSlice'

const PrivateRoutes = ({role,route}) => {
  const toast = useToast()
  const dispatch = useDispatch()
const [auth, setAuth] = useState(null)
const navigate = useNavigate()
useEffect(()=>{
if (role === "student") {
  axiosInstance("Stoken")
    .get(``)
    .then((res) => {
      if (res.data.status === false) {
        localStorage.removeItem("Stoken");
        dispatch(setStudent({ student: null }));
        setAuth(res.data.status);
        // toast({
        //   title: res.data.message,
        //   status: "error",
        //   duration: 5000,
        //   isClosable: true,
        //   position: "top",
        // });
      } else {
        dispatch(setStudent({ student: res.data.student }));
        setAuth(res.data.status);
      }
    })
    .catch((err) => {
      setAuth(false);
      localStorage.removeItem("Stoken");
      toast({
        title: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    });
} else if (role === "tutor") {
  axiosInstance("Ttoken")
    .get(`tutor`)
    .then((res) => {
      if (res.data.status === false) {
        localStorage.removeItem("Ttoken");
        dispatch(setTutor({ tutor: null }));
        setAuth(res.data.status);
        // toast({
        //   title: res.data.message,
        //   status: "error",
        //   duration: 5000,
        //   isClosable: true,
        //   position: "top",
        // });
      } else {
        dispatch(setTutor({ tutor: res.data.tutor }));
        setAuth(res.data.status);
      }
    })
    .catch((err) => {
      setAuth(false);
      localStorage.removeItem("Ttoken");
      toast({
        title: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    });
} else if (role === "admin") {
  axiosInstance("Adtoken")
    .get(`admin`)
    .then((res) => {
      if (res.data.status === false) {
        localStorage.removeItem("Adtoken");
         
        setAuth(res.data.status);
        // toast({
        //   title: res.data.message,
        //   status: "error",
        //   duration: 5000,
        //   isClosable: true,
        //   position: "top",
        // });
      } else {
         
        setAuth(res.data.status);
      }
    })
    .catch((err) => {
      setAuth(false);
      localStorage.removeItem("Adtoken");
      toast({
        title: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    });
}
},[])

if(auth == null) return
  return (
    auth ? <Outlet /> : <Navigate to={route} />
  )
}

export default PrivateRoutes