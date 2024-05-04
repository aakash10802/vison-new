import NewsList from "@/components/lists/NewsList";
import ProfileModal from "@/components/modals/ProfileModal";
import Navbar from "@/components/navbar/Navbar";
import NewsBillboard from "@/components/ui/NewsBillboard";
import useNewses from "@/hooks/useNewses";
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
const NewsPage = () => {
  const { news } = useNewses();

  return (
    <>
      <Navbar />
      <NewsBillboard mainNews={news[0] || null} subNews={news.slice(1, 4)} />
      <NewsList
        className="pt-[100px] px-5 md:px-10 pb-5 md:pb-10"
        news={news || []}
        title="recent News"
      />
      <ProfileModal />
    </>
  );
};

export default NewsPage;
