import { useSeriesInfoModal } from "@/hooks/useSeriesInfoModal";
import useSingleSeries from "@/hooks/useSingleSeries";
import React from "react";
import Modal from "./Modal";
import PlayButton from "../inputs/PlayButton";
import FavoriteSeriesButton from "../inputs/FavoriteSeriesButton";
import DeleteButton from "../inputs/DeleteButton";
import EditButton from "../inputs/EditButton";
import { ClockIcon } from "@heroicons/react/24/outline";
import Loader from "../ui/Loader";
import { twMerge } from "tailwind-merge";

const SeriesInfoModal = ({ adminMode = false }: { adminMode?: boolean }) => {
  const { isOpen, onClose, seriesId } = useSeriesInfoModal();
  const { series } = useSingleSeries(seriesId);
  return (
    <Modal onClose={onClose} isVisible={isOpen}>
      <div
        className={twMerge(
          series
            ? ""
            : "w-screen  md:w-[500px] lg:w-[650px] h-screen md:h-[70vh] flex items-center justify-center"
        )}
      >
        {series ? (
          <>
            <div className="  relative  min-w-full h-fit md:h-96 z-0">
              <video
                poster={series?.thumbnailUrl}
                autoPlay
                muted
                loop
                src={series?.videoUrl}
                className="w-full brightness-[60%] object-cover h-[300px] md:h-full"
              />
              <div className="absolute bottom-[10%] left-10">
                <p className="capitalize text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8">
                  {series?.title}
                </p>
                <div className="flex flex-row gap-4 items-center">
                  <PlayButton type="series" id={series?.id} />
                  <FavoriteSeriesButton seriesId={series?.id} />
                  {adminMode && (
                    <>
                      <DeleteButton type="series" id={series?.id} />
                      <EditButton type="series" id={series?.id} />
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="px-5 md:px-12 py-8">
              <div className="flex flex-wrap flex-row items-center gap-2 mb-8">
                <p className="text-green-400 font-semibold text-lg">New</p>
                <div className="text-white text-lg flex flex-wrap md:flex-row gap-2 items-center justify-start">
                  <p className="flex items-center gap-1">
                    <ClockIcon className="w-4 h-4" />
                    {series?.duration} /
                  </p>
                  <p> {series?.seasons} seasons /</p>
                  <p>{series?.epizodes} epizodes</p>
                </div>
                <p className="text-white text-lg text-wrap  ">
                  {series?.genre.split(",").join(" , ")}
                </p>
              </div>
              <p className="text-white text-lg">{series?.description}</p>
            </div>
          </>
        ) : (
          <Loader message="loading series data" />
        )}
      </div>
    </Modal>
  );
};

export default SeriesInfoModal;
