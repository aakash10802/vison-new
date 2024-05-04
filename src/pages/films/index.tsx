import MovieList from "@/components/lists/MovieList";
import InfoModal from "@/components/modals/InfoModal";
import ProfileModal from "@/components/modals/ProfileModal";
import Navbar from "@/components/navbar/Navbar";
import CustomBillBoard from "@/components/ui/CustomBillBoard";
import useBillboard from "@/hooks/useBillboard";
import { useInfoModal } from "@/hooks/useInfoModal";
import useMovies from "@/hooks/useMovies";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import React from "react";
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
  return (
    <>
      <Navbar />
      <InfoModal />
      <CustomBillBoard billboard={billboard} onOpen={onOpen} type="movie" />
      <MovieList className="pb-40" data={movies || []} title="Trending Movies" />
      <ProfileModal />
    </>
  );
};

export default MoviesPage;
