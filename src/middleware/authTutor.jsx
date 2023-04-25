import { Navigate } from "react-router-dom";

export const AuthorizeTutor = ({ children }) => {
  const token = localStorage.getItem("Ttoken");

  if (!token) {
    return <Navigate to={"/tutor-signin"} replace={true}></Navigate>;
  }
  return children;
};

export const RedirectTutor = ({ children }) => {
  const token = localStorage.getItem("Ttoken");

  if (token) {
    return <Navigate to={"/tutor-dashboard"}></Navigate>;
  }
  return children;
};
