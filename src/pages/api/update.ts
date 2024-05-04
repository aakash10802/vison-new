import serverAuth from "@/libs/serverAuth";
import { hash } from "bcrypt";
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
      throw new Error("not signed in!");
    }
    const { email, name, image, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const hashedPassword = password ? await hash(password, 12) : null;

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        email,
        name,
        image: !!image ? image : user.image,
        hashedPassword: !!hashedPassword ? hashedPassword : user.hashedPassword,
      },
    });

    return res.status(200).json({ message: "profile updated", updatedUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error in updating profile", error });
  }
}
