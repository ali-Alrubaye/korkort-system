// src/lib/auth/jwt.ts
import { SignJWT, jwtVerify } from "jose";
import { AuthUser, JWTPayload } from "@/types/auth";
import { Role } from "@prisma/client";

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET!
);

const JWT_CONFIG = {
  issuer: "your-app-name",
  audience: "your-app-name",
  expiresIn: "24h",
} as const;

export async function createToken(user: Partial<AuthUser>): Promise<string> {
  if (!user.id || !user.email || !user.role) {
    throw new Error("Ogiltiga användaruppgifter för token-generering");
  }

  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 24 * 60 * 60;

  const payload: JWTPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
    iat,
    exp,
    iss: JWT_CONFIG.issuer,
    aud: JWT_CONFIG.audience,
  };

  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt(iat)
    .setExpirationTime(exp)
    .setIssuer(JWT_CONFIG.issuer)
    .setAudience(JWT_CONFIG.audience)
    .sign(SECRET);
}

export async function verifyToken<T = JWTPayload>(token: string): Promise<T> {
  try {
    const { payload } = await jwtVerify(token, SECRET, {
      issuer: JWT_CONFIG.issuer,
      audience: JWT_CONFIG.audience,
    });

    if (!isValidJWTPayload(payload)) {
      throw new Error("Ogiltig token payload");
    }

    return payload as T;
  } catch (error) {
    throw new Error("Ogiltig token");
  }
}

// Hjälpfunktion för att validera token-payload
export function isValidJWTPayload(payload: unknown): payload is JWTPayload {
  const p = payload as JWTPayload;
  return !!(
    p &&
    typeof p.id === "string" &&
    typeof p.email === "string" &&
    typeof p.role === "string"
  );
}

// Type guard för att verifiera Role enum
export function isValidRole(role: unknown): role is Role {
  return typeof role === "string" && Object.values(Role).includes(role as Role);
}
