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
      seasons,
      epizodes,
      cast,
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
      return res.status(400).json({ message: "Missing Fields" });
    }

    const isAvailable = !!(await prisma.series.findFirst({
      where: {
        title: { equals: title, contains: title },
      },
    }));

    if (isAvailable) {
      return res.status(400).json({ message: "this series is already exist" });
    } else {
      const newSeries = await prisma.series.create({
        data: {
          title: title.toLowerCase(),
          description,
          duration,
          epizodes: +epizodes,
          genre,
          seasons: +seasons,
          thumbnailUrl,
          videoUrl,
          cast: !!cast ? cast : [],
        },
      });

      return res.status(200).json({ message: "series created", newSeries });
    }
  } catch (error) {
    return res.status(500).json({ message: "error in creating series", error });
  }
}
