import { Request, Response, NextFunction } from "express";
import log from "../utils/logger.js";

export const logging = (req: Request, res: Response, next: NextFunction) => {
  log.info(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};
