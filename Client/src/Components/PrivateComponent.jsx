import { Navigate, Outlet } from "react-router-dom";

function PrivateComponent() {
  const isauth = localStorage.getItem("usersdata");

  return isauth ? <Outlet /> : <Navigate to="/signup" />;
}

export default PrivateComponent;
