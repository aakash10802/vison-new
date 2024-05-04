import useCurrentUser from "@/hooks/useCurrentUser";
import useNewses from "@/hooks/useNewses";
import axios from "axios";
import React, { useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { AiFillLike } from "react-icons/ai";
import { BiLike } from "react-icons/bi";
import { FcLike } from "react-icons/fc";
import { twMerge } from "tailwind-merge";

const NewsLikeButton = ({
  newsId,
  className,
}: {
  className?: string;
  newsId?: string;
}) => {
  const { user, mutate: userMutate } = useCurrentUser();
  const { mutate: favoritesMutate } = useNewses();
  const [isLoading, setloading] = useState(false);
  const isFavorite = useMemo(() => {
    const list = newsId ? user?.favoriteNews.includes(newsId) : false;
    return list;
  }, [user, newsId]);

  const toggleFavorites = useCallback(async () => {
    try {
      setloading(true);
      let req;

      if (isFavorite) {
        req = async () =>
          await axios
            .delete("/api/favorite", { data: { id: newsId, type: "news" } })
            .then((res) => toast.success(res.data.message));
      } else {
        req = async () =>
          await axios
            .post("/api/favorite", { id: newsId, type: "news" })
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
  }, [setloading, userMutate, favoritesMutate, isFavorite, newsId]);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        toggleFavorites();
      }}
      className={twMerge(
        "min-w-10 min-h-10 max-w-10 max-h-10 rounded-full bg-zinc-800 bg-opacity-80 hover:scale-105 transition-all active:scale-90 drop-shadow-2xl flex items-center justify-center",
        isFavorite
          ? "text-red-500 fill-red-500"
          : "text-white fill-wtext-white",
        isLoading ? "animate-pulse" : "animate-none",
        className
      )}
    >
      <AiFillLike />
    </button>
  );
};

export default NewsLikeButton;
