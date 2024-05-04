import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismdb";
import serverAuth from "@/libs/serverAuth";

export default async function hanlder(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ message: "req not allowed" }); // Method not allowed
  }

  try {
    const { user } = await serverAuth(req, res);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized User" });
    }

    if (req.method === "GET") {
      const news = await prisma.news.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
      const favoritesNews = await prisma.news.findMany({
        where: {
          id: {
            in: user.favoriteNews,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return res.status(200).json({ news, favoritesNews });
    }
    if (req.method === "POST") {
      const {
        title,
        description,
        coverImage,
        authorName,
        authorEmail,
        authorProfilePic,
        tags,
      } = req.body;

      if (
        !title ||
        !description ||
        !coverImage ||
        !authorName ||
        !authorEmail ||
        !authorProfilePic
      ) {
        return res.status(400).json({ message: "missing fields" });
      }

      const existedNews = await prisma.news.findFirst({
        where: {
          title: title,
        },
      });

      if (existedNews) {
        return res.status(404).json({ message: "news already exists!" });
      }

      const newNews = await prisma.news.create({
        data: {
          title,
          description,
          coverImage,
          authorName,
          authorEmail,
          authorProfilePic,
          tags: !!tags ? tags : [],
        },
      });

      return res.status(200).json({ message: "news created!", newNews });
    }
  } catch (error) {
    return res.status(500).json({
      message: "error in getting news data",
      error,
    });
  }
}
