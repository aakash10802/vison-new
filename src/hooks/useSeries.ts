import fetcher from "@/libs/fetcher";
import { series } from "@prisma/client"; 
import useSWR from "swr";

const useSeries = () => {
  const {
    data: series,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/series", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateIfStale: false,
  });
  return { series: series as series[] | null, error, isLoading, mutate };
};

export default useSeries;
