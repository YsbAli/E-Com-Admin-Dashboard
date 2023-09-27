import { Navigate, Outlet } from "react-router-dom";

function PrivateComponent() {
  
  //if there is no usersdata in localstorage then navigate to signup page,,, otherwise outlet ,,,
  const isauth = localStorage.getItem("usersdata");

  return isauth ? <Outlet /> : <Navigate to="/signup" />;
}

export default PrivateComponent;
