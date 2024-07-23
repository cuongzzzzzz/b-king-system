// @ts-nocheck

import { useEffect, useState } from "react";
import { instance } from "../../configs/axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

function AddTrip() {
  const [route, setRoute] = useState<any>(null);
  const [vehicle, setVehicle] = useState<any>(null);
  const [type, setType] = useState("");
  const [filterRoute, setFilterRoute] = useState([])
  const [filterVehicle, setFilterVehicle] = useState<any>([])
  const [currentVehicle, setCurrentVehicle] = useState(null)
  const [startStation, setStartStation] = useState(null);
  const [endStation, setEndStation] = useState(null);
  // const [currentRoute,setCurrentRoute] = useState(null)


  const navigate = useNavigate();

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
  console.log("vehicle:::", vehicle)
  console.log("routes:::", route)

  const schema = yup.object().shape({
    departureDate: yup.string().required(),
    arrivalDate: yup.string().required(),
    arrivalTime: yup.string().required(),
    departureTime: yup.string().required(),
    routeId: yup.string().required(),
    vehicleType: yup.string().required(),
    numberOfSeats: yup.number().required(),
    price: yup.number().required(),
    type: yup.string().required()
  });
  const onSubmit = async (data: any) => {
    try {
      const res = await instance.post(`/trip`, data);
      navigate("/admin/trip");
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    getRoute();
    getVehicle();
  }, []);

  const handleChangeType = (e: any) => {
    console.log(e.target.value)
    setType(e.target.value)
  }


  useEffect(() => {
    if (route && vehicle) {
      setFilterRoute(route.filter((item: any) => item.type === type));
      setFilterVehicle(vehicle.filter((item: any) => item.type === type));
    }
  }, [type, route, vehicle]);
  console.log("type::", type)


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    // defaultValues,
  });

  console.log(errors)
  console.log("filterVehicle:::", filterVehicle)
  console.log("currentVehicle:::", currentVehicle)

  //   console.log(trip);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-3 px-3 flex flex-col gap-3">
          <label htmlFor="">Type</label>
          <select
            className="p-3 border rounded-md outline-none"
            id=""
            {...register("type")}
            onChange={handleChangeType}
          >
            <option value="">--choose--</option>

            <option value="train">train</option>
            <option value="bus">Bus</option>
            <option value="air_plane">Plane</option>

          </select>
          <p className="text-red-500">{errors?.type?.message}</p>
        </div>
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
            <option value="">--choose--</option>

            {filterRoute && filterRoute.map((item, index) => {
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
            onChange={(e) => {
              setCurrentVehicle(filterVehicle.filter((v: any) => v._id === e.target.value))

            }}
          >
            <option value="">--choose--</option>

            {filterVehicle && filterVehicle.map((item, index) => {
              return <option key={index} value={item._id}>{item.name}</option>;
            })}
          </select>
          <p className="text-red-500">{errors?.vehicleType?.message}</p>
        </div>
        <div className="my-3 px-3 flex flex-col gap-3">
          <label htmlFor="">Number of seat</label>
          <input
            type="number"
            // placeholder={defaultValues?.numberOfSeats}
            {...register("numberOfSeats")}
            className="p-3 border outline-none rounded"
          />

          <p className="text-red-500">{errors?.numberOfSeats?.message}</p>
        </div>
        <div className="my-3 px-3 flex flex-col gap-3">
          <label htmlFor="">Price</label>
          <input
            type="number"
            // placeholder={defaultValues?.price}
            {...register("price")}
            className="p-3 border outline-none rounded"
          />

          <p className="text-red-500">{errors?.price?.message}</p>
        </div>

        <button className="p-3 bg-green-600 rounded-md" type="submit"> Add</button>
      </form>
    </div>
  );
}

export default AddTrip;
