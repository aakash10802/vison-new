import fetcher from "@/libs/fetcher";
import { News } from "@prisma/client";
import useSWR from "swr";

const useNewses = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/news", fetcher);
  return {
    news: (data?.news || []) as News[],
    favoritesNews: data?.favoritesNews as News[] | null,
    error,
    isLoading,
    mutate,
  };
};

export default useNewses;
