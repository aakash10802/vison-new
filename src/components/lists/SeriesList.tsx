import { series } from "@prisma/client";
import { isEmpty } from "lodash";
import React from "react";
import SeriesCard from "../cards/SeriesCard";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useCreateSeriesModal } from "@/hooks/useCreateSeriesModal";
import { twMerge } from "tailwind-merge";
import Loader from "../ui/Loader";

const SeriesList = ({
  data,
  title,
  className,
}: {
  className?: string;
  title?: string;
  data: series[];
}) => {
  const { onOpen } = useCreateSeriesModal();

  if (isEmpty(data)) {
    return <Loader message="Loading Series" />;
  }

  return (
    <section
      className={twMerge("px-4 md:px-12 mt-4 space-y-8 min-w-full", className)}
    >
      <p className="text-white text-base md:text-lg lg:text-2xl font-semibold mb-4  capitalize">
        {title}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {data.map((series) => {
          return <SeriesCard key={series.id} series={series} />;
        })}
      </div>
    </section>
  );
};

export default SeriesList;
