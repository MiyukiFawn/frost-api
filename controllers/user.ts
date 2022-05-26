import { Request, Response } from "express";
import logging from "logging";
import config from "config";
import Joi, { bool } from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import user_validate from "validations/user_validation";
import ApiErrors from "error/ApiError";

const NAMESPACE = "USER CONTROLLER";

async function create_user(req: Request, res: Response) {;
  const error = user_validate(req.body);
  if (error != true) return res.status(400).json({ message: "Invalid form", errors: error });

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  await prisma.user.create({
    data: {
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
    },
  });

  return res.status(200).json({ message: "User created successfully" });
}

export default {
  create_user,
};
