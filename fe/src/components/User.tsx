// @ts-nocheck

import { CreditCard, Keyboard, LogOut, Settings, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "@/api/authRequest";
import { instance } from "@/configs/axios";

export function UserIcon() {
  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    logOut(dispatch, navigate, instance);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            src={user?.avatar ? user.avatar : "/avatar.webp"}
            className="w-full"
            alt=""
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link to={"/profile/info"}>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>

          <Link to={"/profile/booking"}><DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Booking</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem></Link>

          <Link to={"/conversation"}><DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Conversations</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem></Link>


          <Link to={"/profile/review"}>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Reviews</span>
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem></Link>

          {/* <DropdownMenuItem>
            <Keyboard className="mr-2 h-4 w-4" />
            <span>Keyboard shortcuts</span>
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem> */}
        </DropdownMenuGroup>


        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>


      </DropdownMenuContent>
    </DropdownMenu>
  );
}
