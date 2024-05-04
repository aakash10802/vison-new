import { News } from "@prisma/client";
import React from "react";
import NewsCard from "../cards/NewsCard";
import { twMerge } from "tailwind-merge";
import { isEmpty } from "lodash";
import Loader from "../ui/Loader";

const NewsList = ({
  news = [],
  title,
  className,
  adminMode = false,
}: {
  adminMode?: boolean;
  className?: string;
  news: News[];
  title: string;
}) => {
  if (isEmpty(news)) {
    return <Loader message="Loading News" />;
  }

  return (
    <section
      className={twMerge(
        "min-w-full flex flex-col items-start justify-start gap-5 capitalize text-white",
        className ? className : "p-5 md:p-10"
      )}
    >
      <p className="text-white text-base md:text-lg lg:text-2xl font-semibold mb-4  capitalize">
        {title}
      </p>
      <div className="min-w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5">
        {news.map((n) => (
          <NewsCard adminMode={adminMode} key={n.id} news={n} />
        ))}
      </div>
    </section>
  );
};

export default NewsList;
