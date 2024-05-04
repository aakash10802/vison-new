import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismdb";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      await serverAuth(req, res);
      const { movieId } = req.query as { movieId: string };
      if (!movieId || typeof movieId !== "string") {
        throw new Error("Invalid Id");
      }

      const movie = await prisma.movie.findUnique({
        where: {
          id: movieId,
        },
      });

      if (!movie) {
        throw new Error("Invalid Id");
      }
      return res.status(200).json(movie);
    }
    if (req.method === "DELETE") {
      const { user } = await serverAuth(req, res);
      if (!user) {
        throw new Error("not signed in!");
      }
      if (!user.IsAdmin) {
        return res.status(401).json({ message: "unAuthorized!" });
      }
      const { id } = req.body;

      if (!id || typeof id !== "string") {
        throw new Error("invalid Id!");
      }
      const deletedMovie = await prisma.movie.delete({
        where: {
          id,
        },
      });

      return res
        .status(200)
        .json({ message: "deleted successfully!", deletedMovie });
    }
    if (req.method === "PUT") {
      const { user } = await serverAuth(req, res);
      if (!user) {
        throw new Error("not signed in!");
      }
      if (!user.IsAdmin) {
        return res.status(401).json({ message: "unAuthorized!" });
      }
      const {
        title,
        description,
        videoUrl,
        thumbnailUrl,
        genre,
        duration,
        cast,
        id,
      } = req.body;

      if (
        !title ||
        !description ||
        !videoUrl ||
        !thumbnailUrl ||
        !genre ||
        !duration
      ) {
        return res.status(400).json({ message: "Missing Fields" });
      }

      const updatedMovie = await prisma.movie.update({
        where: {
          id,
        },
        data: {
          title: (title as string).toLowerCase(),
          description,
          videoUrl,
          thumbnailUrl,
          genre,
          duration,
          cast: !!cast ? cast : [],
        },
      });
      if (!updatedMovie) {
        throw new Error("Invalid Id");
      } else {
        return res.status(200).json({
          message: "movie updated successfully",
          updatedMovie,
        });
      }
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: `error in ${req.method} single movie`, error });
  }
}
