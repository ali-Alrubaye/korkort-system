// src/lib/logger.ts
type LogLevel = "info" | "warn" | "error";

interface LogMessage {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: any;
}

export const logger = {
  info: (message: string, data?: any) => log("info", message, data),
  warn: (message: string, data?: any) => log("warn", message, data),
  error: (message: string, data?: any) => log("error", message, data),
};

function log(level: LogLevel, message: string, data?: any) {
  const logMessage: LogMessage = {
    level,
    message,
    timestamp: new Date().toISOString(),
    ...(data && { data }),
  };

  if (process.env.NODE_ENV === "development") {
    console[level](JSON.stringify(logMessage, null, 2));
  } else {
    // Här kan du implementera produktionsloggning
    // t.ex. skicka till en logging service
  }
}
