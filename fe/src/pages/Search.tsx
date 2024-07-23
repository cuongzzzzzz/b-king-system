import { searchTrip } from "@/services/trip";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import CardDetail from "../components/CardDetail";
import SearchSection from "../components/SearchSection";
import { useState } from "react";
import { updateQuery } from "@/redux/querySlice";

function Search() {
  const data1 = useSelector((state: any) => state.query);
  console.log(data1)

  const [sortBy, setSortBy] = useState("city");
  const [sortDirection, setSortDirection] = useState("asc");
  const dispatch = useDispatch()

  const handleSort = (sortBy: string, sortDirection: string) => {
    dispatch(updateQuery({ sortBy, sortDirection }))
    console.log(sortBy, sortDirection)
    setSortBy(sortBy);
    setSortDirection(sortDirection);
  };

  const { data, isLoading, } = useQuery({
    queryKey: [
      "TRIP_KEY",
      data1.departureStation,
      data1.arrivalStation,
      data1.departureDate,
      sortBy, sortDirection
    ],
    queryFn: async () => {
      console.log(data1)
      return await searchTrip(data1);
    },
  });


  return (
    <>
      <div className="w-full px-5 lg:px-0 flex  justify-center py-10 bg-[#F2F2F2]">
        <div className="w-full lg:w-10/12 xl:w-8/12 mx-auto">
          <div className="my-10">
            <SearchSection />
          </div>
          <div className="flex w-full gap-5 md:flex-row flex-col">
            <div className="md:w-1/4  w-full">
              <div className="bg-white p-5 rounded-lg">
                <p className="text-lg my-5">Sắp xếp </p>
                <form action="" className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <input type="radio" id="1" name="option" onClick={() => handleSort("price", "asc")} defaultChecked />
                    <label htmlFor="1" className="text-sm">Mặc định</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="radio" id="2" name="option" onClick={() => handleSort("departureTime", "asc")} />
                    <label htmlFor="2" className="text-sm">Giờ đi sớm nhất</label>
                  </div>
                  {/* <div className="flex items-center gap-3">
                    <input type="radio" name="option" onClick={() => handleSort("price", "desc")} />
                    <label htmlFor="" className="text-sm">Đánh giá cao nhất</label>
                  </div> */}
                  <div className="flex items-center gap-3">
                    <input type="radio" id="3" name="option" onClick={() => handleSort("price", "asc")} />
                    <label htmlFor="3" className="text-sm">Giá tăng dần</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="radio" id="4" name="option" onClick={() => handleSort("price", "desc")} />
                    <label htmlFor="4" className="text-sm">Giá giảm dần</label>
                  </div>
                </form>
              </div>
            </div>
            <div className="md:w-3/4 w-full flex flex-col gap-5 ">
              {isLoading ? (
                <p>Loading</p>
              ) : data ? (
                data.map((item: any) => {
                  return <CardDetail key={item._id} data={item} />;
                })
              ) : (
                <p>Error</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
