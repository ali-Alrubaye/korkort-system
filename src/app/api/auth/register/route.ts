// src/app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/email";
import { Prisma } from "@prisma/client";

interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  termsAccepted: boolean;
  phoneNumber?: string;
  address?: string;
  postalCode?: string;
  city?: string;
}

export async function POST(request: Request) {
  try {
    const data: RegisterRequest = await request.json();

    // Validering...
    if (!data.email || !data.password || !data.firstName || !data.lastName) {
      return NextResponse.json(
        { message: "Alla obligatoriska fält måste fyllas i" },
        { status: 400 }
      );
    }

    if (!data.termsAccepted) {
      return NextResponse.json(
        { message: "Du måste acceptera användarvillkoren" },
        { status: 400 }
      );
    }

    // Kolla om användaren finns
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email.toLowerCase() },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "En användare med denna email finns redan" },
        { status: 400 }
      );
    }

    // Generera verifieringskod
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const verificationCodeExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minuter

    // Hasha lösenord
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Skapa användare med explicit typning
    const userData: Prisma.UserCreateInput = {
      email: data.email.toLowerCase(),
      password: hashedPassword,
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber || null,
      address: data.address || null,
      postalCode: data.postalCode || null,
      city: data.city || null,
      termsAccepted: data.termsAccepted,
      role: "FREE_USER",
      status: "PENDING",
      verificationCode,
      verificationCodeExpires,
      verificationAttempts: 0,
    };

    const user = await prisma.user.create({
      data: userData,
    });

    // Skicka verifieringsmail
    await sendVerificationEmail({
      email: user.email,
      code: verificationCode,
      name: `${user.firstName} ${user.lastName}`,
    });

    // Utvecklingsloggning
    if (process.env.NODE_ENV === "development") {
      console.log("\n=== NY REGISTRERING ===");
      console.log("Namn:", `${user.firstName} ${user.lastName}`);
      console.log("Email:", user.email);
      console.log("Status:", user.status);
      console.log("Verifieringskod:", verificationCode);
      console.log("Utgår:", verificationCodeExpires);
      console.log("=====================\n");
    }

    return NextResponse.json({
      message:
        "Registrering lyckades. Kontrollera din email för verifieringskod.",
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        status: user.status,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Ett fel uppstod vid registrering" },
      { status: 500 }
    );
  }
}
