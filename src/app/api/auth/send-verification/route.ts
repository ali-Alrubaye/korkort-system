// src/app/api/auth/send-verification/route.ts
import { NextResponse } from "next/server";
import { generateVerificationCode } from "../verify/route";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Generera ny verifieringskod
    const code = await generateVerificationCode(email);

    // I utvecklingsmiljö, logga koden
    if (process.env.NODE_ENV === "development") {
      console.log("\n=== VERIFIERINGSKOD ===");
      console.log(`Email: ${email}`);
      console.log(`Kod: ${code}`);
      console.log("=====================\n");
    }

    // TODO: Implementera e-postutskick med verifieringskod
    // await sendVerificationEmail(email, code);

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
