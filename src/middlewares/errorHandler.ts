import config from "../config/config.js";
import log from "../utils/logger.js";
import { getDefaultCodeForStatus } from "../utils/util.js";
import { Request, Response, NextFunction } from "express";

export interface AppError extends Error {
  status?: number;
  code?: number;
  details?: string;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  const isProduction = config.nodeEnv;

  const errorCode = err.code || getDefaultCodeForStatus(status);

  log.error({
    message: err.message,
    stack: err.stack,
    code: errorCode,
    details: err.details,
    path: req.originalUrl,
    method: req.method,
  });

  res.status(status).json({
    status,
    message: err.message || "Internal Server Error",
    code: errorCode,
    ...(err.details ? { details: err.details } : {}),
    ...(isProduction ? null : { stack: err.stack }),
  });
};
