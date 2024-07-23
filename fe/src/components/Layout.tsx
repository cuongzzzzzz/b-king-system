import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SideMenu from "./SideMenu";
import { useSelector } from "react-redux";

function Layout() {
  const isShow = useSelector((state: any) => state.toggle.isShow);
  console.log(isShow);
  return (
    <div className="app ">
      <div className=" fixed inset-y-0 z-20">{isShow && <SideMenu />}</div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
