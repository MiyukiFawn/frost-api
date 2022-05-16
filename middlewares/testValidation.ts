import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import Test from "interfaces/test";

export default async (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    text: Joi.string().min(5).max(255).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.message });

  const test: Test = {
    text: req.body.text,
  };

  next();
};
