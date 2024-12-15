// src/lib/auth/jwt.ts
import { SignJWT, jwtVerify } from "jose";
import { User } from "@/types/auth";

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key"
);

const ISSUER = "your-app-name";
const AUDIENCE = "your-app-name";

export interface JWTPayload {
  id: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
  iss: string;
  aud: string;
}

export async function createToken(user: Partial<User>): Promise<string> {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 24 * 60 * 60; // 24 hours

  return new SignJWT({
    id: user.id,
    email: user.email,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt(iat)
    .setExpirationTime(exp)
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .sign(SECRET);
}

export async function verifyToken(token: string): Promise<JWTPayload> {
  try {
    const { payload } = await jwtVerify(token, SECRET, {
      issuer: ISSUER,
      audience: AUDIENCE,
    });

    return payload as unknown as JWTPayload;
  } catch (error) {
    throw new Error("Invalid token");
  }
}

export function isTokenExpired(exp: number): boolean {
  const currentTime = Math.floor(Date.now() / 1000);
  return currentTime >= exp;
}
