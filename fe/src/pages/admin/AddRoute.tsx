// @ts-nocheck

import { useEffect, useState } from "react";
import { instance } from "../../configs/axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

function AddRoute() {

  const schema = yup.object().shape({
    startStationId: yup.string().required(),
    endStationId: yup.string().required(),
    distance: yup.string(),
    duration: yup.string(),
    type: yup.string()
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });


  const [allStations, setAllStations] = useState(null);
  const [stations, setStations] = useState(null);
  const [type, setType] = useState(null);
  const navigate = useNavigate();


  const getStation = async () => {
    try {
      const res = await instance.get("/stations?limit=100");
      setAllStations(res.data.metadata.data);
      setStations(res.data.metadata.data.filter((item) => item.type == "train"))

    } catch (error) {
      console.log(error);
    }
  };





  const onSubmit = async (data: any) => {
    try {
      const res = await instance.post(`/route`, data);
      navigate("/admin/route");
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    getStation();
  }, []);
  useEffect(() => {
    handleChangeType(type)
  }, [type, setStations])

  const handleChangeType = (type) => {
    setStations(allStations?.filter(item => item.type == type))
  }

  console.log(stations)




  return (
    <div>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="my-3 px-3 flex flex-col gap-3">
          <label htmlFor="">Type</label>
          <select
            className="p-3 border rounded-md outline-none"
            id=""
            {...register("type")}
            onChange={(e) => {
              setType(e.target.value)
            }}
          >
            <option value="">--choose--</option>

            <option value="train">train</option>
            <option value="bus">Bus</option>
            <option value="air_plane">Plane</option>

          </select>
          <p className="text-red-500">{errors?.duration?.message}</p>
        </div>

        <div className="my-3 px-3 flex flex-col gap-3">
          <label htmlFor="">Depart</label>
          <select
            className="p-3 border rounded-md outline-none"
            id=""
            {...register("startStationId")}
          >
            {stations?.map((item, index) => {
              return <option value={item._id}>{item.name}</option>;
            })}
          </select>
          <p className="text-red-500">{errors?.startStationId?.message}</p>
        </div>
        <div className="my-3 px-3 flex flex-col gap-3">
          <label htmlFor="">Arrival</label>
          <select
            className="p-3 border rounded-md outline-none"
            id=""
            {...register("endStationId")}
          >
            {stations?.map((item, index) => {
              return <option value={item._id}>{item.name}</option>;
            })}
          </select>
          <p className="text-red-500">{errors?.endStationId?.message}</p>
        </div>
        <div className="my-3 px-3 flex flex-col gap-3">
          <label htmlFor="">Distance</label>
          <input
            type="number"
            className="p-2 outline-none border rounded"
            {...register("distance")}
          />
          <p className="text-red-500">{errors?.distance?.message}</p>
        </div>
        <div className="my-3 px-3 flex flex-col gap-3">
          <label htmlFor="">Duration</label>
          <input
            type="number"
            className="p-2 outline-none border rounded"
            {...register("duration")}
          />
          <p className="text-red-500">{errors?.duration?.message}</p>
        </div>

        <button className="p-3 bg-green-600 rounded-md"> Add</button>
      </form>
    </div>
  );
}

export default AddRoute;
