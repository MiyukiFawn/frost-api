import { Request, Response, NextFunction } from "express";
import ApiError from "error/ApiError";
import Debuger from "src/debuger";

const Debug = Debuger("SERVER");

function apiErrorHandler(err: TypeError, req: Request, res: Response, next: NextFunction) {
  Debug.error(err.stack + "\n", err.message);
  
  if (err instanceof ApiError) return res.status(err.code).json(err.error);
  
  return res.status(500).json({ message: "Something Went Wrong" });
}

export = apiErrorHandler;
