import Login from "@/pages/Login";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

function RequireAuth() {
  const auth = useSelector((state: any) => state.auth.login.currentUser);
  return auth && auth._id && auth.accessToken ? <Outlet /> : <Login />;
}

export default RequireAuth;
