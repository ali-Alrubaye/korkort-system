// src/lib/auth/utils.ts
import { AuthError, AuthUser, isAuthUser } from "@/types/auth";
import { Status } from "@prisma/client";
import bcrypt from "bcryptjs";

export class AuthenticationError extends Error implements AuthError {
  constructor(
    message: string,
    public code: string = "AUTH_ERROR",
    public statusCode: number = 401
  ) {
    super(message);
    this.name = "AuthenticationError";
  }
}

export const validateCredentials = async (
  user: AuthUser | null,
  password: string
): Promise<void> => {
  if (!isAuthUser(user) || !user.password) {
    throw new AuthenticationError("Ogiltig inloggningsinformation");
  }
  if (user.status === Status.SUSPENDED) {
    throw new AuthenticationError(
      "Ditt konto är avstängt",
      "ACCOUNT_SUSPENDED",
      403
    );
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new AuthenticationError("Ogiltig inloggningsinformation");
  }
};

export const sanitizeUser = (user: AuthUser): Omit<AuthUser, "password"> => {
  const { password, ...sanitizedUser } = user;
  return sanitizedUser;
};
