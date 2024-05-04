import Image from "next/image";
import React from "react";
import logo from "@/public/images/logo.png";
import RegisterForm from "@/components/forms/RegisterForm";
const Auth = () => {
  return (
    <div
      className={`relative h-full w-full bg-[url("./../../public/images/hero.jpg")] bg-no-repeat bg-center bg-fixed bg-cover`}
    >
      <div className="bg-black w-full h-full lg:bg-opacity-50 ">
        <nav className="px-12 py-5">
          <Image
            alt="logo"
            src={logo.src}
            priority
            height={48}
            width={200}
            className="h-12"
          />
        </nav>
        <div className="flex justify-center ">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default Auth;
