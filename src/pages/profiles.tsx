import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import React, { useCallback } from "react";
import blue from "@/public/images/default-blue.png";
import red from "@/public/images/default-red.png";
import green from "@/public/images/default-green.png";
import slate from "@/public/images/default-slate.png";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/router";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
export const getServerSideProps = async (ctx: any) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
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

const images = [blue.src, red.src, green.src, slate.src];

const UserCard = ({ name }: { name: string }) => {
  const imgSrc = images[Math.floor(Math.random() * 4)];

  return (
    <div className="group flex-row w-44 mx-auto">
      <div className="w-44 h-44 relative rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
        <Image
          draggable={false}
          className="w-max h-max object-contain"
          src={imgSrc}
          alt=""
          fill
          priority
        />
      </div>
      <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
        {name}
      </div>
    </div>
  );
};

const Profiles = () => {
  const router = useRouter();
  const { user } = useCurrentUser();

  const selectProfile = useCallback(() => {
    router.push("/");
  }, [router]);
  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center">
          Who&#39;s watching?
        </h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <div onClick={() => selectProfile()}>
            <UserCard name={user?.name} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profiles;
