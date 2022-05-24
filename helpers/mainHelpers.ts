import logging from "logging";
import { Response } from "express";

function objectsAreEqual(obj1: object, obj2: object): boolean {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

function logError500(NAMESPACE: string, res: Response, err: any) {
    logging.error(NAMESPACE, "catch error", err);
    return res.status(500).json({ error: "internal server error" });
}

export { objectsAreEqual, logError500 };
