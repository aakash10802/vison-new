import fetcher from "@/libs/fetcher";
import { Movie } from "@prisma/client";
import useSWR from "swr";

const useMovies = () => {
  const {
    data: movies,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/movies", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateIfStale: false,
  });
  return { movies: movies as Movie[] | null, error, isLoading, mutate };
};

export default useMovies;
