import useNewses from "@/hooks/useNewses";
import axios from "axios";
import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { BiTrash } from "react-icons/bi";
import { twMerge } from "tailwind-merge";

const DeleteNewsButton = ({ id }: { id: string }) => {
  const { mutate: mutateNews } = useNewses();
  const [isLoading, setLoading] = useState(false);
  const deleteHandler = useCallback(async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/news/${id}`).then((res) => {
        mutateNews();
        toast.success(res.data.message);
      });
    } catch (error: any) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  }, [id, mutateNews]);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        deleteHandler();
      }}
      className={twMerge(
        isLoading ? "animate-pulse" : "animate-none",
        "text-red-500 w-10 h-10 rounded-full bg-zinc-800 bg-opacity-80 flex items-center justify-center"
      )}
    >
      <BiTrash className="w-4 h-4" />
    </div>
  );
};

export default DeleteNewsButton;
