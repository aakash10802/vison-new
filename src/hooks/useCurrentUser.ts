import fetcher from "@/libs/fetcher";
import { Movie, User, series } from "@prisma/client";
import useSWR from "swr";

const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/current", fetcher);

  return {
    user: data?.user as User,
    error,
    isLoading,
    mutate,
    series: data?.series as series[] | null,
    movies: data?.movies as Movie[] | null,
  };
};

export default useCurrentUser;
