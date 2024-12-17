// src/app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/db";
import { Role, Status } from "@prisma/client";
import crypto from "crypto";
import bcrypt from "bcryptjs";

// Flytta interface till types-fil
interface GoogleProfile {
  email: string;
  email_verified: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
  sub: string;
}

// Separera providers för bättre läsbarhet
const providers = [
  CredentialsProvider({
    name: "credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) {
        throw new Error("Ogiltig inloggningsinformation");
      }

      const user = await prisma.user.findUnique({
        where: { email: credentials.email },
      });

      if (!user || !user.password) {
        throw new Error("Ogiltig inloggningsinformation");
      }

      if (user.status === Status.SUSPENDED) {
        throw new Error("Ditt konto är avstängt");
      }

      const isValidPassword = await bcrypt.compare(
        credentials.password,
        user.password
      );

      if (!isValidPassword) {
        throw new Error("Ogiltig inloggningsinformation");
      }

      return {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        status: user.status,
      };
    },
  }),
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  }),
];

// Separera callbacks för bättre läsbarhet
const callbacks = {
  async signIn({ user, account, profile }: any) {
    if (account?.provider === "google") {
      const googleProfile = profile as GoogleProfile;
      try {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        if (!existingUser) {
          await prisma.user.create({
            data: {
              email: user.email!,
              firstName: googleProfile.given_name,
              lastName: googleProfile.family_name,
              password: crypto.randomBytes(32).toString("hex"),
              role: Role.FREE_USER,
              status: Status.PENDING,
              termsAccepted: true,
              emailVerified: new Date(),
            },
          });
        }
        return true;
      } catch (error) {
        console.error("SignIn Error:", error);
        return false;
      }
    }
    return true;
  },

  async session({ session, token }: any) {
    if (session.user) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.status = token.status;
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;
    }
    return session;
  },

  async jwt({ token, user }: any) {
    if (user) {
      const dbUser = await prisma.user.findUnique({
        where: { email: user.email! },
        select: {
          id: true,
          role: true,
          status: true,
          firstName: true,
          lastName: true,
        },
      });

      if (dbUser) {
        token.id = dbUser.id;
        token.role = dbUser.role;
        token.status = dbUser.status;
        token.firstName = dbUser.firstName;
        token.lastName = dbUser.lastName;
      }
    }
    return token;
  },
};

export const authOptions: NextAuthOptions = {
  providers,
  callbacks,
  pages: {
    signIn: "/login",
    error: "/error",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
