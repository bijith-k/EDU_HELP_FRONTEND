import { Navigate } from "react-router-dom";

export const AuthorizeAdmin = ({ children }) => {
  const token = localStorage.getItem("Adtoken");

  if (!token) {
    return <Navigate to={"/admin"} replace={true}></Navigate>;
  }
  return children;
};

export const RedirectAdmin = ({ children }) => {
  const token = localStorage.getItem("Adtoken");

  if (token) {
    return <Navigate to={"/admin-dashboard"}></Navigate>;
  }
  return children;
};
