import { Request, Response } from "express";
import conn from "models/user";
import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { logError500, objectsAreEqual } from "helpers/mainHelpers";

import { DBUser, User } from "interfaces/user";
import logging from "logging";
import config from "config";
import { DBtoUser } from "helpers/user";

const NAMESPACE = "USER CONTROLLER";

async function getAllUsers(req: Request, res: Response) {
  try {
    let dbResult: DBUser[] = await conn.getAllUsers();
    let result: User[] = [];
    dbResult.forEach((dbUser: DBUser) => {
      const user: User = DBtoUser(dbUser);
      result.push(user);
    });

    return res.status(200).json(result);
  } catch (err) {
    return logError500(NAMESPACE, res, err);
  }
}

async function getSingleUser(req: Request, res: Response) {
  const id = parseInt(req.params.id);

  try {
    const result: DBUser | undefined = await conn.getSingleUser(id);

    if (result === undefined) return res.status(404).json({ message: `user ${id} not found` });

    return res.status(200).json(DBtoUser(result));
  } catch (err) {
    return logError500(NAMESPACE, res, err);
  }
}

async function postUser(req: Request, res: Response) {
  const data = req.body;
  const schema = Joi.object().keys({
    username: Joi.string().min(5).max(255).required(),
    email: Joi.string().email().required(),
    pwd: Joi.string().min(7).max(30).required(),
    pwdConfirm: Joi.any().valid(Joi.ref("pwd")).required(),
  });

  const { error } = schema.validate(data);
  if (error) return res.status(400).json({ error: error.message });

  const hash = await bcrypt.hash(data.pwd, config.bcrypt.saltOrRounds);
  const user: User = {
    username: data.username,
    email: data.email,
    password: hash,
  };

  try {
    const { insertId } = await conn.insertUser(user);
    const createdUserDB: DBUser = await conn.getSingleUser(insertId);

    return res.status(201).json({ user: DBtoUser(createdUserDB) });
  } catch (err) {
    return logError500(NAMESPACE, res, err);
  }
}

async function auth(req: Request, res: Response) {
  const data = req.body;
  const schema = Joi.object().keys({
    username: Joi.string().min(5).max(255).required(),
    pwd: Joi.string().min(7).max(30).required(),
  });

  const { error } = schema.validate(data);
  if (error) return res.status(400).json({ error: error.message });

  try {
    const dbUser: DBUser | undefined = await conn.getSingleUserFromUsername(data.username);
    if (dbUser === undefined) return res.status(404).json({ message: `user not found` });
    if (!(await bcrypt.compare(data.pwd, dbUser.password)))
      return res.status(400).json({ message: `invalid password` });

    const user: User = DBtoUser(dbUser);

    const token = jwt.sign(user, config.jwt.secret, {
      expiresIn: config.jwt.expides,
    });

    res.status(200).json({ status: "ok", token: token });
  } catch (err) {
    return logError500(NAMESPACE, res, err);
  }
}

export default {
  getAllUsers,
  getSingleUser,
  postUser,
  auth,
};
