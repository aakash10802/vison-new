import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismdb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  try {
    const { user } = await serverAuth(req, res);
    if (!user) {
      throw new Error("not signed in");
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

    const isAvailable = !!(await prisma.movie.findFirst({
      where: {
        title: { equals: title, contains: title },
      },
    }));

    if (isAvailable) {
      return res.status(400).json({ message: "this movie is already exist" });
    } else {
      const newMovie = await prisma.movie.create({
        data: {
          title: title.toLowerCase(),
          description,
          duration,
          genre,
          thumbnailUrl,
          videoUrl,
          cast: !!cast ? cast : [],
        },
      });

      return res.status(200).json({ message: "movie created", newMovie });
    }
  } catch (error) {
    return res.status(500).json({ message: "error in creating movies", error });
  }
}
