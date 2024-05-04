import fetcher from "@/libs/fetcher";
import { Movie } from "@prisma/client";
import useSWR from "swr";

const useMovie = (id?: string) => {
  const url = id ? `/api/movies/${id}` : null;
  const {
    data: movie,
    error,
    isLoading,
    mutate,
  } = useSWR(url, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return { movie: movie as Movie | null, error, isLoading, mutate };
};

export default useMovie;
