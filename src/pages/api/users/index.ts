import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismdb";
import { hash } from "bcrypt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET" && req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }
    try {
        const { user } = await serverAuth(req, res);
        if (!user) {
            throw new Error("User is unauthorized");
        }
        if (!user.IsAdmin) {
            throw new Error("You are not admin");
        }
        if (req.method === "GET") {
            const users = await prisma.user.findMany({
                where: {
                    id: {
                        not: user.id,
                    },
                },
                orderBy: {
                    createdAt: "desc",
                },
            });

            const admins = await prisma.admin.findMany({
                where: {
                    userId: {
                        not: user.id,
                    },
                },
                orderBy: { createdAt: "desc" },
                include: {
                    user: true,
                },
            });

            return res.status(200).json({ users, admins });
        }
        if (req.method === "POST") {
            const { name, email, password, image } = req.body;

            if (!name || !email || !password) {
                throw new Error("missed some fields!");
            }

            const existedUser = await prisma.user.findUnique({
                where: {
                    email: email,
                },
            });

            if (existedUser) {
                return res.status(409).json({ message: "Email already in use." });
            }

            const hashedPassword = await hash(password, 12);

            const newUser = await prisma.user.create({
                data: {
                    name,
                    email,
                    image: !!image ? image : null,
                    IsAdmin: false,
                    role: "USER",
                    hashedPassword,
                },
            });

            return res.status(200).json({ message: "user created!", newUser });
        }
    } catch (error) {
        // console.log(error);
        return res.status(500).json({ message: "error in getting users", error });
    }
}
