import { News } from "@prisma/client";
import Image from "next/image";
import React from "react";
import NewsLikeButton from "../inputs/NewsLikeButton";
import DeleteNewsButton from "../inputs/DeleteNewsButton";
import { FaEdit } from "react-icons/fa";
import { useCreateNews } from "@/hooks/useCreateNews";
import { useNewsInfoModal } from "@/hooks/useNewsInfoModal";
import { twMerge } from "tailwind-merge";
import { IoMdClose } from "react-icons/io";
import { formatDistanceToNowStrict } from "date-fns";
import { CalendarIcon } from "@heroicons/react/24/outline";

const NewsCard = ({
  news,
  adminMode = false,
}: {
  adminMode?: boolean;
  news: News;
}) => {
  const createNewsModal = useCreateNews();
  const newsInfo = useNewsInfoModal();

  return (
    <div
      className={twMerge(
        newsInfo.id === news.id
          ? "fixed top-0 left-0 min-w-full min-h-screen z-50 flex items-center justify-center"
          : "relative",
        "transition-all"
      )}
    >
      {news.id === newsInfo.id && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            newsInfo.onClose();
          }}
          className="absolute z-0 min-w-full min-h-full top-0 left-0 bg-black bg-opacity-60  transition-all duration-300"
        ></div>
      )}
      <article
        onClick={(e) => {
          e.stopPropagation();
          newsInfo.onOpen(news.id);
        }}
        className={twMerge(
          " col-span max-w-full overflow-hidden rounded-lg flex flex-col items-start justify-start  transition-all",
          newsInfo.id === news.id
            ? "w-full md:w-[500px] h-screen md:h-[70vh] absolute bg-zinc-800"
            : "group cursor-pointer relative  "
        )}
      >
        <div
          className={twMerge(
            "min-w-full z-0  overflow-hidden max-w-full  transition-all cursor-pointer ",
            news.id === newsInfo.id
              ? "min-h-[250px]"
              : "min-h-[150px] md:min-h-[150px] md:max-h-[150px]"
          )}
        >
          <div className="flex items-center gap-1 absolute top-2 z-10 end-2">
            <NewsLikeButton newsId={news.id} />
            {adminMode && (
              <>
                <DeleteNewsButton id={news.id} />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    createNewsModal.onOpen({
                      id: news.id,
                      type: "update",
                    });
                  }}
                  className="text-yellow-400 w-10 h-10 rounded-full bg-zinc-800 bg-opacity-80 flex items-center justify-center"
                >
                  <FaEdit />
                </button>
              </>
            )}
            {news.id === newsInfo.id && (
              <button
                onClick={(e) => {
                  newsInfo.onClose();
                  e.stopPropagation();
                }}
                className="bg-zinc-800 bg-opacity-80 text-white w-10 h-10 rounded-full flex items-center justify-center"
              >
                <IoMdClose />
              </button>
            )}
          </div>
          <div
            className={twMerge(
              "relative min-w-[100%] max-w-full overflow-hidden transition-all ",
              news.id === newsInfo.id
                ? "min-h-[250px]"
                : "min-h-[200px] md:min-h-[150px] md:max-h-[150px] opacity-50 group-hover:scale-110 group-hover:opacity-100"
            )}
          >
            <Image
              fill
              src={news.coverImage}
              alt={news.title}
              className="      object-cover"
            />
          </div>
        </div>
        <div className="relative min-w-full min-h-[80px] p-2 bg-zinc-800 rounded-b-lg drop-shadow-2xl flex justify-end items-end border-t-[1px] border-red-700">
          <div className="absolute left-2 top-[-25px] flex items-center justify-start gap-3">
            <Image
              src={news.authorProfilePic}
              alt={news.authorEmail}
              width={50}
              height={50}
              className="object-cover rounded-full overflow-hidden  z-10 relative ring-1 ring-red-700"
            />
            <div className="flex flex-col items-start justify-start bg-transparent">
              <h5 className="font-semibold capitalize text-white">
                {news.authorName}
              </h5>
              <p className="text-[10px] text-slate-400 ">{news.authorEmail}</p>
            </div>
          </div>
          <h3 className="text-white text-sm capitalize text-left text-wrap min-w-full   transition-all">
            {news.title.slice(0, 50) + "..."}
            <hr className="w-0 group-hover:w-full transition-all min-h-[3px] max-h-[3px] border-none bg-red-900" />
          </h3>
        </div>
        {news.id === newsInfo.id && (
          <div className="min-w-full max-w-[400px] overflow-auto flex flex-col p-2">
            <p className="text-[14px] text-slate-200 capitalize ">
              {news.description}
            </p>
            <div>
              <div className="min-w-full flex flex-wrap items-center justify-start gap-3 text-[12px] text-slate-300 py-3">
                {news.updatedAt && (
                  <span className="flex items-center gap-1">
                    <CalendarIcon className="w-3 h-3" />
                    updated {formatDistanceToNowStrict(news.updatedAt)} ago
                  </span>
                )}
                {!!news.tags.length && (
                  <div className="  uppercase w-fit max-w-[70%] flex flex-wrap items-start justify-start gap-2">
                    {news.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded-lg drop-shadow-2xl text-[13px] bg-red-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </article>
    </div>
  );
};

export default NewsCard;
