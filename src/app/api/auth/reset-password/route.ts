// src/app/api/auth/reset-password/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { resetTokens } from "../forgot-password/route";

export async function POST(request: Request) {
  try {
    const { token, email, password } = await request.json();

    // Kontrollera att vi har all nödvändig data
    if (!token || !email || !password) {
      return NextResponse.json(
        { message: "Ogiltig förfrågan" },
        { status: 400 }
      );
    }

    // Hämta sparad token
    const storedReset = resetTokens.get(email);

    // Kontrollera om återställning finns
    if (!storedReset) {
      return NextResponse.json(
        { message: "Ogiltig eller utgången återställningslänk" },
        { status: 400 }
      );
    }

    // Kontrollera om token matchar
    if (storedReset.token !== token) {
      return NextResponse.json(
        { message: "Ogiltig återställningslänk" },
        { status: 400 }
      );
    }

    // Kontrollera om token har gått ut
    if (storedReset.expires < new Date()) {
      resetTokens.delete(email);
      return NextResponse.json(
        { message: "Återställningslänken har gått ut" },
        { status: 400 }
      );
    }

    // Hasha det nya lösenordet
    const hashedPassword = await bcrypt.hash(password, 10);

    // TODO: Uppdatera användarens lösenord i databasen
    // await db.user.update({
    //   where: { email },
    //   data: { password: hashedPassword }
    // });

    // Ta bort återställningstoken
    resetTokens.delete(email);

    // I utvecklingsläge, logga att lösenordet har uppdaterats
    if (process.env.NODE_ENV === "development") {
      console.log("\n=== LÖSENORD UPPDATERAT ===");
      console.log(`Email: ${email}`);
      console.log("===========================\n");
    }

    return NextResponse.json({
      message: "Lösenordet har uppdaterats",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { message: "Ett fel uppstod vid återställning av lösenord" },
      { status: 500 }
    );
  }
}
