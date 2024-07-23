// @ts-nocheck

import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import TrainIcon from "@mui/icons-material/Train";
import CommuteIcon from "@mui/icons-material/Commute";
import Button from "./Button";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RoomIcon from "@mui/icons-material/Room";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import IconGroup from "./IconGroup";
import { useNavigate } from "react-router-dom";
import { useStationQuery } from "@/common/hooks/useStationQuery";
import { useDispatch, useSelector } from "react-redux";
import { updateQuery, updateType } from "@/redux/querySlice";
import moment from "moment";
import { toast } from "react-toastify";
import { useEffect } from "react";

import Joi from "joi";
import { getCityUnique } from "@/services/station";

const schema = Joi.object({
  depart: Joi.string().required().messages({
    "string.empty": "Trường điểm xuất phát không được bỏ trống",
    "any.required": "Trường điểm xuất phát không được bỏ trống",
  }),
  arrival: Joi.string().required().messages({
    "string.empty": "Trường điểm đến không được bỏ trống",
    "any.required": "Trường điểm đến không được bỏ trống",
  }),
  start_date: Joi.date().required().messages({
    "date.base": "Trường ngày xuất phát không được bỏ trống",
    "any.required": "Trường ngày xuất phát không được bỏ trống",
  }),
  end_date: Joi.string().allow(""), // Cho phép trường này là chuỗi rỗng
});


function SearchSection() {
  const type = useSelector(state => state.query.type)
  const query = useSelector(state => state.query)
  console.log(query)


  const { data, isLoading } = useStationQuery({ type });
  const formattedDate = moment().format("YYYY-MM-DD");


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSetType = (type: string) => {
    dispatch(updateType(type))
  }



  const {
    register,
    handleSubmit,
    // setValue,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
  });




  useEffect(() => {
    if (data && data.length > 0) {
      const firstValue = Object.keys(data)[0];


      dispatch(
        updateQuery({
          departureDate: formattedDate,
          departureStation: firstValue,
          arrivalStation: firstValue,
          limit: 5,
          page: 1,
          sortBy: "price",
        })
      );
    }
  }, [data, dispatch])


  useEffect(() => {
    // dispatch(updateType("bus"))
    getCityUnique("bus").then((res) => {
      // console.log(res)
    })
  }, [])
  useEffect(() => {
    if (Object.keys(errors).length > 0)
      Object.keys(errors).map((field) => { toast.error(errors[field]?.message) })
  }, [errors])

  const onSubmit = (data: any) => {

    try {
      console.log(data)
      // Định dạng ngày tháng theo yyyy-mm-dd
      const departureTime = moment(data.start_date).format("YYYY-MM-DD");
      dispatch(
        updateQuery({
          departureDate: departureTime,
          departureStation: data.depart,
          arrivalStation: data.arrival,
          limit: 5,
          page: 1,
          sortBy: "price",
        })
      );
      toast.success("Tim kiem thanh cong")
      navigate("/search");
    } catch (error) {
      toast.error("Something went wrong!")

      console.log("error", error);
    }
  };

  const iconGroups = [
    { icon: <DirectionsBusIcon />, text: "Xe khách", slug: "bus" },
    { icon: <AirplanemodeActiveIcon />, text: "Máy bay", slug: "airplane" },
    { icon: <TrainIcon />, text: "Tàu hỏa", slug: "train" },
    { icon: <CommuteIcon />, text: "Thuê xe", slug: "rent" },
  ];
  return (
    <>
      <div className="pt-5 pb-2  bg-white rounded-lg  flex flex-col gap-4">
        <div className="sm:hidden p-3">
          <label htmlFor="Tab" className="text ">
            Chọn phương tiện di chuyển
          </label>

          <select className="w-full rounded-md border mt-3 border-gray-500 p-2"
            onChange={(e) => {
              handleSetType(e.target.value)
            }}
          >
            <option value="">--choose--</option>
            <option value="bus">Bus</option>
            <option value="train">train</option>
            <option value="air_plane">Airplane</option>
          </select>
        </div>
        <div className="w-full hidden sm:flex  items-center justify-center border-b border-slate-200">
          {iconGroups.map((item, index) => {
            return (
              <IconGroup
                type={type}
                key={index}
                children={item.icon}
                title={item.text}
                slug={item.slug}
                onClick={() => {
                  handleSetType(item.slug)
                }}
              />
            );
          })}
        </div>
        <form
          className="form flex-col  flex justify-center  md:flex-row  gap-5 px-3 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grow border border-slate-300  rounded-lg grid  grid-col-1 md:grid-cols-4 ">
            <div className="relative z-10 min-h-[3rem]">
              <div
                className={` absolute inset-0 p-3 overflow-hidden z-10 flex items-center  gap-2 border-b md:border-r border-slate-300`}
              >
                <RoomIcon className="text-[#d44040]" />
                <div>
                  <div className="text-[12px] text-slate-300">Xuất phát</div>
                  <select
                    id=""
                    className={
                      "w-full appearance-none border-none outline-none text-sm "
                    }
                    {...register("depart")}
                  >
                    <option value="">--Chọn--</option>

                    {isLoading ? (
                      <option>Loading</option>
                    ) : data ? (
                      Object.keys(data).map((item: string, index: number) => {
                        return (
                          <option key={index} className="p- " value={data[item]}>
                            {item}
                          </option>
                        );
                      })
                    ) : (
                      <option>Error</option>
                    )}
                  </select>
                </div>
              </div>
            </div>
            <div className="relative z-10 min-h-[3rem]">
              <div className="outline-none my-select bg-transparent  border-b md:border-r w-full h-full border-slate-300 "></div>
              <div className=" absolute inset-0 p-3 overflow-hidden z-10 flex items-center gap-2">
                <RadioButtonCheckedIcon className="text-[#2474E5]" />
                <div>
                  <div className="text-[12px] text-slate-300">Nơi đến</div>
                  <select
                    id=""
                    className="w-full appearance-none border-none outline-none text-sm"
                    {...register("arrival")}
                  >
                    <option value="">--Chọn--</option>
                    {isLoading ? (
                      <option>Loading</option>
                    ) : data ? (
                      Object.keys(data).map((item: string, index: number) => {
                        return (
                          <option key={index} className="p- " value={data[item]}>
                            {item}
                          </option>
                        );
                      })
                    ) : (
                      <option>Error</option>
                    )}
                  </select>
                </div>
              </div>
            </div>
            <div className="relative z-10 min-h-[3rem]">
              <div className="outline-none my-select bg-transparent  border-b md:border-r w-full h-full border-slate-300 "></div>
              <div className=" absolute inset-0 p-3 overflow-hidden z-10 flex items-center gap-2">
                <CalendarMonthIcon className="text-[#2474E5]" />
                <div>
                  <div className="text-[12px] text-slate-300">Ngày đi</div>

                  <div className="w-full">
                    {/* <DatePickerComponent startDate={} /> */}
                    <input
                      type="date"
                      className="outline-none border-none text-sm"
                      {...register("start_date")}
                      defaultValue={moment().format("YYYY-MM-DD")}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="relative z-10 min-h-[3rem]">
              <div className="outline-none my-select bg-transparent  w-full h-full "></div>
              <div className=" absolute inset-0 p-3 overflow-hidden z-10 flex items-center gap-2">
                <CalendarMonthIcon className="text-[#2474E5]" />
                <div>
                  <div className="text-[12px] text-slate-300">Ngày về</div>
                  <div className="w-full">
                    <input
                      type="date"
                      className="outline-none border-none text-sm"
                      {...register("end_date")}
                    />{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Button size="lg" bg="yellow" color="black" rounded={true} children="Tìm kiếm" isSubmit={true} onClick={() => { return }} />
        </form>
      </div>
    </>
  );
}

export default SearchSection;
