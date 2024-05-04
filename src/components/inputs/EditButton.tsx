import { useCreateMovieModal } from "@/hooks/useCreateMovieModal";
import { useCreateSeriesModal } from "@/hooks/useCreateSeriesModal";
import { useInfoModal } from "@/hooks/useInfoModal";
import { useSeriesInfoModal } from "@/hooks/useSeriesInfoModal";
import { PencilIcon } from "@heroicons/react/24/outline";
import React, { useCallback } from "react"; 
import { twMerge } from "tailwind-merge";

const EditButton = ({ type, id }: { type: "movie" | "series"; id: string }) => {
  const seriesInfo = useSeriesInfoModal();
  const movieInfo = useInfoModal();

  const updateSeriesModal = useCreateSeriesModal();
  const updateMovieModal = useCreateMovieModal();

  const handleUpdate = useCallback(() => {
    if (type === "movie") {
      movieInfo.onClose();
      updateMovieModal.onOpen(id);
    }
    if (type === "series") {
      seriesInfo.onClose();
      updateSeriesModal.onOpen(id);
    }
  }, [type, id, movieInfo, updateMovieModal, seriesInfo, updateSeriesModal]);

  return (
    <button
      onClick={handleUpdate}
      className={twMerge(
        "cursor-pointer group/item min-w-10 min-h-10 text-yellow-500   border-yellow-500 border-2 rounded-full flex justify-center items-center transition  "
      )}
    >
      <PencilIcon className="w-5 h-5 " />
    </button>
  );
};

export default EditButton;
