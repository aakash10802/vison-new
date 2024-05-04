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
    await serverAuth(req, res);
    const series = await prisma.series.findMany({
      orderBy: {
        title: "desc",
      },
    });

    return res.status(200).json(series);
  } catch (error) {
    return res.status(500).json({ message: "error in getting series", error });
  }
}
