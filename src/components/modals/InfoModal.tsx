import React from "react";
import Modal from "./Modal";
import { useInfoModal } from "@/hooks/useInfoModal";
import useMovie from "@/hooks/useMovie";
import PlayButton from "../inputs/PlayButton";
import FavoriteButton from "../inputs/FavoriteButton";
import DeleteButton from "../inputs/DeleteButton";
import EditButton from "../inputs/EditButton";
import { ClockIcon } from "@heroicons/react/24/outline";
import Loader from "../ui/Loader";
import { twMerge } from "tailwind-merge";

const InfoModal = ({ adminMode = false }: { adminMode?: boolean }) => {
  const { isOpen, onClose, movieId } = useInfoModal();
  const { movie, isLoading } = useMovie(movieId);

  return (
    <Modal onClose={onClose} isVisible={isOpen}>
      <div
        className={twMerge(
          movie
            ? ""
            : "w-screen max-w-full  md:w-[500px] lg:w-[650px] h-screen md:h-[70vh] flex items-center justify-center overflow-hidden"
        )}
      >
        {movie ? (
          <>
            <div className="relative  min-w-full h-fit md:h-96 z-0">
              <video
                poster={movie?.thumbnailUrl}
                autoPlay
                muted
                loop
                src={movie?.videoUrl}
                className="w-full brightness-[60%] object-cover h-[300px] md:h-full"
              />
              <div className="absolute bottom-[10%] left-10">
                <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8 capitalize">
                  {movie?.title}
                </p>
                <div className="flex flex-row gap-4 items-center">
                  <PlayButton id={movie?.id} />
                  <FavoriteButton movieId={movie?.id} />
                  {adminMode && (
                    <>
                      <DeleteButton type="movie" id={movie?.id} />
                      <EditButton type="movie" id={movie?.id} />
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="px-5 md:px-12 py-8">
              <div className="text-white text-lg   flex-wrap md:flex-row   justify-start flex flex-row items-center gap-2 mb-8">
                <p className="text-green-400 font-semibold text-lg">New</p>

                <p className="flex items-center gap-1">
                  <ClockIcon className="w-4 h-4" />
                  {movie?.duration}
                </p>
                <p className="text-white text-lg">{movie?.genre}</p>
              </div>
              <p className="text-white text-lg">{movie?.description}</p>
            </div>
          </>
        ) : (
          <Loader message="Loading movies data" />
        )}
      </div>
    </Modal>
  );
};

export default InfoModal;
