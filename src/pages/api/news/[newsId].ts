import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismdb";
import serverAuth from "@/libs/serverAuth";

export default async function hanlder(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { user } = await serverAuth(req, res);
    const newsId = req.query.newsId;

    if (!newsId || typeof newsId !== "string") {
      return res.status(405).json({ message: "Invalid Id!" });
    }

    if (!user) {
      return res.status(401).json({ message: "Unauthorized User" });
    }

    if (req.method === "DELETE" || req.method === "PATCH") {
      if (!user || !user.IsAdmin || user.role === "USER") {
        return res.status(401).json({ message: "Unauthorized User" });
      }

      const existedNews = await prisma.news.findUnique({
        where: {
          id: newsId,
        },
      });

      if (!existedNews) {
        return res.status(404).json({ message: "news not found!" });
      }

      if (req.method === "DELETE") {
        if (existedNews) {
          await prisma.news.delete({
            where: {
              id: newsId,
            },
          });
          return res.status(200).json({ message: "news deleted!" });
        }
      }
      if (req.method === "PATCH") {
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
        if (existedNews) {
          const updatedNews = await prisma.news.update({
            where: {
              id: newsId,
            },
            data: {
              title,
              authorEmail,
              authorName,
              authorProfilePic,
              coverImage,
              description,
              tags: !!tags ? tags : [],
            },
          });
          return res.status(200).json({ message: "news updated", updatedNews });
        }
      }
    }
    if (req.method === "GET") {
      const news = await prisma.news.findUnique({
        where: {
          id: newsId,
        },
      });
      if (!news) {
        return res.status(404).json({ message: "news not found!" });
      }
      return res.status(200).json(news);
    }
  } catch (error) {
    return res.status(500).json({
      message: "error in getting single news data",
      error,
    });
  }
}
