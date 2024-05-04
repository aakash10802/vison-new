import { Admin, User } from "@prisma/client";
import Image from "next/image";
import React from "react";
import blue from "@/public/images/default-blue.png";
import { useCreateUserModal } from "@/hooks/useCteateUser";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoNotificationsOffOutline } from "react-icons/io5";
import { twMerge } from "tailwind-merge";
import Loader from "../ui/Loader";

export type AdminType = Admin & { user: User };

const AdminsList = ({
  admins = [],
  title,
}: {
  title: string;
  admins: AdminType[];
}) => {
  const { onOpen } = useCreateUserModal();

  return (
    <section className="px-4 md:px-12 mt-4 space-y-8  pb-40  min-w-full flex flex-col items-start justify-start max-w-full overflow-hidden">
      <p className="text-white text-base md:text-lg lg:text-2xl font-semibold mb-4  capitalize">
        {title}
      </p>
      <div className="flex flex-col items-start justify-start gap-2 min-w-full max-w-full overflow-auto  ">
        <div className="min-w-[900px] md:min-w-full flex items-center justify-start gap-3 bg-zinc-800 text-white capitalize font-semibold [&>span]:min-w-[20%] p-5 text-lg">
          <span>Profile</span>
          <span>email</span>
          <span className="text-center">notification</span>
          <span>id</span>
          <span className="text-center">role</span>
        </div>
        {admins.length > 0 ? (
          admins.map((admin) => {
            return (
              <div
                key={admin.userId}
                className="min-w-[900px] md:min-w-full flex items-center justify-start gap-3 bg-zinc-800 text-white capitalize font-semibold [&>span]:min-w-[20%] p-5 text-lg drop-shadow-2xl hover:border-red-700 border-[1px] [&>span]:max-w-[20%] [&>span]:overflow-hidden border-transparent transition-all cursor-pointer"
                onClick={() => onOpen({ id: admin.userId, type: "update" })}
              >
                <span className="flex items-center gap-2  capitalize text-white">
                  <Image
                    src={admin?.user.image || blue.src}
                    alt={admin?.user.name}
                    width={30}
                    height={30}
                    className="rounded-full drop-shadow-2xl object-cover max-w-[30px] max-h-[30px]"
                  />
                  @
                  {admin?.user.name.length > 50
                    ? admin?.user.name.slice(0, 50) + "..."
                    : admin?.user.name}
                </span>
                <span>
                  {" "}
                  {admin?.user.email
                    ? admin?.user.email.length > 50
                      ? admin?.user.email.slice(0, 50) + "..."
                      : admin?.user.email
                    : "no verfied email"}
                </span>
                <span className="flex items-center justify-center ">
                  {admin?.user.hasNotification ? (
                    <IoIosNotificationsOutline />
                  ) : (
                    <IoNotificationsOffOutline />
                  )}
                </span>
                <span className="">
                  {" "}
                  {admin?.user.id.length > 50
                    ? admin?.user.id.slice(0, 50) + "..."
                    : admin?.user.id}
                </span>
                <span
                  className={twMerge(
                    admin.user.role === "OWNER"
                      ? "text-red-500"
                      : admin.user.role === "ADMIN"
                      ? "text-green-500"
                      : "text-white",
                    "capitalize text-center"
                  )}
                >
                  {admin.user.role === "OWNER"
                    ? "owner"
                    : admin.user.role === "ADMIN"
                    ? "admin"
                    : "user"}
                </span>
              </div>
            );
          })
        ) : (
          <Loader message="no data" />
        )}
      </div>
    </section>
  );
};

export default AdminsList;
