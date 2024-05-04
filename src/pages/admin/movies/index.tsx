import MovieList from "@/components/lists/MovieList";
import CreateMovie from "@/components/modals/CreateMovie";
import InfoModal from "@/components/modals/InfoModal";
import SideBar from "@/components/sidebar/SideBar";
import CustomBillBoard from "@/components/ui/CustomBillBoard";
import Header from "@/components/ui/Header";
import useBillboard from "@/hooks/useBillboard";
import { useCreateMovieModal } from "@/hooks/useCreateMovieModal";
import { useInfoModal } from "@/hooks/useInfoModal";
import useMovies from "@/hooks/useMovies";
import { useSideBar } from "@/hooks/useSideBar";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import React from "react";
import { BiAddToQueue, BiSidebar } from "react-icons/bi";
export const getServerSideProps = async (ctx: NextPageContext) => {
  const session = await getSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
const MoviesPage = () => {
  const { billboard } = useBillboard({ type: "movie" });
  const { movies } = useMovies();
  const { onOpen } = useInfoModal();
  const SideBarModal = useSideBar();
  const createMoviesModal = useCreateMovieModal();

  return (
    <>
      <Header
        title="Movies"
        callBack
        actions={[
          {
            icon: BiSidebar,
            id: 0,
            onClick: () => SideBarModal.onOpen(),
          },
          {
            onClick: () => createMoviesModal.onOpen(),
            id: 2,
            icon: BiAddToQueue,
          },
        ]}
      />
      <CreateMovie />
      <InfoModal adminMode />
      <CustomBillBoard billboard={billboard} onOpen={onOpen} type="movie" />
      <MovieList
        className="pb-40"
        data={movies || []}
        title="Trending Movies"
      />
      <SideBar isOpen={SideBarModal.isOpen} onClose={SideBarModal.onClose} />
    </>
  );
};

export default MoviesPage;
