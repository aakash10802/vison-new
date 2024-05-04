import { useRouter } from "next/router";
import React from "react";
import { IoArrowBack } from "react-icons/io5";

const Header = ({
  title,
  callBack,
  actions,
}: {
  actions?: { icon: any; onClick: () => void; id: number }[];
  title: string;
  callBack?: boolean;
}) => {
  const router = useRouter();
  return (
    <div className="min-w-full flex flex-col md:flex-row items-center justify-between gap-5 text-white border-b-[1px] border-red-700 drop-shadow-2xl capitalize bg-zinc-800 p-5 px-10">
      <h1 className="font-bold capitalize text-start text-xl md:text-2xl lg:text-3xl  w-full md:w-fit">
        {title}
      </h1>
      <div className="w-full md:w-fit  flex flex-row-reverse md:flex-wrap items-center     justify-end gap-3">
        {actions?.map(({ icon: Icon, id, onClick }) => {
          return (
            <button
              className="w-14 h-14 rounded-full flex items-center justify-center text-white cursor-pointer transition-all hover:text-red-700 border-[1px] border-white hover:border-red-700"
              key={id}
              onClick={onClick}
            >
              <Icon size={25} />
            </button>
          );
        })}
        {callBack && (
          <button
            onClick={() => router.back()}
            className="w-14 h-14 rounded-full border-[1px] border-white text-white hover:text-red-700 hover:border-red-700 transition-all flex items-center justify-center"
          >
            <IoArrowBack size={25} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
