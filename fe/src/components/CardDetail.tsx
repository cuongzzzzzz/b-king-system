// @ts-nocheck

import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Button from "./Button";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { useState } from "react";
import {
  convertIntToTimeWithoutSeconds,
  convertTimeToIntWithoutSeconds,
} from "../utils";
import { useDispatch } from "react-redux";
import { updateTickets } from "@/redux/bookingSlice";
import { useNavigate } from "react-router-dom";
import { updateTrip } from "@/redux/tripSlice";

function CardDetail({ data }: { data: any }) {
  console.log(data);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [ticketNumber, setTicketNumber] = useState(1);
  const handleIncrease = () => {
    setTicketNumber((prev) => prev + 1);
  };
  const handleDecrease = () => {
    if (ticketNumber === 1) return;
    setTicketNumber((prev) => prev - 1);
  };
  const handleClick = () => {
    dispatch(
      updateTickets({
        numberTicket: ticketNumber,
        ticketPrice: data.price,
        totalPrice: ticketNumber * data.price,
        tripId: data._id,
        carrierId: data.carrier._id
      })
    );
    dispatch(updateTrip(data));
    navigate("/booking-infomation");
  };
  return (
    <>
      <div className="w-full pt-10 pb-5 px-5 rounded-lg bg-white hover:shadow-xl">
        <div className="flex gap-5">
          <div className="w-1/4 relative z-10">
            <img src="/carddetail.png" className="w-full" alt="" />
            <div className=" md:block hidden absolute text-[8px] text-white bg-[#27AE60] h-[24px] xl:w-full w-11/12 md:text-[8px] lg:text-[11.5px] top-[5%] left-[-5%]">
              <span className="w-[10px]">
                <ConfirmationNumberIcon />
              </span>
              <span className="ml-1">Xác nhận tức thì</span>
            </div>
            <div className="h-[12px] md:block hidden w-[5%] bg-[#1D8046] left-[-5%] top-[20%] absolute -z-10"></div>
          </div>
          <div className="w-3/4 flex justify-between">
            <div className="flex flex-col justify-between">
              {/* <p className="font-semibold">{data.carrier.name}</p> */}
              <div className="flex gap-4 items-center">
                <div className="h-[40px] w-[1px]   ml-2 bg-black relative text-[#787878]">
                  <div className=" absolute top-[-15px] right-[-6.5px] z-10 text-sm">
                    <RadioButtonUncheckedIcon  />
                  </div>
                  <div className=" absolute bottom-[-12px] right-[-6px] z-10 text-sm">
                    <LocationOnIcon  />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex gap-3 items-center ">
                    <span className="text-xl w-12">{data.departureTime}</span>
                    <span className="text-[10px]">
                      <FiberManualRecordIcon fontSize="inherit" />
                    </span>
                    <span>{data.startStation.name}</span>
                  </div>
                  <span className="text-sm text-[#707070]">
                    {convertIntToTimeWithoutSeconds(
                      convertTimeToIntWithoutSeconds(data.arrivalTime) -
                      convertTimeToIntWithoutSeconds(data.departureTime)
                    )}
                  </span>
                  <div className="flex gap-3 items-center ">
                    <span className="text-xl w-12">{data.arrivalTime}</span>
                    <span className="text-[10px]">
                      <FiberManualRecordIcon fontSize="inherit" />
                    </span>
                    <span>{data.endStation.name}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1 justify-between items-end">
              <p className="text-xl text-[#2474E5] font-semibold">
                Từ {data.price}đ
              </p>
              <div className="h-[28px] w-[75px] rounded-md border border-[#27AE60] relative flex items-center justify-center">
                <span className="text-[12px]">Giảm 10%</span>
                <div className="w-[8px] h-[8px]  rounded border border-[#27AE60] absolute top-2 bg-white  -left-1"></div>
                <div className="w-[8px] h-[8px]  bg-white absolute top-2  -left-[9px]"></div>
                <div className="w-[8px] h-[8px]  rounded border border-[#27AE60] absolute top-2 bg-white  -right-1"></div>
                <div className="w-[8px] h-[8px]  bg-white absolute top-2  -right-[9px]"></div>
              </div>
              <p>Còn {data.numberOfSeats} chỗ trống</p>
              <div
                onClick={() => {
                  setShow(!show);
                }}
              >
                {!show ? (
                  <Button rounded={false} children="Chọn chuyến" bg="yellow" />
                ) : (
                  <Button rounded={true} children="Dong" bg="yellow" />
                )}
              </div>
            </div>
          </div>
        </div>
        <p className="text-sm font-semibold mt-3 uppercase  text-right">
          Không cần thanh toán trước
        </p>
        {show && (
          <div className="flex flex-col gap-3 my-3">
            <div className="flex items-center justify-center p-4 border-y px-[5rem]">
              <div className="flex items-center gap-2">
                <div className="w-[20px] h-[20px] rounded-full bg-[#2474E5] leading-5 text-center text-white text-sm">
                  1
                </div>
                <span>Chọn chỗ chiều đi</span>
              </div>
              {/* <div className="flex items-center gap-2">
                <div className="w-[20px] h-[20px] rounded-full bg-slate-400 leading-5 text-center text-white text-sm">
                  1
                </div>
                <span>Chọn điểm đón trả chiều đi</span>
              </div> */}
            </div>
            <div className="flex items-center gap-3 p-5 bg-green-100 border-green-500 border rounded-lg">
              <VerifiedUserIcon className="text-green-500" />
              <span>Vexere cam kết giữ đúng số lượng vé bạn đã chọn.</span>
            </div>
            <p className="text-blue-400">Lưu ý</p>
            <p>Chuyến này không hỗ trợ chọn chỗ trước</p>
            <div className="flex flex-col gap-3 ">
              <p className="text-sm font-semibold py-2 border-b ">
                Số lượng khách
              </p>

              <div className="flex items-center justify-between border-b py-3 ">
                <span className="text-sm font-bold text-orange-500">
                  Cabin Đơn · {data.price}đ
                </span>
                <div className=" flex gap-3">
                  <button
                    className="w-[20px] h-[20px]  leading-5 border rounded-full"
                    onClick={() => {
                      handleDecrease();
                    }}
                  >
                    -
                  </button>
                  <span>{ticketNumber}</span>
                  <button
                    className="w-[20px] h-[20px]  leading-5 border rounded-full"
                    onClick={() => {
                      handleIncrease();
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <span>
                Ghế:{" "}
                <span className="ml-2 text-blue-500">{ticketNumber} Khách</span>
              </span>
              <div className="flex items-center gap-3">
                <span>Tổng cộng chiều đi: </span>
                <span className="ml-2 text-blue-500">
                  {data.price * ticketNumber} đ
                </span>

                <Button
                  size="normal"
                  children="Tiếp tục"
                  bg="yellow"
                  onClick={() => {
                    handleClick();
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CardDetail;
