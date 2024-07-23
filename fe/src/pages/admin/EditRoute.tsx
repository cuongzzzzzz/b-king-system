import { useEffect, useState } from "react";
import { instance } from "../../configs/axios";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

function EditRoute() {
  const [route, setRoute] = useState(null);
  const [station, setStation] = useState(null);
  const [defaultValues, setDefaultValues] = useState({});
  const params = useParams();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const res = await instance.get(`/route/${params.id}`);
      setRoute(res.data.metadata);
    } catch (error) {
      console.log(error);
    }
  };
  const getStation = async () => {
    try {
      const res = await instance.get("/stations");
      setStation(res.data.metadata);
    } catch (error) {
      console.log(error);
    }
  };

  const schema = yup.object().shape({
    name: yup.string(),
    startStationId: yup.string().required(),
    endStationId: yup.string().required(),
    distance: yup.string(),
    duration: yup.string(),
  });

  const onSubmit = async (data) => {
    const res = await instance.patch(`/route/${params.id}`, data);
    navigate("/admin/route");
  };
  console.log(defaultValues, station);
  useEffect(() => {
    getData();
    getStation();
  }, []);

  useEffect(() => {
    if (route) {
      setDefaultValues({
        name: route.name,
        startStationId: route.startStationId,
        endStationId: route.startStationId,
        distance: route.distance,
        duration: route.duration,
      });
    }
  }, [route]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  return (
    <div>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="my-3 px-3 flex flex-col gap-3">
          <label htmlFor="">Name</label>
          <input
            type="text"
            placeholder={defaultValues.name}
            className="p-2 outline-none border rounded"
            {...register("name")}
          />
          <p className="text-red-500">{errors?.name?.message}</p>
        </div>
        <div className="my-3 px-3 flex flex-col gap-3">
          <label htmlFor="">Depart</label>
          <select
            className="p-3 border rounded-md outline-none"
            id=""
            {...register("startStationId")}
          >
            {station?.map((item, index) => {
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
            {station?.map((item, index) => {
              return <option value={item._id}>{item.name}</option>;
            })}
          </select>
          <p className="text-red-500">{errors?.endStationId?.message}</p>
        </div>
        <div className="my-3 px-3 flex flex-col gap-3">
          <label htmlFor="">Distance</label>
          <input
            type="text"
            placeholder={defaultValues.distance}
            className="p-2 outline-none border rounded"
            {...register("distance")}
          />
          <p className="text-red-500">{errors?.distance?.message}</p>
        </div>
        <div className="my-3 px-3 flex flex-col gap-3">
          <label htmlFor="">Duration</label>
          <input
            placeholder={defaultValues.duration}
            type="text"
            className="p-2 outline-none border rounded"
            {...register("duration")}
          />
          <p className="text-red-500">{errors?.duration?.message}</p>
        </div>
        <button className="p-3 bg-green-600 rounded-md"> Update</button>
      </form>
    </div>
  );
}

export default EditRoute;
