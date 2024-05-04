import fetcher from "@/libs/fetcher";
import { Movie, User, series } from "@prisma/client";
import useSWR from "swr";

const useUser = (id?: string) => {
  const url = id ? `/api/users/${id}` : null;
  const { data, isLoading, mutate, error } = useSWR(url, fetcher);
  return {
    user: data?.user as User | null,
    series: data?.series as series[] | null,
    movies: data?.movies as Movie[] | null,
    error,
    isLoading,
    mutate,
  };
};

export default useUser;
