import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Navbar from "@/components/navbar/Navbar";
import Billboard from "@/components/ui/Billboard";
import MovieList from "@/components/lists/MovieList";
import useMovies from "@/hooks/useMovies";
import InfoModal from "@/components/modals/InfoModal";
import ProfileModal from "@/components/modals/ProfileModal";
import useSeries from "@/hooks/useSeries";
import SeriesList from "@/components/lists/SeriesList";
import SeriesInfoModal from "@/components/modals/SeriesInfoModal";
import useNewses from "@/hooks/useNewses";
import NewsList from "@/components/lists/NewsList";

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

export default function Home() {
  const { movies } = useMovies();
  const { series } = useSeries();
  const { news } = useNewses();
  return (
    <>
      <InfoModal />
      <ProfileModal />
      <SeriesInfoModal />
      <Navbar />
      <Billboard />
      <MovieList data={movies || []} title="Trending Movies" />
      <SeriesList className="pb-10" data={series || []} title="Trending Series" />
      <NewsList className="pb-40 px-4 md:px-12 " news={news || []} title="Recent news" />
    </>
  );
}
