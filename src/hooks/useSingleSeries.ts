import fetcher from "@/libs/fetcher";
import { series } from "@prisma/client";
import React from "react";
import useSWR from "swr";

const useSingleSeries = (seriesId?: string) => {
  const url = seriesId ? `/api/series/${seriesId}` : null;
  const {
    data: series,
    error,
    isLoading,
    mutate,
  } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateIfStale: false,
  });
  return { series: series as series | null, error, isLoading, mutate };
};

export default useSingleSeries;
