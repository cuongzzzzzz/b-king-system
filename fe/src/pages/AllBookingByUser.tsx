import { TableDemo } from "@/components/Table";
import { getAllBookingByUserid } from "@/services/booking";
import { useEffect, useState } from "react";

function AllBookingByUSer() {

  const [data, setData] = useState<any>([])

  const getData = async () => {
    try {
      const res = await getAllBookingByUserid()
      setData(res)
    } catch (error) {
      console.log(error)
    }


  }
  useEffect(() => {
    getData()
  }, [])
  return <>
    <div className="container flex flex-col gap-10  mx-auto my-10">

      <TableDemo data={data} />
    </div>  </>;
}

export default AllBookingByUSer;
