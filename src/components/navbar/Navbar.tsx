import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";

import NavbarItem from "./NavbarItem";
import Menu from "../ui/Menu";

import useCurrentUser from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";

import { twMerge } from "tailwind-merge";
import logo from "@/public/images/logo.png";
import blue from "@/public/images/default-blue.png";
import { IoLogOut } from "react-icons/io5";
import { BsBell, BsChevronDown, BsSearch } from "react-icons/bs";
import { useProfileModal } from "@/hooks/useProfileModal";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { BiNotification } from "react-icons/bi";

const TOP_OFFSET = 66;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Series", href: "/series" },
  { label: "Films", href: "/films" },
  { label: "News & Popular", href: "/news" },
  { label: "My List", href: "/favorites" },
];

const Navbar = () => {
  const router = useRouter();

  const { user } = useCurrentUser();
  const profileModal = useProfileModal();

  const [showBg, setShowBg] = useState(false);
  const [displayNavbarMenu, setDisplayNavbarMenu] = useState(false);
  const [displayAccountMenu, setDisplayAccountMenu] = useState(false);

  const toggleNavbartMenu = useCallback(() => {
    setDisplayNavbarMenu((prev) => !prev);
  }, [displayNavbarMenu, setDisplayNavbarMenu]);

  const toggleAccountMenu = useCallback(() => {
    setDisplayAccountMenu((prev) => !prev);
  }, [displayAccountMenu, setDisplayAccountMenu]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        return setShowBg(true);
      } else {
        setShowBg(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="w-full fixed z-40 ">
      <div
        className={twMerge(
          "px-4 md:px-16 flex items-center transition py-6 flex-row duration-500 ",
          showBg ? "bg-opacity-90 bg-zinc-900" : "bg-transparent"
        )}
      >
        <div className="relative aspect-video p-0 m-0 overflow-hidden w-[70px] lg:w-[100px] h-4 lg:h-7">
          <Image src={logo.src} alt="logo" fill />
        </div>
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          {navLinks.map((link) => {
            return (
              <NavbarItem
                key={link.href}
                href={link.href}
                label={link.label}
                onClick={() => router.push(link.href)}
              />
            );
          })}
        </div>
        <div
          onClick={toggleNavbartMenu}
          className="lg:hidden flex flex-row items-center gap-2 cursor-pointer relative ml-8 "
        >
          <p className="text-white text-sm">Browse</p>
          <BsChevronDown
            size={14}
            className={twMerge(
              `text-white transition-all`,
              displayNavbarMenu ? "rotate-180" : "rotate-0 "
            )}
          />
          <Menu
            visible={displayNavbarMenu}
            setClose={() => setDisplayNavbarMenu(false)}
          >
            <div className="flex flex-col gap-4 items-center justify-center">
              {navLinks.map((link) => {
                return (
                  <NavbarItem
                    key={link.href}
                    href={link.href}
                    label={link.label}
                    className="capitalize w-fit px-3 text-center text-white   "
                    onClick={() => router.push(link.href)}
                  />
                );
              })}
            </div>
          </Menu>
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div
            onClick={() => toast.success("Search Working Successfully")}
            className="text-gray-200  hover:text-gray-300 cursor-pointer transition-all"
          >
            <BsSearch size={14} />
          </div>{" "}
          <div
            // onClick={() => toast.error("comming soon")}
            className="text-gray-200 hover:text-gray-300 cursor-pointer transition-all"
          >
            <BsBell size={14} />
          </div>
          <div
            onClick={toggleAccountMenu}
            className="flex flex-row items-center gap-2 cursor-pointer relative"
          >
            <div className="min-w-10 min-h-10 max-w-10 max-h-10 lg:w-10 lg:h-10 rounded-md overflow-hidden ">
              <Image
                className="object-contain  max-w-fit rounded-md"
                src={user?.image || blue.src}
                alt=""
                fill
              />
            </div>
            <BsChevronDown
              className={twMerge(
                `text-white transition-all`,
                displayAccountMenu ? "rotate-180" : "rotate-0 "
              )}
            />
            <Menu
              className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex"
              visible={displayAccountMenu}
              setClose={() => setDisplayAccountMenu(false)}
            >
              <div className="flex flex-col gap-3">
                <div
                  onClick={() => profileModal.onOpen()}
                  className="px-3 group/item flex flex-row gap-3 items-center w-full"
                >
                  <Image
                    width={32}
                    height={32}
                    className="w-8 rounded-md"
                    src={user?.image || blue.src}
                    alt=""
                  />
                  <p className="text-white text-sm group-hover/item:underline font-bold capitalize">
                    {user?.name}
                  </p>
                </div>
              </div>
              <hr className="bg-gray-600 border-0 h-px my-4" />
              {user?.IsAdmin && (
                <>
                  <div
                    onClick={() => router.push(`/admin`)}
                    className="flex gap-y-3 capitalize items-center justify-start text-white px-3 hover:underline"
                  >
                    admin Dashboard
                  </div>
                  <hr className="bg-gray-600 border-0 h-px my-4" />
                </>
              )}
              <div
                onClick={() => signOut()}
                className="px-3 text-center text-white text-sm hover:underline  flex items-center justify-between gap-3"
              >
                Sign out of Vision.io
                <IoLogOut size={25} className="text-red-600" />
              </div>
            </Menu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
