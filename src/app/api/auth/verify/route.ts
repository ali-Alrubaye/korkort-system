// src/app/api/auth/verify/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";
import crypto from "crypto";

const verifySchema = z.object({
  email: z.string().email(),
  code: z.string().length(6),
});

export async function generateVerificationCode(email: string) {
  const code = crypto.randomInt(100000, 999999).toString();
  const expires = new Date(Date.now() + 15 * 60 * 1000); // 15 minuter

  await prisma.user.update({
    where: { email },
    data: {
      verificationCode: code,
      verificationCodeExpires: expires,
      verificationAttempts: 0,
    },
  });

  return code;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, code } = verifySchema.parse(body);

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        verificationCode: true,
        verificationCodeExpires: true,
        verificationAttempts: true,
        status: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Ogiltig e-postadress" },
        { status: 400 }
      );
    }

    if (user.verificationAttempts >= 3) {
      return NextResponse.json(
        { message: "För många försök. Begär en ny kod." },
        { status: 400 }
      );
    }

    if (!user.verificationCode || !user.verificationCodeExpires) {
      return NextResponse.json(
        { message: "Ingen verifieringskod hittades" },
        { status: 400 }
      );
    }

    if (new Date() > user.verificationCodeExpires) {
      return NextResponse.json(
        { message: "Verifieringskoden har gått ut" },
        { status: 400 }
      );
    }

    if (user.verificationCode !== code) {
      await prisma.user.update({
        where: { email },
        data: {
          verificationAttempts: {
            increment: 1,
          },
        },
      });

      return NextResponse.json(
        { message: "Felaktig verifieringskod" },
        { status: 400 }
      );
    }

    await prisma.user.update({
      where: { email },
      data: {
        emailVerified: new Date(),
        status: "ACTIVE",
        verificationCode: null,
        verificationCodeExpires: null,
        verificationAttempts: 0,
      },
    });

    return NextResponse.json({
      message: "E-postadressen har verifierats",
    });
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { message: "Ett fel uppstod vid verifiering" },
      { status: 500 }
    );
  }
}
