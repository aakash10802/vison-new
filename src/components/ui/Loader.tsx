import React from "react";
import { ClimbingBoxLoader } from "react-spinners";
const Loader = ({
  message,
  size = 20,
}: {
  size?: number;
  message?: string;
}) => {
  return (
    <div className="min-w-full max-w-full flex flex-col items-center   justify-center min-h-[400px] gap-5 text-white capitalize font-semibold   ">
      <ClimbingBoxLoader color="#a21616" size={size} />
      <p>{message}</p>
    </div>
  );
};

export default Loader;
