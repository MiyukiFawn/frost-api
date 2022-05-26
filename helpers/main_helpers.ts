import logging from "logging";
import { Response } from "express";
import { object } from "joi";

function objectsAreEqual(obj1: object, obj2: object): boolean {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export { objectsAreEqual };
