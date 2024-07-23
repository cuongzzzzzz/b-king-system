import { useEffect, useState } from "react";
import { instance } from "../../configs/axios";
import { Link } from "react-router-dom";

function Trip() {
  const [trips, setTrips] = useState([]);

  const handleDelete = async (id) => {
    try {
      const isAgree = window.confirm("Ban co muon xoa khong?");
      if (isAgree) {
        await instance.delete(`/trip/${id}`);
        window.alert("Xoa thnah cong!");
      }
    } catch (error) {
      console.log(error);
    }
  };


  const getData = async () => {
    try {
      const res = await instance.get("/trip");
      setTrips(res.data.metadata);
      console.log(res.data.metadata)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);


  console.log ()
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
                Route
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Departure
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Arrival
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                depart Date
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Arrival Date
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Number of seats
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Price
              </th>

              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {trips && trips.map((item, index) => (
              <tr key={index}>
                <td className="text-center whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {item.route.name}
                </td>
                <td className="text-center whitespace-nowrap px-4 py-2 text-gray-700">
                  {item.startStation.name}
                </td>
                <td className="text-center whitespace-nowrap px-4 py-2 text-gray-700">
                  {item.endStation.name}
                </td>
                <td className="text-center whitespace-nowrap px-4 py-2 text-gray-700">
                  {item.departureDate.split("T")[0]}
                </td>
                <td className="text-center whitespace-nowrap px-4 py-2 text-gray-700">
                  {item.arrivalDate.split("T")[0]}
                </td>
                <td className="text-center whitespace-nowrap px-4 py-2 text-gray-700">
                  {item.numberOfSeats}
                </td>
                <td className="text-center whitespace-nowrap px-4 py-2 text-gray-700">
                  {item.price}
                </td>

                <td className="text-center whitespace-nowrap px-4 py-2">
                  <Link
                    to={`/trip/${item._id}`}
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

export default Trip;
