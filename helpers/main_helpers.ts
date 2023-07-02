import logging from "Debuger";
import ApiErrors from "error/ApiError";

import z from "zod";

function objectsAreEqual(obj1: object, obj2: object): boolean {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

function validate_post(data: object, schema: z.Schema) {
  const parsed = schema.safeParse(data);
  if (!parsed.success) throw ApiErrors.badRequest(parsed);
  return parsed.data;
}

export { objectsAreEqual, validate_post };
