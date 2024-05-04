import { PlayIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import React from "react";
import { twMerge } from "tailwind-merge";

const PlayButton = ({
  id,
  small = false,
  type = "movie",
}: {
  type?: "movie" | "series";
  small?: boolean;
  id?: string;
}) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(`/watch/${type}/${id}`)}
      className={twMerge(
        small
          ? "  min-w-10 min-h-10 flex items-center justify-center bg-white text-red-600 rounded-full drop-shadow-2xl"
          : `
        bg-white 
        rounded-md 
        py-1 md:py-2 
        px-2 md:px-4
        w-auto 
        text-xs lg:text-lg 
        font-semibold
        flex
        flex-row
        items-center
        hover:bg-neutral-300
        transition
        text-red-600 animate-pulse
        `
      )}
      disabled={!!!id}
    >
      <PlayIcon
        className={twMerge(
          small
            ? "w-7 h-7 text-red-600 fill-red-600"
            : "w-4 md:w-7 text-red-600 mr-1 fill-red-600"
        )}
      />
      {!!!small && "Play"}
    </button>
  );
};

export default PlayButton;
