import ProfileCard from "@/components/cards/ProfileCard";
import InfoModal from "@/components/modals/InfoModal";
import ProfileModal from "@/components/modals/ProfileModal";
import SeriesInfoModal from "@/components/modals/SeriesInfoModal";
import SideBar from "@/components/sidebar/SideBar";
import Header from "@/components/ui/Header";
import Loader from "@/components/ui/Loader";
import useCurrentUser from "@/hooks/useCurrentUser";
import useNewses from "@/hooks/useNewses";
import { useSideBar } from "@/hooks/useSideBar";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import React from "react";
import { BiSidebar } from "react-icons/bi";
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
const UserAdminPage = () => {
  const { isOpen, onOpen, onClose } = useSideBar();
  const { favoritesNews } = useNewses();
  const { user, isLoading, movies, series } = useCurrentUser();
  if (isLoading || !user) return <Loader message="loading your data" />;
  return (
    <>
      <div className="text-white   flex flex-col items-start justify-start gap-10">
        <Header
          title={`wellcome ${user?.name}`}
          actions={[
            {
              icon: BiSidebar,
              onClick: () => onOpen(),
              id: 0,
            },
          ]}
          callBack
        />
        <ProfileCard
          user={user}
          movies={movies}
          series={series}
          news={favoritesNews}
        />
      </div>
      <SideBar isOpen={isOpen} onClose={onClose} />
      <ProfileModal />
      <InfoModal />
      <SeriesInfoModal />
    </>
  );
};

export default UserAdminPage;
