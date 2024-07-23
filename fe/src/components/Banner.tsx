import VerifiedIcon from "@mui/icons-material/Verified";

import "react-datepicker/dist/react-datepicker.css";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import DiscountIcon from "@mui/icons-material/Discount";
import PaidIcon from "@mui/icons-material/Paid";
import SearchSection from "./SearchSection";

function Banner() {
  return (
    <>
      <div className="banner relative">
        <img src="/banner.png" className="min-h-[480px]" alt="" />
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-full flex items-center flex-col gap-5">
            <p className="md:text-2xl text-center  text-white">
              Vexere - Cam kết hoàn 150% nếu nhà xe không giữ chỗ
            </p>
            <div className="w-11/12  lg:w-10/12 xl:w-7/12">
              {" "}
              <SearchSection />
            </div>
          </div>
          <div className=" absolute inset-x-0 hidden md:flex z-9 bottom-0 h-[64px] bg-[rgba(0,0,0,0.54)] items-center justify-center gap-5">
            <div className="text-yellow-400 flex items-center">
              <VerifiedIcon />
              <span className="px-3 text-white">Chắc chắn có chỗ</span>
            </div>
            <div className="text-yellow-400 flex items-center">
              <HeadsetMicIcon />
              <span className="px-3 text-white">Hỗ trợ 24/7</span>
            </div>
            <div className="text-yellow-400 flex items-center">
              <DiscountIcon />
              <span className="px-3 text-white">Nhiều ưu đãi</span>
            </div>
            <div className="text-yellow-400 flex items-center">
              <PaidIcon />
              <span className="px-3 text-white">Thanh toán đa dạng</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;
