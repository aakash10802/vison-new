import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismdb";
import serverAuth from "@/libs/serverAuth";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "request not allowed" });
  }

  try {
    await serverAuth(req, res);
    const display = req.url as string;

    const moviesCount = await prisma.movie.count();
    const seriesCount = await prisma.series.count();
    const randomMovieIndex = Math.floor(Math.random() * moviesCount);
    const randomSeriesIndex = Math.floor(Math.random() * seriesCount);
    const randomMovies = await prisma.movie.findMany({
      take: 1,
      skip: randomMovieIndex,
    });
    const randomSeries = await prisma.series.findMany({
      take: 1,
      skip: randomSeriesIndex,
    });

    if (display.includes("movie")) {
      return res.status(200).json({ ...randomMovies[0], type: "movie" });
    }
    if (display.includes("series")) {
      return res.status(200).json({ ...randomSeries[0], type: "series" });
    }

    return res
      .status(200)
      .json(
        !!(Math.random() > 0.5)
          ? { ...randomMovies[0], type: "movie" }
          : { ...randomSeries[0], type: "series" }
      );
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error in getting random data", error });
  }
}