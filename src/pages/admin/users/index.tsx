import AdminsList from "@/components/lists/AdminsList";
import UsersList from "@/components/lists/UsersList";
import CreateUserModal from "@/components/modals/CreateUserModal";
import SideBar from "@/components/sidebar/SideBar";
import Header from "@/components/ui/Header";
import { useCreateUserModal } from "@/hooks/useCteateUser";
import { useSideBar } from "@/hooks/useSideBar";
import useUsers from "@/hooks/useUsers";
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
const UsersPage = () => {
  const { data } = useUsers();
  const SideBarModal = useSideBar();
  const { onOpen } = useCreateUserModal();

  return (
    <div className="min-w-full flex items-start justify-start gap-5 flex-col">
      <Header
        title="Users and Admins Page"
        callBack
        actions={[
          {
            icon: BiSidebar,
            id: 0,
            onClick: () => SideBarModal.onOpen(),
          },
          {
            onClick: () =>
              onOpen({
                id: undefined,
                type: "create",
              }),
            icon: BiAddToQueue,
            id: 2,
          },
        ]}
      />
      <UsersList data={data?.users || []} title="Users list" />
      <AdminsList admins={data?.admins || []} title="Admins list" />
      <SideBar isOpen={SideBarModal.isOpen} onClose={SideBarModal.onClose} />
      <CreateUserModal />
    </div>
  );
};

export default UsersPage;
