import { Outlet } from "react-router-dom";
import SidebarProfile from "./profile/SidebarProfile";

function ContentLayout() {
    return ( 
        <div className="w-full lg:w-10/12 xl:w-8/12 mx-auto">
             <div className="flex gap-5 items-start py-10">
            <div className="">
                <SidebarProfile /></div>
            <div className="w-full">
             <Outlet/>

            </div>

        </div>
        </div>
     );
}

export default ContentLayout;