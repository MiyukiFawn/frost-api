import { Request, Response, NextFunction } from "express";
import ApiError from "error/ApiError";
import logging from "logging";
import { Prisma } from "@prisma/client";

function apiErrorHandler(err: TypeError | ApiError | Prisma.PrismaClientKnownRequestError, req: Request, res: Response, next: NextFunction) {
  logging.error("SERVER", err.stack + "\n", err.message);
  
  if (err instanceof ApiError) return res.status(err.code).json(err.error);

  return res.status(500).json({ message: "something went wrong" });
}

export = apiErrorHandler;
