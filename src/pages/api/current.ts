import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";

import prisma from "@/libs/prismdb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "request not allowed" });
  }

  try {
    const currentuser = await serverAuth(req, res);

    if (!currentuser) {
      return res
        .status(404)
        .json({ message: "failed to get current user data" });
    }

    const favoriteMovies = await prisma.movie.findMany({
      where: {
        id: {
          in: currentuser.user.favoriteMovies,
        },
      },
    });
    const favoriteSeries = await prisma.series.findMany({
      where: {
        id: {
          in: currentuser.user.favoriteSeries,
        },
      },
    });

    return res
      .status(200)
      .json({
        message: "wellcome back",
        user: currentuser.user,
        movies: favoriteMovies,
        series: favoriteSeries,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error in getting current user data", error });
  }
}
