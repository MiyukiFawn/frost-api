import { Request, Response, NextFunction } from "express";
import config from "config";
import jwt from "jsonwebtoken";

const NAMESPACE = "AUTH MIDDLEWARE";

export default async (req: Request, res: Response, next: NextFunction) => {
  /** TRIES GET AUTH HEADER STRING */
  const authHeader = req.headers.authorization;

  /** CHECK IF HEADER IS PRESENT */
  if (!authHeader) return res.status(401).json({ error: "no token provided" });

  /** TRIES TO SPLIT HEADER INTO 2 PARTS (<prefix> <token>) */
  const parts: string[] = authHeader.split(" ");
  if (parts.length !== 2) return res.status(401).json({ error: "token error" });

  /** CHECK IF SCHEME IS A BEADER */
  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) return res.status(401).json({ error: "invalid token" });

  /** CHECK IF TOKEN IS A VALID JWD */
  jwt.verify(token, config.jwt.secret, (err, decoded) => {
      if (err) return res.status(401).json({ error: "invalid token" });
      res.locals.user = decoded;
      return next();
  });
};
