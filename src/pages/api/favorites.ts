import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismdb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  try {
    const currentUser = await serverAuth(req, res);
    if (!currentUser) {
      throw new Error("not signed in");
    }
    const favoriteMovies = await prisma.movie.findMany({
      where: {
        id: {
          in: currentUser.user.favoriteMovies,
        },
      },
    });
    const favoriteSeries = await prisma.series.findMany({
      where: {
        id: {
          in: currentUser.user.favoriteSeries,
        },
      },
    });

    return res.status(200).json({ favoriteMovies, favoriteSeries });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error in getting favorites movies", error });
  }
}
