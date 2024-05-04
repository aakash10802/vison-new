import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import { addDays } from "date-fns";
import prisma from "@/libs/prismdb";
import { hash } from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET" && req.method !== "PATCH") {
    return res.status(405).json({ message: `Method ${req.method}` });
  }
  try {
    const { user } = await serverAuth(req, res);

    const id = req.query.userId as string;

    if (!id || typeof id !== "string") {
      throw new Error("Invalid Id");
    }

    const selectedUser = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        Admin: true,
      },
    });

    if (!user) {
      throw new Error("user not found");
    }

    if (!user.IsAdmin) {
      // admin can see all users' info
      return res.status(401).json({ message: "unAuthorized" });
    }

    if (req.method === "GET") {
      const favoriteMovies = await prisma.movie.findMany({
        where: {
          id: {
            in: user.favoriteMovies,
          },
        },
      });
      const favoriteSeries = await prisma.series.findMany({
        where: {
          id: {
            in: user.favoriteSeries,
          },
        },
      });

      return res.status(200).json({
        user: selectedUser,
        movies: favoriteMovies,
        series: favoriteSeries,
      });
    }
    if (req.method === "PATCH") {
      const { email, role, password, image, name } = req.body;

      if (!email || !name || !password) {
        throw new Error("missing fields!");
      }

      const hashedPassword = await hash(password, 12);

      if (!selectedUser) {
        throw new Error("user not found!");
      }

      if (selectedUser.role === "OWNER") {
        return res.status(401).json({
          message: "unAuthorized!",
        });
      }

      if (role === "ADMIN") {
        // update the user
        const existedUser = await prisma.user.update({
          where: {
            id,
          },
          data: {
            email,
            name,
            image: !!image ? image : null,
            hashedPassword,
            IsAdmin: !!role ? (role === "ADMIN" ? true : false) : false,
            role,
          },
        });
        // check this user was already an admin or not
        const existedAdmin = await prisma.admin.findUnique({
          where: {
            userId: existedUser.id,
          },
        });
        if (!existedAdmin) {
          await prisma.admin.create({
            data: {
              userId: existedUser.id,
              parentId: user.id,
              expireAt: addDays(new Date(), 10),
            },
          });
        }
      }
      if (role === "USER") {
        // check this user was already an admin or not
        const existedAdmin = await prisma.admin.findUnique({
          where: {
            userId: selectedUser.id,
          },
        });
        if (existedAdmin && user.role === "OWNER") {
          // update the user
          await prisma.user.update({
            where: {
              id,
            },
            data: {
              email,
              name,
              image: !!image ? image : null,
              hashedPassword,
              IsAdmin: false,
              role: "USER",
            },
          });
          await prisma.admin.delete({ where: { id: existedAdmin.id } });
        } else if (existedAdmin && existedAdmin.parentId === user.id) {
          // update the user
          await prisma.user.update({
            where: {
              id,
            },
            data: {
              email,
              name,
              image: !!image ? image : null,
              hashedPassword,
              IsAdmin: false,
              role: "USER",
            },
          });
          await prisma.admin.delete({ where: { id: existedAdmin.id } });
        } else {
          return res.status(401).json({ message: "unAuthorized!" });
        }
      }

      return res.status(200).json({ message: "Users updated!" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error in getting user data", error });
  }
}
