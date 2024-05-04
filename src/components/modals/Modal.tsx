import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { ReactNode, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

const Modal = ({
  children,
  isVisible,
  onClose,
  disable = false,
}: {
  disable?: boolean;
  onClose: () => void;
  isVisible: boolean;
  children: ReactNode;
}) => {
  const [visible, setVisible] = useState<boolean>(!!isVisible);

  useEffect(() => {
    setVisible(!!isVisible);
  }, [isVisible]);

  const handleClose = useCallback(() => {
    if (disable) {
      toast.error("please wait!");
      return null;
    }
    setVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="z-50 transition duration-300 bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0">
      <div className="relative w-auto mx-auto max-w-3xl rounded-md overflow-hidden">
        <div
          className={`${
            visible
              ? "translate-y-0 md:translate-y-0 md:scale-100"
              : " translate-y-[900px] md:translate-y-0 md:scale-0"
          } transform    transition-all duration-300 relative flex-auto bg-zinc-900 drop-shadow-md`}
        >
          <div className="min-w-full h-screen max-h-screen overflow-auto md:w-fit md:h-fit relative flex flex-col items-start justify-start gap-2">
            <div
              onClick={handleClose}
              className="cursor-pointer z-20 absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center"
            >
              <XMarkIcon className="text-white w-6" />
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
