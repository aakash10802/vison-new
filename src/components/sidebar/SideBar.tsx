import { usePathname } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { BiHome, BiMoviePlay, BiUser } from "react-icons/bi";
import { BsNewspaper } from "react-icons/bs";
import { FaUsersCog } from "react-icons/fa";
import { PiFilmReel } from "react-icons/pi";
import { NextRouter, useRouter } from "next/router";
import useUser from "@/hooks/useUser";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import useCurrentUser from "@/hooks/useCurrentUser";

export const sideBarLinks = [
  {
    icon: BiHome,
    label: "Home",
    onClick: (router: NextRouter) => router.push("/"),
  },
  {
    href: "/",
    icon: BiUser,
    label: "profile",
  },
  {
    label: "movies",
    href: "/movies",
    icon: BiMoviePlay,
  },
  {
    label: "series",
    href: "/series",
    icon: PiFilmReel,
  },
  {
    label: "users",
    href: "/users",
    icon: FaUsersCog,
  },
  {
    label: "news",
    href: "/news",
    icon: BsNewspaper,
  },
] as {
  label: string;
  href?: string;
  icon: any;
  onClick?: (router?: NextRouter) => void;
}[];

const SideBar = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const pathName = usePathname();
  const router = useRouter();
  const { user, isLoading } = useCurrentUser();
  const [visible, setVisible] = useState(isOpen);

  useEffect(() => {
    setVisible(isOpen);
  }, [isOpen]);

  const clickHandler = useCallback(
    (href: string) => {
      if (isLoading || !user) {
        toast.error("please wait!");
        return null;
      }
      if (!user.IsAdmin) {
        toast.error("unAuthorized");
        router.push("/");
      }
      router.push(`/admin${href}`);
      closeHnadler();
    },
    [user, isLoading]
  );

  const closeHnadler = useCallback(() => {
    if (isLoading) {
      return null;
    }
    setVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [isOpen, setVisible]);

  if (!isOpen) return null;
  return (
    <div className="fixed z-10 top-0 left-0 min-w-full min-h-full overflow-hidden">
      <div
        className={twMerge(
          visible ? "bg-opacity-70 bg-black" : "bg-opacity-0 bg-black",
          "absolute top-0 left-0 z-10 min-w-full min-h-full   transition-all"
        )}
        onClick={closeHnadler}
      ></div>
      <div
        className={twMerge(
          visible
            ? "translate-x-0 opacity-100"
            : "translate-x-[1000px] opacity-0",
          "z-20 absolute top-0 end-0 bg-zinc-800 text-white border-s border-red-700  min-w-[95%] sm:min-w-[70%] md:min-w-[50%] lg:min-w-[350px] max-w-[95%] sm:max-w-[70%] md:max-w-[50%] lg:max-w-[350px] overflow-x-hidden overflow-y-auto transition-all p-5 min-h-screen max-h-screen flex flex-col items-start justify-start gap-8"
        )}
      >
        <h3 className="text-2xl capitalize h-14 flex items-center justify-start md:h-fit">
          dashboard
        </h3>
        <button
          className="absolute end-5 top-5 w-14 h-14 rounded-full flex items-center justify-center border-[1px] border-white hover:border-red-700 hover:text-red-700 transition-all md:hidden"
          onClick={closeHnadler}
        >
          <IoClose size={20} />
        </button>
        <hr className="bg-zinc-800 min-w-full min-h-[1px] max-h-[1px] border-red-700" />
        <div className="min-w-full text-xl flex flex-col items-start justify-start gap-3 min-h-fit">
          {sideBarLinks.map(
            ({ onClick: linkOnClick, label, href, icon: Icon }, i) => {
              return (
                <div
                  key={i}
                  onClick={() => {
                    if (linkOnClick) {
                      linkOnClick(router);
                    } else if (href) {
                      clickHandler(href);
                    }
                  }}
                  className={twMerge(
                    pathName.includes(label) ? "text-red-700" : "",
                    "min-w-full cursor-pointer hover:text-red-700 transition-all flex items-center justify-between gap-3 capitalize  "
                  )}
                >
                  <span
                    className={twMerge(
                      pathName.includes(label) ? "text-red-700" : ""
                    )}
                  >
                    {label}
                  </span>
                  <Icon size={30} />
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
