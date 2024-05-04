import SeriesList from "@/components/lists/SeriesList";
import CreateSeries from "@/components/modals/CreateSeries";
import SeriesInfoModal from "@/components/modals/SeriesInfoModal";
import SideBar from "@/components/sidebar/SideBar";
import CustomBillBoard from "@/components/ui/CustomBillBoard";
import Header from "@/components/ui/Header";
import useBillboard from "@/hooks/useBillboard";
import { useCreateSeriesModal } from "@/hooks/useCreateSeriesModal";
import useSeries from "@/hooks/useSeries";
import { useSeriesInfoModal } from "@/hooks/useSeriesInfoModal";
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
const SeriesPage = () => {
  const { billboard } = useBillboard({ type: "series" });
  const { series } = useSeries();
  const createSreisModal = useCreateSeriesModal();
  const { onOpen } = useSeriesInfoModal();
  const SideBarModal = useSideBar();

  return (
    <>
      <Header
        title="Series"
        callBack
        actions={[
          {
            icon: BiSidebar,
            id: 0,
            onClick: () => SideBarModal.onOpen(),
          },
          {
            id: 1,
            onClick: () => createSreisModal.onOpen(),
            icon: BiAddToQueue,
          },
        ]}
      />
      <CreateSeries />
      <SeriesInfoModal adminMode />
      <CustomBillBoard billboard={billboard} onOpen={onOpen} type="series" />
      <SideBar isOpen={SideBarModal.isOpen} onClose={SideBarModal.onClose} />
      <SeriesList className="pb-40" data={series || []} title="Trending Series" />
    </>
  );
};

export default SeriesPage;
