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
      const { seriesId } = req.query as { seriesId: string };
      if (!seriesId || typeof seriesId !== "string") {
        throw new Error("Invalid Id");
      }

      const series = await prisma.series.findUnique({
        where: {
          id: seriesId,
        },
      });

      if (!series) {
        throw new Error("Invalid Id");
      }
      return res.status(200).json(series);
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
      const deletedSeries = await prisma.series.delete({
        where: {
          id,
        },
      });

      return res
        .status(200)
        .json({ message: "deleted successfully!", deletedSeries });
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
        seasons,
        epizodes,
        cast,
        id,
      } = req.body;

      if (
        !title ||
        !description ||
        !videoUrl ||
        !thumbnailUrl ||
        !genre ||
        !duration ||
        !seasons ||
        !epizodes
      ) {
        return res
          .status(400)
          .json({ message: "Missing Fields", data: req.body });
      }

      const updatedMovie = await prisma.series.update({
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
          epizodes: +epizodes,
          seasons: +seasons,
        },
      });
      if (!updatedMovie) {
        throw new Error("Invalid Id");
      } else {
        return res.status(200).json({
          message: "series updated successfully",
          updatedMovie,
        });
      }
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error in getting single series", error });
  }
}
