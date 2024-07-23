import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function AdminLayout() {
  return (
    <div className="flex">
      <div className="w-3/12">
        <Sidebar />
      </div>
      <div className="w-9/12">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
