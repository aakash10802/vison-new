import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismdb";

import { without } from "lodash";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { user } = await serverAuth(req, res);

      const { id, type } = req.body;
      if (type === "movie") {
        const existingMovie = await prisma.movie.findUnique({
          where: {
            id,
          },
        });

        if (!existingMovie) {
          throw new Error("Invalid ID");
        }

        const updatedUser = await prisma.user.update({
          where: {
            email: user.email || "",
          },
          data: {
            favoriteMovies: {
              push: id,
            },
          },
        });

        return res
          .status(200)
          .json({ message: "thanks for your like", user: updatedUser });
      }
      if (type === "series") {
        const existingSeries = await prisma.series.findUnique({
          where: {
            id,
          },
        });

        if (!existingSeries) {
          throw new Error("Invalid ID");
        }

        const updatedUser = await prisma.user.update({
          where: {
            email: user.email || "",
          },
          data: {
            favoriteSeries: {
              push: id,
            },
          },
        });

        return res
          .status(200)
          .json({ message: "thanks for your like", user: updatedUser });
      }
      if (type === "news") {
        const existingNews = await prisma.news.findUnique({
          where: {
            id,
          },
        });

        if (!existingNews) {
          throw new Error("Invalid ID");
        }

        const updatedUser = await prisma.user.update({
          where: {
            email: user.email || "",
          },
          data: {
            favoriteNews: {
              push: id,
            },
          },
        });

        return res
          .status(200)
          .json({ message: "thanks for your like", user: updatedUser });
      }
    }

    if (req.method === "DELETE") {
      const { user } = await serverAuth(req, res);
      const { id, type } = req.body;

      if (type === "movie") {
        const existingMovie = await prisma.movie.findUnique({
          where: {
            id,
          },
        });

        if (!existingMovie) {
          throw new Error("Invalid ID");
        }

        const updatedFavoriteMovies = without(user.favoriteMovies, id);

        const updatedUser = await prisma.user.update({
          where: {
            email: user.email || "",
          },
          data: {
            favoriteMovies: updatedFavoriteMovies,
          },
        });

        return res
          .status(200)
          .json({ message: "Disliked!", user: updatedUser });
      }

      if (type === "series") {
        const existingSeries = await prisma.series.findUnique({
          where: {
            id,
          },
        });

        if (!existingSeries) {
          throw new Error("Invalid ID");
        }

        const updatedFavoriteMovies = without(user.favoriteSeries, id);

        const updatedUser = await prisma.user.update({
          where: {
            email: user.email || "",
          },
          data: {
            favoriteSeries: updatedFavoriteMovies,
          },
        });

        return res
          .status(200)
          .json({ message: "Disliked!", user: updatedUser });
      }
      if (type === "news") {
        const existingNews = await prisma.news.findUnique({
          where: {
            id,
          },
        });

        if (!existingNews) {
          throw new Error("Invalid ID");
        }

        const updatedFavoriteNews = without(user.favoriteNews, id);

        const updatedUser = await prisma.user.update({
          where: {
            email: user.email || "",
          },
          data: {
            favoriteNews: updatedFavoriteNews,
          },
        });

        return res
          .status(200)
          .json({ message: "Disliked!", user: updatedUser });
      }
    }

    return res.status(405).end();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error in getting favorites movies", error });
  }
}
