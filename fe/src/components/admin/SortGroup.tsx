import { useState } from "react"
import Search from "./Search"

function SortGroup({
    setSortBy, setSortDirection, text, search, setSearch, type, setType
}: {
    setSortBy: any, setSortDirection: any, text: string, search: string, setSearch: any, type: string, setType: any
}) {

    const [showType, setShowType] = useState(false)
    const [showSort, setShowSort] = useState(false)

    const handleSort = ({ sortBy, sortDirection }: { sortBy: string, sortDirection: string }) => {
        setSortDirection(sortDirection)
        setSortBy(sortBy)
    }
    const handleType = ({ type }: { type: string }) => {
        setType(type)
    }
    return (
        <>
            <div className="flex grow justify-between gap-5">
                <Search search={search} setSearch={setSearch} />
                <div className="flex items-center gap-3 ">
                    <p className="text-sm font-bold whitespace-nowrap">sort by</p>
                    <div className="px-3 py-2 border rounded relative w-[150px]" onClick={() => setShowSort(!showSort)}>
                        <p>{text}</p>
                        {showSort && (
                            <div className=" flex-col absolute border rounded top-[100%] left-0 w-full bg-white flex">
                                <p className="px-3 py-2 hover:bg-slate-300" onClick={() => handleSort({ sortBy: "city", sortDirection: "asc" })}>City asc</p>
                                <p className="px-3 py-2 hover:bg-slate-300" onClick={() => handleSort({ sortBy: "city", sortDirection: "desc" })}>City desc</p>
                                <p className="px-3 py-2 hover:bg-slate-300" onClick={() => handleSort({ sortBy: "zipCode", sortDirection: "asc" })}>Zipcode asc</p>
                                <p className="px-3 py-2 hover:bg-slate-300" onClick={() => handleSort({ sortBy: "zipCode", sortDirection: "desc" })}>Zipcode desc</p>
                            </div>

                        )}
                    </div>

                </div>
                <div className="flex items-center gap-3 ">
                    <p className="text-sm font-bold whitespace-nowrap">Type</p>
                    <div className="px-3 py-2 border rounded relative w-[150px]" onClick={() => setShowType(!showType)}>
                        <p>{type == "" ? "All" : type}</p>
                        {showType && (
                            <div className=" flex-col absolute border rounded top-[100%] left-0 w-full bg-white flex">
                                <p className="px-3 py-2 hover:bg-slate-300" onClick={() => handleType({ type: "" })}>All</p>
                                <p className="px-3 py-2 hover:bg-slate-300" onClick={() => handleType({ type: "bus" })}>Bus</p>
                                <p className="px-3 py-2 hover:bg-slate-300" onClick={() => handleType({ type: "train" })}>train</p>
                                <p className="px-3 py-2 hover:bg-slate-300" onClick={() => handleType({ type: "air_plane" })}>Plane</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </>
    );
}

export default SortGroup;