import React, { ReactNode } from "react";
import NavbarItem from "../navbar/NavbarItem";
import { twMerge } from "tailwind-merge";

const Menu = ({
  visible = false,
  setClose,
  children,
  className,
}: {
  className?: string;
  children: ReactNode;
  setClose: () => void;
  visible?: boolean;
}) => {
  if (!visible) return null;
  return (
    <div
      onMouseLeave={setClose}
      className={twMerge(
        className
          ? className
          : "bg-black w-56 absolute top-8 left-0 py-5 flex-col border-2 border-gray-800 flex"
      )}
    >
      {children}
    </div>
  );
};

export default Menu;
