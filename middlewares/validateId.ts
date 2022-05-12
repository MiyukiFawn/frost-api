import { Request, Response, NextFunction } from "express";

export default async (req: Request, res: Response, next: NextFunction) => {
  if (isNaN(parseInt(req.params.id)))
    return res.status(400).json({
      message: "invalid id",
      details: "make sure the id is a integer number",
    });
  else next();
};
