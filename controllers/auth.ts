import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

import ApiErrors from "error/ApiError";

import { generate_token } from "helpers/auth";
import { validate_post } from "helpers/main_helpers";

import { user_schema, user_type } from "validations/user_schema";
import { user_login_schema, user_login_type } from "validations/user_login_schema";
import { user_refresh_token_schema, user_refresh_token_type } from "validations/user_refresh_token_schema";
import dayjs from "dayjs";

const NAMESPACE = "AUTH CONTROLLER";
const prisma = new PrismaClient();

async function signup(req: Request, res: Response) {
  const data: user_type = validate_post(req.body, user_schema);

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.findUnique({
    where: {
      username: data.username,
    },
  });
  if (user != null) throw ApiErrors.conflict("Username Already Exists");

  await prisma.user.create({
    data: {
      username: data.username,
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      password: hashedPassword,
    },
  });

  return res.status(200).json({ message: "User created successfully" });
}

async function login(req: Request, res: Response) {
  const data: user_login_type = validate_post(req.body, user_login_schema);
  const user = await prisma.user.findUnique({
    where: {
      username: data.username,
    },
  });

  if (user == null) throw ApiErrors.notFound(`No users found with username '${data.username}'`);
  if (!(await bcrypt.compare(data.password, user.password))) throw ApiErrors.unauthorized("Invalid password");

  const { access_token, refresh_token } = await generate_token(user);

  return res.status(200).json({ access_token, refresh_token });
}

async function refresh(req: Request, res: Response) {
  const data: user_refresh_token_type = validate_post(req.body, user_refresh_token_schema);
  const today = dayjs().unix();
  const token = await prisma.refresh_Token.findFirst({
    where: {
      refresh_token: data.refresh_token,
    },
  });

  if (!token) throw ApiErrors.forbidden("Invalid token");
  if (token.expires_at <= today) throw ApiErrors.forbidden("Token expired");
  if (!token.valid) throw ApiErrors.forbidden("Token aready used");

  const user = await prisma.user.findUnique({
    where: {
      id: token.user_id,
    },
  });

  if (!user) throw ApiErrors.notFound("No users math this token");
  const { access_token, refresh_token } = await generate_token(user);

  return res.status(200).json({ access_token, refresh_token });
}

async function logout(req: Request, res: Response) {
  const data: user_refresh_token_type = validate_post(req.body, user_refresh_token_schema);
  const today = dayjs().unix();
  const token = await prisma.refresh_Token.findFirst({
    where: {
      refresh_token: data.refresh_token,
    },
  });

  if (!token) throw ApiErrors.forbidden("Invalid token");
  if (token.expires_at <= today) throw ApiErrors.forbidden("Token expired");
  if (!token.valid) throw ApiErrors.forbidden("Token aready used");

  await prisma.refresh_Token.update({
    data: {
      valid: false,
    },
    where: {
      id: token.id,
    },
  });

  return res.status(200).json({ message: "Logged out successfully" });
}

export default {
  signup,
  login,
  refresh,
  logout,
};
