import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismdb";
import bcrypt from "bcrypt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Request not allowed" });
    }

    try {
        const { email, password, name } = req.body;

        if (!!!email || !!!password || !!!name) {
            return res.status(404).json({ message: "please enter required data" });
        }

        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (user) {
            return res.status(409).json({ message: "Email already in use." });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const CreatedUser = await prisma.user.create({
            data: {
                name,
                hashedPassword,
                email,
                image: "",
                emailVerified: new Date(),
            },
        });

        return res.status(200).json({
            message: "Welcome to Vision.io",
            CreatedUser,
        });
    } catch (error) {
        // console.log(error);
        return res.status(500).json({ message: "error in registering user", error });
    }
}
