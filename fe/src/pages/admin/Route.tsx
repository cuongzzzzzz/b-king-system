import { useEffect, useState } from "react";
import { instance } from "../../configs/axios";
import { Link } from "react-router-dom";

function RoutePage() {
  const [routes, setRoutes] = useState([]);

  const handleDelete = async (id) => {
    try {
      const isAgree = window.confirm("Ban co muon xoa khong?");
      if (isAgree) {
        await instance.delete(`/route/${id}`);
        window.alert("Xoa thnah cong!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    try {
      const res = await instance.get("/route");
      setRoutes(res.data.metadata);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(routes);

  return (
    <>
      {/*
  Heads up! 👋

  This component comes with some `rtl` classes. Please remove them if they are not needed in your project.
*/}
      <Link to={"/admin/route/add"}>
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
                Departure
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Arrival
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                distance
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                type
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                duration
              </th>

              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {routes.map((item, index) => (
              <tr key={index}>
                <td className="text-center whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {item?.name}
                </td>
                <td className="text-center whitespace-nowrap px-4 py-2 text-gray-700">
                  {item?.startStationId?.address}
                </td>
                <td className="text-center whitespace-nowrap px-4 py-2 text-gray-700">
                  {item?.endStationId?.address}
                </td>
                <td className="text-center whitespace-nowrap px-4 py-2 text-gray-700">
                  {item?.distance}
                </td>
                <td className="text-center whitespace-nowrap px-4 py-2 text-gray-700">
                  {item?.type}
                </td>
                <td className="text-center whitespace-nowrap px-4 py-2 text-gray-700">
                  {item?.duration}
                </td>

                <td className="text-center whitespace-nowrap px-4 py-2">
                  <Link
                    to={`/route/${item._id}`}
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

export default RoutePage;
