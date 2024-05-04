import useBillboard from "@/hooks/useBillboard";
import React from "react";

import { AiOutlineInfoCircle } from "react-icons/ai";
import PlayButton from "../inputs/PlayButton";
import { useInfoModal } from "@/hooks/useInfoModal";

const Billboard = () => {
  const { billboard } = useBillboard();
  const movieInfoModal = useInfoModal();
  const seriesInfoModal = useInfoModal();
  return (
    <section className="relative h-[56.35vw] bg-transparent">
      <video
        src={billboard?.videoUrl}
        poster={billboard?.thumbnailUrl}
        autoPlay
        muted
        loop
        className="w-full h-[56.25vw] object-cover brightness-[60%]"
      ></video>
      <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
        <p className="capitalize  text-xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl text-white">
          {billboard?.title}
        </p>
        <p className="text-white text-[8px] md:text-lg mt-3 md:mt-6 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
          {billboard?.description}
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3 ">
          <PlayButton type={billboard?.type} id={billboard?.id} />
          <button
            onClick={() =>
              billboard?.type && billboard.type === "movie"
                ? movieInfoModal.onOpen(billboard!.id)
                : seriesInfoModal.onOpen(billboard!.id)
            }
            className="bg-white bg-opacity-30 text-white rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center gap-2 hover:bg-opacity-20 transition-all"
            disabled={!!!billboard?.id}
          >
            <AiOutlineInfoCircle />
            More Info
          </button>
        </div>
      </div>
    </section>
  );
};

export default Billboard;
