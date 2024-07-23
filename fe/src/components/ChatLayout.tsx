import { Outlet } from "react-router-dom";
import Header from "./Header";

function ChatLayout() {
    return ( 
        <>
        <Header/>
        <Outlet/>
        </>
     );
}

export default ChatLayout;