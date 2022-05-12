import { Request, Response } from "express";
import logging from "config/logging";
import conn from "model/test";

import { objectsAreEqual } from "helpers/mainHelpers";

import Test from "interfaces/test";

const NAMESPACE = "TEST CONTROLLER";

async function getTests(req: Request, res: Response) {
  try {
    const result = await conn.getAll();

    return res.status(200).json(result);
  } catch (err) {
    logging.error(NAMESPACE, "catch error", err);
    return res.status(500).json({ error: "internal server error" });
  }
}

async function getTest(req: Request, res: Response) {
  const id = parseInt(req.params.id);

  try {
    const result = await conn.getSingle(id);

    if (result === undefined) {
      return res.status(404).json({ message: `test ${id} not found` });
    }
    return res.status(200).json(result);
  } catch (err) {
    logging.error(NAMESPACE, "catch error", err);
    return res.status(500).json({ error: "internal server error" });
  }
}

async function postTest(req: Request, res: Response) {
  try {
    const test: Test = {
      text: req.body.text,
    };

    const result = await conn.insert(test);
    const createdText = await conn.getSingle(result.insertId);

    return res.status(201).json(createdText);
  } catch (err) {
    logging.error(NAMESPACE, "catch error", err);
    res.status(500).json({ error: "internal server error" });
  }
}

async function putTest(req: Request, res: Response) {
  const id = parseInt(req.params.id);

  try {
    const oldTest = await conn.getSingle(id);

    const test: Test = {
      id: id,
      text: req.body.text,
    };

    if (objectsAreEqual(oldTest, test)) {
      return res.status(200).json({ message: "nothing changed" });
    } else {
      await conn.update(test);
      const updatedTest = await conn.getSingle(id);
      return res.status(202).json(updatedTest);
    }
  } catch (err) {
    logging.error(NAMESPACE, "catch error", err);
    res.status(500).json({ error: "internal server error" });
  }
}

async function remove(req: Request, res: Response) {
  const idString = req.params.id;
  const id = parseInt(idString);

  if (isNaN(id))
    res.status(400).json({
      message: "invalid id",
      details: "make sure the id is a integer number",
    });

  try {
    const result = await conn.remove(id);
    if (result.affectedRows > 0) {
      res.status(202).json({ message: `test ${id} removed` });
    } else {
      res.status(404).json({ message: `test ${id} not found` });
    }
  } catch (err) {
    logging.error(NAMESPACE, "catch error", err);
    res.status(500).json({ error: "internal server error" });
  }
}

export default {
  getTests,
  getTest,
  postTest,
  putTest,
  remove,
};
