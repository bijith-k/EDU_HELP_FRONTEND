import { Navigate } from "react-router-dom";

export const AuthorizeStudent = ({children}) =>{
  const token = localStorage.getItem('Stoken')
  
  if(!token){
    return <Navigate to={'/signin'} replace={true}></Navigate>
  }
  return children
}

export const RedirectStudent = ({children}) => {
  const token = localStorage.getItem('Stoken')

  if(token){
    return <Navigate to={'/'}></Navigate>
  }
  return children
}