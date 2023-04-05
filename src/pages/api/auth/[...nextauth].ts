import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import prisma from "@/lib/prisma";
import { compare } from "@/utils/hash";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  callbacks: {
    async jwt({ token, user }) {
      // Add auth_time to token on signin in
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      (session as any).accessToken = token.accessToken as any;
      (session as any).user.id = token.id;

      if (token && session.user) {
        (session.user as any).role = token.role;
      }
      return session
    }
  },
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

        if (!isCorrectPassword) {
          return null;
        }

        return user;
      },
    }),
  ],
};

export default NextAuth(authOptions);
