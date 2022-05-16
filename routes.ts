import express from "express";

import validateId from "middlewares/validateId";
import auth from "middlewares/auth";

/** IMPORT CONTROLLERS */
import userController from "controllers/user";

const router = express.Router();

/** --- ROUTES --- */
router.get("/user", userController.getAllUsers);
router.get("/user/:id", validateId, userController.getSingleUser);
router.post("/user", userController.postUser);
router.post("/auth", userController.auth);
/** SAMPLE */
export = router;
