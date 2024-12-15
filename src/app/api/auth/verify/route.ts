// src/app/api/auth/verify/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createToken } from "@/lib/auth/jwt";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { email, code } = await request.json();

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    // ... verifieringskontroller ...

    // Efter lyckad verifiering
    const verifiedUser = await prisma.user.update({
      where: { email: email.toLowerCase() },
      data: {
        emailVerified: new Date(),
        status: "ACTIVE",
        verificationCode: null,
        verificationCodeExpires: null,
        verificationAttempts: 0,
      },
    });

    const token = await createToken({
      id: verifiedUser.id,
      email: verifiedUser.email,
      role: verifiedUser.role,
      firstName: verifiedUser.firstName,
      lastName: verifiedUser.lastName,
    });

    const response = NextResponse.json({
      message: "E-postadressen har verifierats",
      user: {
        id: verifiedUser.id,
        email: verifiedUser.email,
        firstName: verifiedUser.firstName,
        lastName: verifiedUser.lastName,
        status: verifiedUser.status,
      },
      redirect: "/dashboard", // Lägg till omdirigeringsinfo
    });

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { message: "Ett fel uppstod vid verifiering" },
      { status: 500 }
    );
  }
}
