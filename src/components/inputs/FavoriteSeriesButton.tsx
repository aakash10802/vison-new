import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";
import { CheckIcon, PlusIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import React, { useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

const FavoriteSeriesButton = ({ seriesId }: { seriesId?: string }) => {
  const { user, mutate: userMutate } = useCurrentUser();
  const { mutate: favoritesMutate } = useFavorites();
  const [isLoading, setloading] = useState(false);
  const isFavorite = useMemo(() => {
    const list = seriesId ? user?.favoriteSeries.includes(seriesId) : false;
    return list;
  }, [user, seriesId]);

  const toggleFavorites = useCallback(async () => {
    try {
      setloading(true);
      let req;

      if (isFavorite) {
        req = async () =>
          await axios
            .delete("/api/favorite", { data: { id: seriesId, type: "series" } })
            .then((res) => toast.success(res.data.message));
      } else {
        req = async () =>
          await axios
            .post("/api/favorite", { id: seriesId, type: "series" })
            .then((res) => toast.success(res.data.message));
      }

      await req().then(() => {
        userMutate();
        favoritesMutate();
      });
    } catch (error: any) {
      toast.error("something went wrong");
    } finally {
      setloading(false);
    }
  }, [setloading, userMutate, favoritesMutate, isFavorite, seriesId]);

  const Icon = isFavorite ? CheckIcon : PlusIcon;

  return (
    <div
      onClick={toggleFavorites}
      className={twMerge(
        "cursor-pointer group/item  min-w-10 min-h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300",
        isLoading ? "animate-pulse" : "",
        isFavorite ? "bg-red-700 text-white" : "text-white"
      )}
    >
      <Icon
        className={twMerge(" group-hover/item:text-neutral-300 w-4 lg:w-6")}
      />
    </div>
  );
};

export default FavoriteSeriesButton;
