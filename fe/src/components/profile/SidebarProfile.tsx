import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import BookOnlineOutlinedIcon from '@mui/icons-material/BookOnlineOutlined';
import ReviewsOutlinedIcon from '@mui/icons-material/ReviewsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import { Link } from 'react-router-dom';


function SidebarProfile() {
    return ( <>
    <div className="flex flex-col items-start gap-3 p-3 border rounded-md">
        <div className="flex gap-3 items-center">
            <AccountCircleOutlinedIcon/>
            <Link className=' whitespace-nowrap' to={"/profile/info"}>Thông tin tài khoản</Link>
        </div>
        <div className="flex gap-3 items-center">
            <BookOnlineOutlinedIcon/>
            <Link className=' whitespace-nowrap' to={"/profile/booking"}>Booking</Link>
        </div>
        <div className="flex gap-3 items-center">
            <ReviewsOutlinedIcon/>
            <Link className=' whitespace-nowrap' to={"/profile/review"}>Review</Link>
        </div>
        <div className="flex gap-3 items-center">
            <LogoutOutlinedIcon/>
            <Link className=' whitespace-nowrap' to={"/profile/review"}>Logout</Link>
        </div>
    </div>
    </> );
}

export default SidebarProfile;