import { getCityUnique, getOneStation } from "@/services/station";
import { useQuery } from "react-query";

export const useStationQuery = (option:any) => {
  const { data, isLoading } = useQuery({
    queryKey: ["STATION_KEY", option],
    queryFn: async () => {
      return option?.id
        ? await getOneStation(option?.id)
        : await getCityUnique(option?.type);
    },
  }); 
  return { data, isLoading };
};
