// src/app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { createToken } from "@/lib/auth/jwt";
import { compare } from "bcryptjs";
import { logger } from "@/lib/logger";

export async function POST(request: Request) {
  try {
    const { email, password, rememberMe } = await request.json();

    logger.info("Login attempt", { email });

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user || !(await compare(password, user.password))) {
      return NextResponse.json(
        { message: "Ogiltig e-postadress eller lösenord" },
        { status: 401 }
      );
    }

    if (user.status !== "ACTIVE") {
      return NextResponse.json(
        { message: "Kontot är inte aktiverat" },
        { status: 403 }
      );
    }

    const token = await createToken(user);
    const maxAge = rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60; // 30 days : 24 hours

    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        status: user.status,
      },
    });

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge,
    });

    logger.info("Login successful", { userId: user.id });
    return response;
  } catch (error) {
    logger.error("Login error", { error });
    return NextResponse.json(
      { message: "Ett fel uppstod vid inloggning" },
      { status: 500 }
    );
  }
}
