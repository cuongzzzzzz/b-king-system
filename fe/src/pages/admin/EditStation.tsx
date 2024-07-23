import { useEffect, useState } from "react";
import { instance } from "../../configs/axios";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

function EditStation() {
  const [station, setStation] = useState(null);
  const [defaultValues, setDefaultValues] = useState({});
  const params = useParams();
  const navigate = useNavigate();

  const schema = yup.object().shape({
    name: yup.string(),
    address: yup.string(),
    city: yup.string(),
    zipCode: yup.string(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const getData = async () => {
    try {
      const res = await instance.get(`/stations/${params.id}`);
      setStation(res.data.metadata);
      reset(res.data.metadata)
    } catch (error) {
      console.log(error);
    }
  };



  const onSubmit = async (data: any) => {
    const res = await instance.patch(`/stations/${params.id}`, data);
    navigate("/admin/station");
  };
  console.log(defaultValues, station);
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (station) {
      setDefaultValues({
        name: station.name,
        address: station.address,
        city: station.city,
        zipCode: station.zipCode,
      });
    }
  }, [station]);



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
          <label htmlFor="">address</label>
          <input
            type="text"
            placeholder={defaultValues.address}
            className="p-2 outline-none border rounded"
            {...register("address")}
          />
          <p className="text-red-500">{errors?.address?.message}</p>
        </div>
        <div className="my-3 px-3 flex flex-col gap-3">
          <label htmlFor="">City</label>
          <input
            type="text"
            placeholder={defaultValues.city}
            className="p-2 outline-none border rounded"
            {...register("city")}
          />
          <p className="text-red-500">{errors?.city?.message}</p>
        </div>
        <div className="my-3 px-3 flex flex-col gap-3">
          <label htmlFor="">Zipcode</label>
          <input
            placeholder={defaultValues.zipCode}
            type="text"
            className="p-2 outline-none border rounded"
            {...register("zipCode")}
          />
          <p className="text-red-500">{errors?.zipCode?.message}</p>
        </div>
        <button className="p-3 bg-green-600 rounded-md"> Update</button>
      </form>
    </div>
  );
}

export default EditStation;
