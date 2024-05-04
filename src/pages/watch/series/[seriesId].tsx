import useSingleSeries from "@/hooks/useSingleSeries";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
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
const SeriesSinglePage = () => {
  const router = useRouter();
  const { seriesId } = router.query;
  const { series } = useSingleSeries(seriesId as string);

  return (
    <div className="h-screen w-screen bg-black">
      <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
        <ArrowLeftIcon
          onClick={() => router.push("/")}
          className="w-4 md:w-10 text-white cursor-pointer hover:opacity-80 transition"
        />
        <p className="text-white text-1xl md:text-3xl font-bold">
          <span className="font-light">Watching:</span> {series?.title}
        </p>
      </nav>
      <video
        className="h-full w-full"
        autoPlay
        poster={series?.thumbnailUrl}
        controls
        src={series?.videoUrl}
      ></video>
    </div>
  );
};

export default SeriesSinglePage;
