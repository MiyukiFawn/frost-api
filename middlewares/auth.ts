import { Request, Response, NextFunction } from "express";
import config from "config";
import jwt from "jsonwebtoken";
import ApiErrors from "error/ApiError";

const NAMESPACE = "AUTH MIDDLEWARE";

export default async (req: Request, res: Response, next: NextFunction) => {
  /** TRIES GET AUTH HEADER STRING */
  const authHeader = req.headers.authorization;

  /** CHECK IF HEADER IS PRESENT */
  if (!authHeader) throw ApiErrors.unauthorized("Token Not Provided");

  /** TRIES TO SPLIT HEADER INTO 2 PARTS (<prefix> <token>) */
  const parts: string[] = authHeader.split(" ");
  if (parts.length !== 2) throw ApiErrors.unauthorized("Token Error");

  /** CHECK IF SCHEME IS A BEADER */
  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) throw ApiErrors.unauthorized("Invalid Token")

  /** CHECK IF TOKEN IS A VALID JWD */
  jwt.verify(token, config.jwt.secret, (err, decoded) => {
      if (err) throw ApiErrors.unauthorized("Invalid Token");
      res.locals.user = decoded;
      return next();
  });
};
