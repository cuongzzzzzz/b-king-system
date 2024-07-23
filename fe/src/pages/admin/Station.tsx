import { useEffect, useState } from "react";
import { instance } from "../../configs/axios";
import { Link } from "react-router-dom";
import { PaginationDemo } from "../../components/admin/Pagination";
import SortGroup from "../../components/admin/SortGroup";

function Station() {
  const [stations, setStation] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [sortBy, setSortBy] = useState("city");
  const [sortDirection, setSortDirection] = useState("asc");
  const [text, setText] = useState("City asc");
  const [type, setType] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setText(`${sortBy} ${sortDirection}`)
  }, [sortBy, sortDirection])

  useEffect(() => {
    getData(page, sortBy, sortDirection, type, search,);
  }, [page, sortBy, sortDirection, search, type]);
  useEffect(() => {
    setPage(1)
  }, [type])



  const handleDelete = async (id: any) => {
    try {
      const isAgree = window.confirm("Ban co muon xoa khong?");
      if (isAgree) {
        await instance.delete(`/stations/${id}`);
        window.alert("Xoa thnah cong!");
        getData(page, sortBy, sortDirection, type, search,);
      }
    } catch (error) {
      console.log(error);
    }
  };



  const getData = async (page?: number, sortBy?: string, sortDirection?: string, type?: string, search?: string) => {
    try {
      if (!type) type = ""
      if (!search) search = ""
      if (page) {
        const res = await instance.get(`/stations/query?page=${page}&&sortBy=${sortBy}&&sortDirection=${sortDirection}&&limit=10&&type=${type}&&search=${search}`);
        // console.log(res.data.metadata)
        setTotalPage(res.data.metadata.totalPage)
        setStation(res.data.metadata.data);
      } else {
        const res = await instance.get("/stations");
        setStation(res.data.metadata.data);
        // console.log(res.data.metadata)
        setTotalPage(res.data.metadata.totalPage)
      }

    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className="flex flex-col  gap-5 p-5">

      <div className="flex justify-between items-center gap-10">
        <Link to={"/admin/station/add"}>
          <button className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700">
            add
          </button>
        </Link>
        <SortGroup search={search} setSearch={setSearch} text={text} setSortBy={setSortBy} setSortDirection={setSortDirection} type={type} setType={setType} />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                address
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                city
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Type
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Zipcode
              </th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {stations.map((item: any, index: number) => (
              <tr key={index}>
                <td className="text-center whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {item?.name}
                </td>
                <td className="text-center whitespace-nowrap px-4 py-2 text-gray-700">
                  {item?.address}
                </td>
                <td className="text-center whitespace-nowrap px-4 py-2 text-gray-700">
                  {item?.city}
                </td>
                <td className="text-center whitespace-nowrap px-4 py-2 text-gray-700">
                  {item?.type}
                </td>
                <td className="text-center whitespace-nowrap px-4 py-2 text-gray-700">
                  {item?.zipCode}
                </td>
                <td className="text-center whitespace-nowrap px-4 py-2">
                  <Link
                    to={`/station/${item?._id}`}
                    className="inline-block rounded mr-3 bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                  >
                    Edit
                  </Link>
                  <button
                    className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                    onClick={() => {
                      handleDelete(item?._id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <PaginationDemo currentPage={page} setPage={setPage} totalPage={totalPage} />
      </div>
    </div>
  );
}

export default Station;
