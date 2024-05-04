import { Movie, News, User, series } from "@prisma/client";
import Image from "next/image";
import React, { LegacyRef, useEffect, useRef, useState } from "react";
import blue from "@/public/images/default-blue.png";
import MovieList from "../lists/MovieList";
import SeriesList from "../lists/SeriesList";
import { twMerge } from "tailwind-merge";
import { BiEdit } from "react-icons/bi";
import { PiSignOut } from "react-icons/pi";
import { useProfileModal } from "@/hooks/useProfileModal";
import { signOut } from "next-auth/react";
import NewsList from "../lists/NewsList";

const ProfileCard = ({
  user,
  movies,
  series,
  news,
}: {
  news?: News[] | null;
  user: User;
  movies?: Movie[] | null;
  series?: series[] | null;
}) => {
  const profileModal = useProfileModal();

  const [height, setHeight] = useState(100);

  const ParentRef: LegacyRef<HTMLDivElement> | undefined = useRef(null);

  useEffect(() => {
    const dynanamicHeight = () => {
      if (ParentRef.current?.scrollHeight) {
        setHeight(+ParentRef.current?.scrollHeight || 500);
      }
    };
    if (ParentRef.current?.scrollHeight) {
      setHeight(+ParentRef.current?.scrollHeight || 500);
    }
    window.addEventListener("resize", dynanamicHeight);
    return () => {
      window.removeEventListener("resize", dynanamicHeight);
    };
  }, [ParentRef, window]);

  return (
    <div className="min-w-full flex-col items-start justify-start gap-3 p-5 ">
      <div className="min-w-full flex flex-wrap flex-row justify-start items-center gap-5  pb-5 md:p-0">
        <Image
          src={user.image || blue.src}
          alt={user.name}
          width={100}
          height={100}
          className="object-cover rounded-full overflow-hidden drop-shadow-2xl ring-1 ring-red-700"
        />
        <div className="w-fit flex flex-col items-start justify-start gap-1">
          <h4 className="text-white capitalize font-bold text-xl">
            @{user.name}
          </h4>
          <p className="capitalize text-slate-400">{user.email}</p>
        </div>
        <div className="flex gap-2 items-center">
          <button
            className="min-w-14 min-h-14 rounded-full border-[1px] border-white text-white hover:text-red-700 hover:border-red-700 transition-all flex items-center justify-center cursor-pointer"
            onClick={() => {
              profileModal.onOpen();
            }}
          >
            <BiEdit size={25} />
          </button>{" "}
          <button
            className="min-w-14 min-h-14 rounded-full border-[1px]  text-red-700  border-red-700 transition-all flex items-center justify-center cursor-pointer"
            onClick={() =>
              signOut({
                callbackUrl: "/auth",
              })
            }
          >
            <PiSignOut size={25} />
          </button>
        </div>
      </div>
      <div className="min-w-full min-h-fit max-h-fit flex flex-row md:ps-[45px] justify-start items-start gap-1 md:gap-5">
        <hr
          className={twMerge(
            "min-w-[1px] rounded-[3px] bg-red-900 border-red-900"
          )}
          style={{ minHeight: height }}
        />
        <div
          ref={ParentRef}
          className="min-h-fit h-fit min-w-full flex flex-col items-start justify-start gap-5 capitalize text-slate-300 font-semibold"
        >
          <MovieList data={movies || []} title="Your Favorites Movies" />
          <SeriesList data={series || []} title="Your Favorites Series" />
          <NewsList news={news || []} title="Your Favorite News" />
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
