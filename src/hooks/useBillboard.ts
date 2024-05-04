import fetcher from "@/libs/fetcher";
import { Movie, series } from "@prisma/client";
import useSWR from "swr";

const useBillboard = (props?: { type: "series" | "movie" }) => {
  const url =
    props && props.type === "movie"
      ? `/api/random?display=movie`
      : props && props.type === "series"
      ? "/api/random?display=series"
      : "/api/random";

  const {
    data: billboard,
    error,
    mutate,
    isLoading,
  } = useSWR(url, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return {
    billboard: billboard as
      | (Movie & {
          type: "series" | "movie";
        })
      | (series & {
          type: "series" | "movie";
        })
      | null,
    error,
    mutate,
    isLoading,
  };
};

export default useBillboard;
