import { CalendarIcon } from "@heroicons/react/24/outline";
import { News } from "@prisma/client";
import {
  format,
  formatDistanceToNow,
  formatDistanceToNowStrict,
} from "date-fns";
import { isEmpty } from "lodash";
import Image from "next/image";
import React from "react";

const NewsBillboard = ({
  mainNews,
  subNews,
}: {
  mainNews: News | null;
  subNews: News[];
}) => {
  if (isEmpty(mainNews) || isEmpty(subNews)) {
    return null;
  }

  return (
    <section className="bg-transparent min-w-full flex flex-wrap gap-5 min-h-fit px-5 md:px-16 pt-20 pb-5">
      <div className="min-w-full lg:min-w-[65%] lg:max-w-[65%]     max-w-full flex items-center justify-center relative ">
        <div className="relative overflow-hidden aspect-auto drop-shadow-2xl rounded-lg min-w-full min-h-[300px] sm:min-h-[400px] md:min-h-[500px] max-w-full">
          <Image
            src={mainNews.coverImage}
            alt={mainNews.title}
            fill
            className="object-cover max-w-full rounded-lg"
          />
        </div>
        <div className="absolute top-[20%] left-[1%] rounded-lg bg-black bg-opacity-70 drop-shadow-2xl flex items-start justify-start flex-col p-3 capitalize text-white min-w-[98%] max-w-[98%] md:min-w-[400px] md:max-w-[400px] ">
          <div className="flex items-center justify-start gap-3">
            <Image
              src={mainNews.authorProfilePic}
              alt={mainNews.authorEmail}
              width={50}
              height={50}
              className="object-cover rounded-full overflow-hidden  z-10 relative ring-1 ring-red-700"
            />
            <div className="flex flex-col items-start justify-start bg-transparent">
              <h5 className="font-semibold capitalize text-white">
                {mainNews.authorName}
              </h5>
              <p className="text-[10px] text-slate-400 ">
                {mainNews.authorEmail}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-start gap-3 text-[12px] text-slate-300 py-3">
            {mainNews.updatedAt && (
              <span className="flex items-center gap-1">
                <CalendarIcon className="w-3 h-3" />
                updated {formatDistanceToNowStrict(mainNews.updatedAt)} ago
              </span>
            )}
            {!!mainNews.tags.length && (
              <div className="min-w-full uppercase flex flex-wrap items-start justify-start gap-2">
                {mainNews.tags.map((tag) => (
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
          <h1 className="text-[13px] md:text-2xl capitalize mb-2">
            {mainNews.title}
          </h1>
          <p className="text-[10px] md:text-[15px] text-slate-200">
            {mainNews.description}
          </p>
        </div>
      </div>
      <div className="min-w-full lg:min-w-[25%] lg:max-w-[25%] pt-28 sm:pt-24 lg:pt-0  min-h-[400px] flex flex-col gap-3">
        {subNews?.map((news) => {
          return (
            <article
              key={news.id}
              className="min-w-full flex flex-col sm:flex-row items-center lg:justify-between gap-5 sm:gap-2 text-white bg-transparent"
            >
              <Image
                width={100}
                height={100}
                className="object-cover rounded-lg drop-shadow-2xl min-w-full min-h-[150px] sm:min-w-[150px] sm:min-h-[150px]"
                src={news.coverImage}
                alt={news.title}
              />
              <div className=" min-w-full md:min-w-[70%] md:max-w-[70%] flex flex-col items-start justify-start gap-3 ">
                <h2 className="text-[15px] ">
                  {news.title.slice(0, 50) + "..."}
                </h2>
                <p className="text-[13px] text-slate-200 line-clamp-3 lg:line-clamp-2">
                  {news.description}
                </p>
                <div className="flex items-center gap-3">
                  {news.updatedAt && (
                    <span className="flex items-center gap-1 text-[10px]">
                      <CalendarIcon className="w-3 h-3" />
                      updated {formatDistanceToNowStrict(news.updatedAt)} ago
                    </span>
                  )}
                  {!!news.tags.length &&
                    news.tags.slice(0, 1).map((tag, i, tags) => (
                      <span
                        key={tag + i}
                        className="px-2 py-1 text-[10px] bg-red-700 text-white rounded-lg drop-shadow-2xl"
                      >
                        {tag}
                      </span>
                    ))}
                  {!!news.tags.length && news.tags.length > 2 && (
                    <span className="text-slate-300 text-[10px] capitalize">
                      {news.tags.length - 1} more..
                    </span>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default NewsBillboard;
