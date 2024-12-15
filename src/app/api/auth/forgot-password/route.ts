// src/app/api/auth/forgot-password/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";
import { sendPasswordResetEmail } from "@/lib/email";

// Temporär lagring av återställningstokens (ersätt med databas)
export const resetTokens = new Map<string, { token: string; expires: Date }>();

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Generera token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const expiresIn = new Date(Date.now() + 3600000); // 1 timme

    // Spara token (temporärt)
    resetTokens.set(email, {
      token: resetToken,
      expires: expiresIn,
    });

    // Skicka återställningsmail
    if (process.env.NODE_ENV === "production") {
      await sendPasswordResetEmail(email, resetToken);
    } else {
      // Logga i utvecklingsmiljö
      console.log("\n=== LÖSENORDSÅTERSTÄLLNING ===");
      console.log(`Email: ${email}`);
      console.log(`Token: ${resetToken}`);
      console.log("==============================\n");
    }

    return NextResponse.json({
      message:
        "Om e-postadressen finns i vårt system kommer instruktioner för återställning att skickas.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { message: "Ett fel uppstod vid hantering av förfrågan" },
      { status: 500 }
    );
  }
}
