import { Request, Response, NextFunction } from "express";
import config from "config";
import jwt from "jsonwebtoken";

export default async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ error: "no token provided" });

  const parts: string[] = authHeader.split(" ");
  if (parts.length !== 2) return res.status(401).json({ error: "token error" });

  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) return res.status(401).json({ error: "invalid token" });

  jwt.verify(token, config.jwt.secret, (err, decoded) => {
      if (err) return res.status(401).json({ error: "invalid token" });
      res.locals.user = decoded;
      return next();
  });
};
