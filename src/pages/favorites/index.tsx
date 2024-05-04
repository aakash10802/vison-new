import MovieList from "@/components/lists/MovieList";
import NewsList from "@/components/lists/NewsList";
import SeriesList from "@/components/lists/SeriesList";
import InfoModal from "@/components/modals/InfoModal";
import ProfileModal from "@/components/modals/ProfileModal";
import SeriesInfoModal from "@/components/modals/SeriesInfoModal";
import Navbar from "@/components/navbar/Navbar";
import Billboard from "@/components/ui/Billboard";
import useFavorites from "@/hooks/useFavorites";
import useNewses from "@/hooks/useNewses";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import React from "react";
import { twMerge } from "tailwind-merge";
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
const Favorites = () => {
  const { favorites } = useFavorites();
  const { favoritesNews } = useNewses();
  return (
    <>
      <Navbar />
      <Billboard />

      <MovieList
        data={favorites?.favoriteMovies || []}
        title="Favorite movies"
      />
      <SeriesList
        data={favorites?.favoriteSeries || []}
        title="Favorite series"
        className={twMerge(!!!favoritesNews  ? "pb-40":"pb-5")}
      />
      <NewsList
        className="pb-10 px-4 md:px-12"
        news={favoritesNews || []}
        title="Favorites news"
      />
      <ProfileModal />
      <InfoModal />
      <SeriesInfoModal />
    </>
  );
};

export default Favorites;
