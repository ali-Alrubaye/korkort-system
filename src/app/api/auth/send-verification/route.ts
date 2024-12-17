// src/app/api/auth/send-verification/route.ts
import { NextResponse } from "next/server";
import { generateVerificationCode } from "../verify/route";
import { sendVerificationEmail } from "@/lib/email";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    const user = await prisma.user.findUnique({
      where: { email },
      select: { firstName: true },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Användaren hittades inte" },
        { status: 404 }
      );
    }

    const code = await generateVerificationCode(email);

    await sendVerificationEmail({
      email,
      code,
      name: user.firstName,
    });

    return NextResponse.json({
      message: "En ny verifieringskod har skickats",
    });
  } catch (error) {
    console.error("Send verification error:", error);
    return NextResponse.json(
      { message: "Ett fel uppstod vid skickande av verifieringskod" },
      { status: 500 }
    );
  }
}
