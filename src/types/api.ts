// src/types/api.ts
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
}

export interface VerificationResponse {
  success: boolean;
  message: string;
  verificationToken?: string;
  userId?: string;
}
