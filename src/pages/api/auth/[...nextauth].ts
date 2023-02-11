import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import prisma from "@/lib/prisma";
import { compare } from "@/utils/hash";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "john.smith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, _req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          return null;
        }

        const isCorrectPassword = await compare(
          password ?? "",
          user?.passwordHash
        );

        if (isCorrectPassword) {
          return user;
        }
      },
    }),
  ],
};

export default NextAuth(authOptions);
