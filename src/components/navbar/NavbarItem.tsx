import { usePathname } from "next/navigation";
import React from "react";
import { twMerge } from "tailwind-merge";

const NavbarItem = ({
  label,
  onClick,
  className,
  href,
}: {
  href: string;
  label: string;
  onClick?: () => void;
  className?: string;
}) => {
  const pathName = usePathname();
  return (
    <div
      className={twMerge(
        "text-white relative duration-300 cursor-pointer capitalize group ",
        className,
        pathName.includes(href) && href !== "/" ? "text-red-500" : "",
        href === "/" && label === "Home" && pathName.endsWith("/")
          ? "text-red-500"
          : ""
      )}
      onClick={onClick}
    >
      {label}
      <hr
        className={twMerge(
          "transition-all w-0 group-hover:w-full absolute bottom-0 left-0 min-h-[3px] bg-red-700 border-red-700 ",
          pathName.includes(href) && href !== "/" ? "w-full" : "",
          href === "/" && label === "Home" && pathName.endsWith("/")
            ? "w-full"
            : ""
        )}
      />
    </div>
  );
};

export default NavbarItem;
