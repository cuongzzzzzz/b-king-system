import {
  convertIntToTimeWithoutSeconds,
  convertTimeToIntWithoutSeconds,
} from "../utils";
import { yupResolver } from "@hookform/resolvers/yup";
import DirectionsBusFilledIcon from "@mui/icons-material/DirectionsBusFilled";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import Button from "../components/Button";
import { updateBookingUserInfo } from "@/redux/bookingSlice";
import Checkout from "./Checkout";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useEffect, useState } from "react";
import { instance } from "@/configs/axios";
const schema = yup
  .object({
    username: yup.string().required("Truong nay khong duoc bo trong"),
    phone: yup.string().required("Truong nay khong duoc bo trong"),
    address: yup.string().required("truong nay khonmg udoc bo trong"),
    email: yup.string().required("truong nay khong duoc bo trong"),
    // paymentMethod: yup.string().required("truong nay khong duoc bo trong"),
  })
  .required();

function BookingInfomation() {


  const imgList = {
    momo: {
      id: 1,
      value: "momo",
      src: "/MoMo_Logo.png",
    },
    vnpay: {
      id: 2,
      value: "vnpay",
      src: "/vnpay.png",
    },
  };

  // const [paymentMethod, setPaymentMethod] = useState("");

  // const handlePayment = (e) => {
  //   const value = e.target.options[e.target.options.selectedIndex].value;
  //   setPaymentMethod(value);
  // };

  const tripData = useSelector((state) => state.trip.trip);
  const ticket = useSelector((state) => state.ticket);
  const auth = useSelector((state) => state.auth.login.currentUser);
  const [clientSecret, setClientSecret] = useState('');


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const initialValue: any = {};
  if (auth) {
    console.log(auth);
    initialValue.username = auth.username;
    initialValue.email = auth.email;
    initialValue.phone = auth.phoneNumber;
    initialValue.address = auth?.address;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValue,
  });
  // console.log(tripData)
  const onSubmit = async (data) => {
    console.log(data);


    try {

      navigate("/checkout")
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // Gọi endpoint để lấy clientSecret từ server
    const fetchData = async () => {
      try {
        const response = await instance.post('/stripe/create-payment-intent', {
          amount: 1000,
          currency: 'usd' // Thay đổi amount và currency theo nhu cầu
        });
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error('Error fetching client secret:', error);
      }
    };

    fetchData();
  }, []);
  console.log(errors)
  const handlePayment = async (data) => {
    if (!stripe || !elements) {
      // Stripe.js chưa được tải
      return;
    }
    dispatch(
      updateBookingUserInfo({
        passengerName: data.username,
        phoneNumber: data.phone,
        address: data.address,
        email: data.email,
        paymentMethod: { name: "card" },
      })
    );
    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);

      // Thực hiện thanh toán với clientSecret đã nhận được
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id
      });

      if (confirmError) {
        console.error('Payment confirmation error:', confirmError);
      } else {
        console.log('Payment succeeded:', paymentIntent);

        navigate(`/thankyou?id=${paymentIntent.id}`)


        // Xử lý khi thanh toán thành công (chuyển hướng, cập nhật UI, ...)
      }
    }
  };
  return (
    <>
      <div className="bg-slate-100">
        <form action="" onSubmit={handleSubmit(handlePayment)}>
          <div className="flex justify-center my-10">
            <div className="w-10/12 flex gap-3">
              <div className="w-7/12">
                <div className="flex gap-3 flex-col p-3 bg-white shadow-xl rounded-lg border border-slate-200">
                  {!auth && (
                    <div className="flex items-center justify-between w-full p-4 border  border-black rounded-xl gap-3">
                      <p className="text-[12px] font-semibold ">
                        Đăng nhập để tự điền thông tin và nhận điểm khi đặt vé
                      </p>
                      <Link to={"/login"} className="text-[12px]">
                        <Button
                          children="Đăng nhập"
                          bg="yellow"
                          size="normal"
                        />
                      </Link>
                    </div>
                  )}
                  <p className="font-bold">Thong tin lien lac</p>
                  {/*
  Heads up! 👋

  Plugins:


  - @tailwindcss/forms
*/}
                  <div>
                    <label
                      htmlFor="Username"
                      className="relative block rounded-md border  border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                    >
                      <input
                        type="text"
                        id="Username"
                        className="peer p-3 border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                        placeholder="Username"
                        {...register("username")}
                      />

                      <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                        Username
                      </span>
                    </label>
                    <p className="text-red-500">{errors.username?.message}</p>
                  </div>
                  <div className="flex gap-3">
                    {/*
  Heads up! 👋

  Plugins:
    - @tailwindcss/forms
*/}

                    <div className="w-6/12">
                      <label
                        htmlFor="Username"
                        className="relative block p-3  w-full rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                      >
                        <input
                          type="text"
                          id="Username"
                          className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                          placeholder="Username"
                          {...register("phone")}
                        />

                        <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                          phone number
                        </span>
                      </label>
                      <p className="text-red-500">{errors.phone?.message}</p>
                    </div>
                    {/*
  Heads up! 👋

  Plugins:
    - @tailwindcss/forms
*/}

                    <div className="w-6/12 ">
                      <label
                        htmlFor="Username"
                        className="relative block p-3 w-full rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                      >
                        <input
                          type="text"
                          className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                          placeholder="Username"
                          {...register("email")}
                        />

                        <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                          email
                        </span>
                      </label>
                      <p className="text-red-500">{errors.email?.message}</p>
                    </div>
                  </div>
                  <label className="relative block p-3 w-full rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                    <input
                      type="text"
                      className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                      placeholder="Username"
                      {...register("address")}
                    />

                    <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                      address
                    </span>
                  </label>
                  <p className="text-red-500">{errors.address?.message}</p>

                  {/* <div className="flex flex-col gap-3">
                    <label htmlFor="payment_method">
                      Phuong thuc thanh toan
                    </label>
                    <div className="w-full flex gap-4 items-center">
                      <div className="w-6/12">
                        <select
                          id="payment_method"
                          className="w-full p-3 border rounded outline-none"
                          {...register("paymentMethod", {
                            onChange: handlePayment,
                          })}
                        >
                          <option value={""}>--Chon--</option>
                          <option value={"momo"}>Momo</option>
                          <option value={"vnpay"}>Vnpay</option>
                        </select>
                        <p className="text-red-500">
                          {errors.paymentMethod?.message}
                        </p>
                      </div>
                      {imgList[paymentMethod] && (
                        <div className="flex items-center gap-3  transition-all ani">
                          <img
                            src={imgList[paymentMethod].src}
                            className="w-10"
                            alt=""
                          />
                          <p className="text-sm">
                            Thanh toan voi {imgList[paymentMethod].value}
                          </p>
                        </div>
                      )}
                    </div>
                  </div> */}
                  <Checkout stripe={stripe} elements={elements} handlePayment={handlePayment} />

                  <div className="flex items-center   gap-3 p-5 bg-green-100 text-[12px] border-green-500 border rounded-lg">
                    <VerifiedUserIcon className="text-green-500" />
                    <span>
                      Số điện thoại và email được sử dụng để gửi thông tin đơn
                      hàng và liên hệ khi cần thiết.
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-5/12 flex flex-col gap-3">
                <div className="flex justify-between px-3 py-4 border rounded-lg border-slate-200 bg-white">
                  <p className="font-bold">Tam tinh</p>
                  <p className="font-bold">{ticket.totalPrice} VND</p>
                </div>
                <div className="px-3 py-4 border border-slate-200 flex flex-col gap-3 bg-white rounded-lg">
                  <p className="font-bold">thong tin chuyen di</p>
                  <div className="p-2 border border-slate-200 flex flex-col gap-2 rounded-xl">
                    <div className="text-[10px] flex items-center justify-between border-b py-2">
                      <div className="flex items-center gap-1">
                        <DirectionsBusFilledIcon className="text-blue-500" />
                        <div className="p-1 bg-blue-500 rounded text-white font-bold uppercase">
                          chieu di
                        </div>
                        <p className="font-bold">
                          {tripData?.departureDate?.split("T").slice(0, 1)}
                        </p>
                      </div>
                      <Link
                        to="/"
                        className="underline text-blue-500 font-bold"
                      >
                        Chi tiet
                      </Link>
                    </div>
                    <div className="flex items-center gap-4 py-1 border-b text-[10px]">
                      <img
                        className="w-[4rem] rounded"
                        src={
                          tripData?.vehicle?.img ||
                          "http://via.placeholder.com/640x360"
                        }
                        alt=""
                      />
                      <div className="flex flex-col gap-1">
                        <p className="font-bold  text-base">
                          {tripData?.vehicle?.name}
                        </p>
                        <p className="text-slate-400">
                          {tripData?.vehicle?.description}
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className="flex flex-col gap-2 justify-between text-[10px]">
                        <p className="font-semibold text-base">
                          {tripData?.carrier?.name}
                        </p>
                        <div className="flex gap-4 items-center w-full">
                          <div className="h-[40px] w-[1px]   ml-2 bg-black relative text-[#787878]">
                            <div className=" absolute top-[-15px] right-[-6.5px] z-10 text-sm">
                              <RadioButtonUncheckedIcon fontSize="10px" />
                            </div>
                            <div className=" absolute bottom-[-12px] right-[-6px] z-10 text-sm">
                              <LocationOnIcon fontSize="10px" />
                            </div>
                          </div>
                          <div className="flex flex-col gap-1">
                            <div className="flex gap-3 items-center ">
                              <span className="text-xl w-12">
                                {tripData.departureTime}
                              </span>
                              <span className="text-[10px]">
                                <FiberManualRecordIcon fontSize="inherit" />
                              </span>
                              <div className="flex flex-col">
                                <span className="text-xl">
                                  {tripData.startStation.city}
                                </span>
                                <span>{tripData.startStation.name}</span>
                              </div>
                            </div>
                            <span className="text-sm text-[#707070]">
                              {convertIntToTimeWithoutSeconds(
                                convertTimeToIntWithoutSeconds(
                                  tripData.arrivalTime
                                ) -
                                convertTimeToIntWithoutSeconds(
                                  tripData.departureTime
                                )
                              )}
                            </span>
                            <div className="flex gap-3 items-center w-full ">
                              <span className="text-xl w-12">
                                {tripData.arrivalTime}
                              </span>
                              <span className="text-[10px]">
                                <FiberManualRecordIcon fontSize="inherit" />
                              </span>
                              <div className="flex flex-col">
                                <span className="text-xl">
                                  {tripData.endStation.city}
                                </span>
                                <span>{tripData.endStation.name}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center p-5 bg-white ">
            <div className="w-10/12 flex gap-3 text-[12px]">
              <div className="w-7/12 flex flex-col items-center gap-3">
                <button className="p-3 bg-yellow-500 rounded-lg w-full text-[1rem]">
                  Tiep tuc
                </button>
                <p className="text-center ">
                  Bằng việc nhấn nút Tiếp tục, bạn đồng ý với Chính sách bảo mật
                  thanh toán và Quy chế
                </p>
              </div>
              <div className="w-5/12">
                <p>
                  Bạn sẽ sớm nhận được biển số xe, số điện thoại tài xế và dễ
                  dàng thay đổi điểm đón trả sau khi đặt.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default BookingInfomation;
