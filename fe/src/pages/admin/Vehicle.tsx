import { instance } from "@/configs/axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Vehicle() {
    const [trips, setTrips] = useState([]);
    const [vehicles, setVehicles] = useState([]);

    const userInfo = useSelector(state => state.auth.login.currentUser)

    const handleDelete = async (id) => {
        try {
            const isAgree = window.confirm("Ban co muon xoa khong?");
            if (isAgree) {
                await instance.delete(`/vehicle/${id}`);
                window.alert("Xoa thnah cong!");
            }
        } catch (error) {
            console.log(error);
        }
    };


  
    const getVehicles = async () => {
        try {
            const res = await instance.get(`/vehicle/carrier/${userInfo._id}`);
            setVehicles(res.data.metadata);
            console.log(res.data.metadata)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // getData();
        getVehicles()
    }, []);

    return (
        <>
            {/*
    Heads up! 👋
  
    This component comes with some `rtl` classes. Please remove them if they are not needed in your project.
  */}
            <Link to={"/admin/trip/add"}>
                <button className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700">
                    add
                </button>
            </Link>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="">
                        <tr>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                Name
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                Number of seats
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                Type
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                license plate
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                amenities
                            </th>


                            <th className="px-4 py-2">Action</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {vehicles && vehicles.map((item, index) => (
                            <tr key={index}>
                                <td className="text-center whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    {item.name}
                                </td>
                                <td className="text-center whitespace-nowrap px-4 py-2 text-gray-700">
                                    {item.numberOfSeats}
                                </td>
                                <td className="text-center whitespace-nowrap px-4 py-2 text-gray-700">
                                    {item.type}
                                </td>
                                <td className="text-center whitespace-nowrap px-4 py-2 text-gray-700">
                                    {item.licensePlate}
                                </td>
                                <td className="text-center whitespace-nowrap px-4 py-2 text-gray-700">
                                    {item.amenities.join(", ")}
                                </td>


                                <td className="text-center whitespace-nowrap px-4 py-2">
                                    <Link
                                        to={`/vehicle/${item._id}`}
                                        className="inline-block rounded mr-3 bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                                        onClick={() => {
                                            handleDelete(item._id);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Vehicle;