// @ts-nocheck
import { useEffect, useState } from "react";
import { instance } from "../../configs/axios";
import { useNavigate, } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

function AddStation() {
  const [station, setStation] = useState(null);
  const [defaultValues, setDefaultValues] = useState({});
  const [provinces, setProvinces] = useState([]);
  const [zipCode, setZipCode] = useState("");
  const navigate = useNavigate();

  //   const getData = async () => {
  //     try {
  //       const res = await instance.get(`/stations/${params.id}`);
  //       setStation(res.data.metadata);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  const schema = yup.object().shape({
    name: yup.string().required(),
    address: yup.string().required(),
    city: yup.string().required(),
    type: yup.string().required()
  });

  const onSubmit = async (data) => {
    const res = await instance.post(`/stations/`, { ...data, zipCode });
    navigate("/admin/station");
  };


  const {
    register,
    handleSubmit,
    formState: { errors }, setValue
  } = useForm({
    resolver: yupResolver(schema),
    // defaultValues,
  });


  const getProvince = async () => {
    try {
      const res = await instance.get(`/province/`);
      setProvinces(res.data.metadata)
      setValue("city", res.data.metadata[0])
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    getProvince()
  }, [])
  return (
    <div>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="my-3 px-3 flex flex-col gap-3">
          <label htmlFor="">Type</label>
          <select
            className="p-3 border rounded-md outline-none"
            id=""
            {...register("type")}
          >
            <option value="train">train</option>
            <option value="bus">Bus</option>
            <option value="air_plane">Plane</option>

          </select>
          <p className="text-red-500">{errors?.duration?.message}</p>
        </div>
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
          <select {...register("city")} onChange={(e) => setZipCode(e.target.value)} id="" className="p-2 outline-none border rounded">
            {provinces.map((item: any, index) => {
              console.log(item)
              return <option key={index} value={item.zipcode}>{item.name}</option>
            })}
          </select>
          <p className="text-red-500">{errors?.city?.message}</p>
        </div>

        <button className="p-3 bg-green-600 rounded-md"> add</button>
      </form >
    </div >
  );
}

export default AddStation;
