// src/lib/email/index.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface VerificationEmailProps {
  email: string;
  code: string;
  name: string;
}

export async function sendVerificationEmail({
  email,
  code,
  name,
}: VerificationEmailProps) {
  if (process.env.NODE_ENV === "development") {
    console.log("\n=== VERIFIERINGSEMAIL ===");
    console.log("Till:", email);
    console.log("Namn:", name);
    console.log("Kod:", code);
    console.log("=======================\n");
    return;
  }

  await resend.emails.send({
    from: "Körkortstester <no-reply@example.com>",
    to: email,
    subject: "Verifiera din email",
    html: `  
      <h1>Välkommen ${name}!</h1>  
      <p>Din verifieringskod är: <strong>${code}</strong></p>  
      <p>Koden är giltig i 15 minuter.</p>  
      <p>Om du inte registrerade dig kan du ignorera detta mail.</p>  
    `,
  });
}
