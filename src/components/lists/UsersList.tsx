import { Admin, User } from "@prisma/client";
import Image from "next/image";
import React from "react";
import blue from "@/public/images/default-blue.png";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoNotificationsOffOutline } from "react-icons/io5";
import { twMerge } from "tailwind-merge";
import { useCreateUserModal } from "@/hooks/useCteateUser";
import { BiAddToQueue } from "react-icons/bi";
import Loader from "../ui/Loader";

const UsersList = ({ data = [], title }: { data: User[]; title: string }) => {
  const { onOpen } = useCreateUserModal();

  return (
    <section className="px-4 md:px-12 mt-4 space-y-8  pb-40  min-w-full flex flex-col items-start justify-start max-w-full overflow-hidden">
      <p className="min-w-full text-white text-base md:text-lg lg:text-2xl font-semibold mb-4  capitalize flex items-center justify-between">
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
        {data.length > 0 ? (
          data.map((user) => {
            return (
              <div
                key={user.id}
                className="min-w-[900px] md:min-w-full flex items-center justify-start gap-3 bg-zinc-800 text-white capitalize font-semibold [&>span]:min-w-[20%] p-5 text-lg drop-shadow-2xl hover:border-red-700 border-[1px] [&>span]:max-w-[20%] [&>span]:overflow-hidden border-transparent transition-all cursor-pointer"
                onClick={() => onOpen({ id: user.id, type: "update" })}
              >
                <span className="flex items-center gap-2  capitalize text-white">
                  <Image
                    src={user.image || blue.src}
                    alt={user.name}
                    width={30}
                    height={30}
                    className="rounded-full drop-shadow-2xl object-cover max-w-[30px] max-h-[30px]"
                  />
                  @
                  {user.name.length > 50
                    ? user.name.slice(0, 50) + "..."
                    : user.name}
                </span>
                <span>
                  {" "}
                  {user.email
                    ? user.email.length > 50
                      ? user.email.slice(0, 50) + "..."
                      : user.email
                    : "no verfied email"}
                </span>
                <span className="flex items-center justify-center ">
                  {user.hasNotification ? (
                    <IoIosNotificationsOutline />
                  ) : (
                    <IoNotificationsOffOutline />
                  )}
                </span>
                <span className="">
                  {" "}
                  {user.id.length > 50 ? user.id.slice(0, 50) + "..." : user.id}
                </span>
                <span
                  className={twMerge(
                    user.role === "OWNER"
                      ? "text-red-500"
                      : user.role === "ADMIN"
                      ? "text-green-500"
                      : "text-white",
                    "capitalize text-center"
                  )}
                >
                  {user.role === "OWNER"
                    ? "owner"
                    : user.role === "ADMIN"
                    ? "admin"
                    : "user"}
                </span>
              </div>
            );
          })
        ) : (
          <Loader message="Loading Users" />
        )}
      </div>
    </section>
  );
};

export default UsersList;
