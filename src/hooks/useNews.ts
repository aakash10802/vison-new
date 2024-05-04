import fetcher from "@/libs/fetcher";
import { News } from "@prisma/client"; 
import useSWR from "swr";

const useNews = (id?: string) => {
  const url = id ? `/api/news/${id}` : null;
  const { data: news, error, isLoading, mutate } = useSWR(url, fetcher);

  return { news: news as News | null, error, isLoading, mutate };
};

export default useNews;
