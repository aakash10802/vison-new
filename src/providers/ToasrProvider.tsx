import React from "react";
import { Toaster } from "react-hot-toast";

const ToasrProvider = () => {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        className: "bg-black text-white",
      }}
    />
  );
};

export default ToasrProvider;
