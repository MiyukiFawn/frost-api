import { PrismaClient, User } from "@prisma/client";
import jwt from "jsonwebtoken";
import config from "config";
import dayjs from "dayjs";
const prisma = new PrismaClient();

interface IGen_Token {
  access_token: string;
  refresh_token: string;
}

async function generate_token(user: User): Promise<IGen_Token> {
  const old_refresh_token = await prisma.refresh_Token.findFirst({
    where: {
      AND: {
        valid: true,
        user_id: user.id,
      },
    },
  });

  if (old_refresh_token != null) {
    await prisma.refresh_Token.update({
      data: {
        valid: false,
      },
      where: {
        id: old_refresh_token.id,
      },
    });
  }

  const access_token = jwt.sign({ id: user.id }, config.jwt.secret, { expiresIn: config.jwt.access_expides });
  const refresh_token = jwt.sign({ id: user.id }, config.jwt.secret, { expiresIn: config.jwt.refresh_expides });

  const expiresIn = dayjs().add(30, "days").unix();

  await prisma.refresh_Token.create({
    data: {
      refresh_token: refresh_token,
      expires_at: expiresIn,
      user_id: user.id,
    },
  });

  const response: IGen_Token = {
    access_token: access_token,
    refresh_token: refresh_token,
  };

  return response;
}

export { generate_token };
