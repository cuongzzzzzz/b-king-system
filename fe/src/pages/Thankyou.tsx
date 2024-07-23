import { instance } from "@/configs/axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";

function Thankyou() {
  const [params, setParams] = useSearchParams();
  const bookingInfo = useSelector((state: any) => state.ticket);
  const auth = useSelector((state: any) => state.auth.login.currentUser);
  console.log(auth);

  const newBooking = async () => {
    const res = await instance.post("/booking", {
      bookingCode: params.get("id"),
      tripId: bookingInfo.tripId,
      userId: auth?._id,
      passengerName: bookingInfo.passengerName,
      phoneNumber: bookingInfo.phoneNumber,
      email: bookingInfo.email,
      numberOfTickets: bookingInfo.numberofTickets,
      totalPrice: bookingInfo.totalPrice,
      paymentMethod: bookingInfo.paymentMethod,
      address: bookingInfo.address,
      carrierId: bookingInfo.carrierId
    });
  };

  const checkExist = async ({ bookingCode }: any) => {
    const res = await instance.post("/booking/checkexist", {
      bookingCode,
    });
    return res.data.metadata.isBooking;
  };

  useEffect(() => {
    let isComponentMounted = true;

    const createBooking = async () => {
      try {
        const isBookingExist = await checkExist({
          bookingCode: params.get("id"),
        });
        if (!isBookingExist && isComponentMounted) {
          await newBooking();
        }
      } catch (error) {
        console.log(error);
      }
    };

    createBooking();

    return () => {
      isComponentMounted = false;
    };
  }, [params, bookingInfo, auth]);

  return (
    <>
      <div className="bg-white h-lvh flex justify-center items-center">
        <div className="bg-white p-6  md:mx-auto">
          <svg
            viewBox="0 0 24 24"
            className="text-green-600 w-16 h-16 mx-auto my-6"
          >
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            ></path>
          </svg>
          <div className="text-center">
            <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
              Payment Done!
            </h3>
            <p className="text-gray-600 my-2">
              Thank you for completing your secure online payment.
            </p>
            <p> Have a great day!</p>
            <div className="py-10 text-center">
              <Link
                to="/"
                className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
              >
                GO BACK
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Thankyou;
