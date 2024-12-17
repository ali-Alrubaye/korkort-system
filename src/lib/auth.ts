// src/lib/auth.ts
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import { prisma } from "@/lib/db";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { Adapter } from "next-auth/adapters";

// Skapa en anpassad adapter som extends PrismaAdapter
const customPrismaAdapter = (): Adapter => {
  const adapter = PrismaAdapter(prisma) as Adapter;

  return {
    ...adapter,
    createUser: async (data: any) => {
      const user = await prisma.user.create({
        data: {
          ...data,
          role: "FREE_USER",
          status: "PENDING",
        },
      });
      return {
        ...user,
        id: user.id,
        email: user.email!,
        emailVerified: user.emailVerified,
        role: user.role,
        status: user.status,
        firstName: user.firstName,
        lastName: user.lastName,
      };
    },
    getUser: async (id) => {
      const user = await prisma.user.findUnique({
        where: { id },
      });
      if (!user) return null;
      return {
        ...user,
        id: user.id,
        email: user.email!,
        emailVerified: user.emailVerified,
        role: user.role,
        status: user.status,
        firstName: user.firstName,
        lastName: user.lastName,
      };
    },
  };
};

export const authOptions: NextAuthOptions = {
  adapter: customPrismaAdapter(),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
    verifyRequest: "/auth/verify",
  },
  providers: [
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

        if (user.status === "SUSPENDED") {
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
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.status = user.status;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.status = token.status;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
      }
      return session;
    },
  },
};
