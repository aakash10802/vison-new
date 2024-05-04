import { useInfoModal } from "@/hooks/useInfoModal";
import useMovies from "@/hooks/useMovies";
import useSeries from "@/hooks/useSeries";
import { useSeriesInfoModal } from "@/hooks/useSeriesInfoModal";
import { TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

const DeleteButton = ({
  id,
  type,
}: {
  id: string;
  type: "movie" | "series";
}) => {
  const { mutate: seriesMutate } = useSeries();
  const { mutate: moviesMutate } = useMovies();

  const movieModalInfo = useInfoModal();
  const seriesModalInfo = useSeriesInfoModal();

  const [isLoading, setLoading] = useState(false);

  const onDelete = useCallback(async () => {
    try {
      setLoading(true);
      let req;
      if (type === "movie") {
        req = async () =>
          await axios
            .delete(`/api/movies/${id}`, { data: { id } })
            .then((res) => toast.success(res.data.message));
      } else {
        req = async () =>
          await axios
            .delete(`/api/series/${id}`, { data: { id } })
            .then((res) => toast.success(res.data.message));
      }

      await req().then(() => {
        if (type === "movie") {
          movieModalInfo.onClose();
          moviesMutate();
        } else {
          seriesMutate();
          seriesModalInfo.onClose();
        }
      });
    } catch (error: any) {
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  }, [
    setLoading,
    id,
    type,
    seriesModalInfo,
    movieModalInfo,
    seriesMutate,
    moviesMutate,
  ]);

  return (
    <button
      disabled={isLoading}
      onClick={onDelete}
      className={twMerge(
        "cursor-pointer group/item min-w-10 min-h-10 text-white hover:text-red-700 hover:border-red-700 border-white border-2 rounded-full flex justify-center items-center transition  ",
        isLoading ? "animate-pulse" : ""
      )}
    >
      <TrashIcon
        className={twMerge("   w-4 lg:w-6")}
      />
    </button>
  );
};

export default DeleteButton;
