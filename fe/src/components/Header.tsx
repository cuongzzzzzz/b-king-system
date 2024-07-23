// @ts-nocheck

import { Link } from "react-router-dom";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { toggleSideMenu } from "@/redux/toggleSideMenuSlice";
import { UserIcon } from "./User";

function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state:any) => state?.auth?.login?.currentUser);
  return (
    <header className="bg-[#2474E5]">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <Link className="block text-teal-600" to={""}>
              <img src="/logo.png" alt="" />
            </Link>
          </div>
          <div className="md:flex md:items-center md:gap-12">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <Link
                    className="text-white transition hover:text-black"
                    to={"/all-booking"}
                  >
                    {" "}
                    Quản lý đơn hàng{" "}
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-white transition hover:text-black"
                    to={"/conversation"}
                  >
                    {" "}
                    Tin nhắn{" "}
                  </Link>
                </li>
                {user?.model === "user" && (<li>
                  <Link
                    className="text-white transition hover:text-black"
                    to={"/become-partner"}
                  >
                    {" "}
                    Trở thành đối tác
                  </Link>
                </li>)
                }

                {user?.model === "carrier" && (
                  <li>
                    <Link
                      className="text-white transition hover:text-black"
                      to={"/admin/route"}
                    >
                      Dashboard
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
            <div className="flex items-center gap-4">
              {!user && !user?._id ? (
                <div className="sm:flex sm:gap-4 text-sm">
                  <Link to={"/signup"}>
                    {" "}
                    <Button size="normal" color="black">
                      {" "}
                      Đăng ký{" "}
                    </Button>
                  </Link>
                  <div className="hidden sm:flex">
                    <Link to={"/login"}>
                      {" "}
                      <Button size="normal" color="black">
                        {" "}
                        Đăng nhập{" "}
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <UserIcon />
              )}
              <div
                className="block md:hidden"
                onClick={() => {
                  dispatch(toggleSideMenu());
                }}
              >
                <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    // <div className="px-5 flex justify-between items-center text-white h-[158px] lg:h-[112px] xl:h-[72px] bg-[#2474E5] gap-10">
    //   <div className="text-red-500">
    //     <img src="/logo.png" alt="" />
    //   </div>
    //   <div className="flex flex-col xl:flex-row items-center gap-5">
    //     {" "}
    //     <div className="grow">
    //       <ul className="flex gap-5 text-sm justify-end">
    //         <li>
    //           <Linkto={"/"}>Quản lý đơn hàng</Link>
    //         </li>
    //         <li>
    //           <Linkto={"/"}>Mở bán vé trên Vexere</Link>
    //         </li>
    //         <li>
    //           <Linkto={"/"}>Trở thành đối tác</Link>
    //         </li>
    //       </ul>
    //     </div>
    //     <div className="text-sm flex gap-5">
    //       <Button children="Hotline 24/7" />
    //       <Button children="Đăng nhập" />
    //     </div>
    //   </div>
    // </div>
  );
}

export default Header;
