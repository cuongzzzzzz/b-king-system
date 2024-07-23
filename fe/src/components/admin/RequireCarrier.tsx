import NotFound from "@/pages/NotFound";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

function RequireCarrier() {
  const auth = useSelector((state: any) => state.auth.login.currentUser);
  return auth && auth._id && auth.accessToken && auth.model =="carrier"? <Outlet /> : <NotFound />;
}

export default RequireCarrier;
