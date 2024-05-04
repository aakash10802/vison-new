import NewsList from "@/components/lists/NewsList";
import CreateNews from "@/components/modals/CreateNews";
import SideBar from "@/components/sidebar/SideBar";
import Header from "@/components/ui/Header";
import { useCreateNews } from "@/hooks/useCreateNews";
import useNewses from "@/hooks/useNewses";
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
const NewsAdminPage = () => {
  const SideBarModal = useSideBar();
  const createNewsModal = useCreateNews();
  const { news } = useNewses();
  return (
    <>
      <Header
        title="News"
        callBack
        actions={[
          {
            icon: BiSidebar,
            id: 0,
            onClick: () => SideBarModal.onOpen(),
          },
          {
            icon: BiAddToQueue,
            id: 1,
            onClick: () =>
              createNewsModal.onOpen({ id: undefined, type: "create" }),
          },
        ]}
      />
      <NewsList
        adminMode
        className="pt-[100px] px-5 md:px-10 pb-5 md:pb-10"
        news={news || []}
        title="recent News"
      />
      <SideBar isOpen={SideBarModal.isOpen} onClose={SideBarModal.onClose} />
      <CreateNews />
    </>
  );
};

export default NewsAdminPage;
