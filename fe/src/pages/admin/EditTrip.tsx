import { useEffect, useState } from "react";
import { instance } from "../../configs/axios";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

function EditTrip() {
  const [trip, setTrip] = useState(null);
  const [route, setRoute] = useState(null);
  const [vehicle, setVehicle] = useState(null);
  // const [carrier, setCarrier] = useState(null);
  const [defaultValues, setDefaultValues] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  const schema = yup.object().shape({
    departureDate: yup.string().required(),
    arrivalDate: yup.string().required(),
    arrivalTime: yup.string().required(),
    departureTime: yup.string().required(),
    routeId: yup.string().required(),
    vehicleType: yup.string().required(),
    numberOfSeats: yup.number().required(),
    price: yup.number().required(),
  });


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const getData = async () => {
    try {
      const res = await instance.get(`/trip/${params.id}`);
      setTrip(res.data.metadata);
    } catch (error) {
      console.log(error);
    }
  };
  const getRoute = async () => {
    try {
      const res = await instance.get("/route");
      setRoute(res.data.metadata);
    } catch (error) {
      console.log(error);
    }
  };
  const getVehicle = async () => {
    try {
      const res = await instance.get("/vehicle");
      setVehicle(res.data.metadata);
    } catch (error) {
      console.log(error);
    }
  };
  const getCarrier = async () => {
    try {
      const res = await instance.get("/carrier");
      setVehicle(res.data.metadata);
    } catch (error) {
      console.log(error);
    }
  };


  const onSubmit = async (data) => {
    const res = await instance.patch(`/trip/${params.id}`, data);
    navigate("/admin/trip");
  };
  useEffect(() => {
    getData();
    getRoute();
    getVehicle();
  }, []);

  // useEffect(() => {
  //   if (trip && trip.length) {
  //     setDefaultValues({
  //       departureDate: trip?.startStation?.name,
  //       arrivalDate: trip?.arrivalDate,
  //       arrivalTime: trip?.arrivalTime,
  //       departureTime: trip?.departureTime,
  //       routeId: trip?.route?._id,
  //       vehicleType: trip?.vehicle?.name,
  //       numberOfSeats: trip?.numberOfSeats,
  //       price: trip?.price,
  //     });
  //   }
  // }, [trip]);


  console.log(trip);

  return (
    <div>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="my-3 px-3 flex flex-col gap-3">
          <label htmlFor="">Departure Date</label>
          <input
            type="date"
            className="p-3 border outline-none rounded"
            {...register("departureDate")}
          />
          <p className="text-red-500">{errors?.departureDate?.message}</p>
        </div>
        <div className="my-3 px-3 flex flex-col gap-3">
          <label htmlFor="">Arrival Date</label>
          <input
            type="date"
            className="p-3 border outline-none rounded"
            {...register("arrivalDate")}
          />

          <p className="text-red-500">{errors?.arrivalDate?.message}</p>
        </div>
        <div className="my-3 px-3 flex flex-col gap-3">
          <label htmlFor="">departure Time</label>
          <input
            type="time"
            className="p-2 outline-none border rounded"
            {...register("departureTime")}
          />
          <p className="text-red-500">{errors?.departureTime?.message}</p>
        </div>
        <div className="my-3 px-3 flex flex-col gap-3">
          <label htmlFor="">arrival Time</label>
          <input
            type="time"
            className="p-2 outline-none border rounded"
            {...register("arrivalTime")}
          />
          <p className="text-red-500">{errors?.arrivalTime?.message}</p>
        </div>
        <div className="my-3 px-3 flex flex-col gap-3">
          <label htmlFor="">Route</label>
          <select
            id=""
            className="p-3 rounded border outline-none"
            {...register("routeId")}
          >
            {route?.map((item, index) => {
              return <option key={index} value={item._id}>{item.name}</option>;
            })}
            {/* <option>ahah</option> */}
          </select>
          <p className="text-red-500">{errors?.routeId?.message}</p>
        </div>
        <div className="my-3 px-3 flex flex-col gap-3">
          <label htmlFor="">Vehicle</label>
          <select
            id=""
            className="p-3 rounded border outline-none"
            {...register("vehicleType")}
          >
            {vehicle?.map((item, index) => {
              return <option key={index} value={item._id}>{item.name}</option>;
            })}
          </select>
          <p className="text-red-500">{errors?.vehicleType?.message}</p>
        </div>
        <div className="my-3 px-3 flex flex-col gap-3">
          <label htmlFor="">Number of seat</label>
          <input
            type="number"
            placeholder={defaultValues?.numberOfSeats}
            {...register("numberOfSeats")}
            className="p-3 border outline-none rounded"
          />

          <p className="text-red-500">{errors?.numberOfSeats?.message}</p>
        </div>
        <div className="my-3 px-3 flex flex-col gap-3">
          <label htmlFor="">Price</label>
          <input
            type="number"
            placeholder={defaultValues?.price}
            {...register("price")}
            className="p-3 border outline-none rounded"
          />

          <p className="text-red-500">{errors?.price?.message}</p>
        </div>
        <button className="p-3 bg-green-600 rounded-md"> Update</button>
      </form>
    </div>
  );
}

export default EditTrip;
