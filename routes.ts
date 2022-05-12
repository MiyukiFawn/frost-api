import express from "express";

/** Controllers */
import sampleController from "controllers/test";

import testValidation from "middlewares/testValidation";
import validateId from "middlewares/validateId";

const router = express.Router();

/** --- ROUTES --- */
/** SAMPLE */

router.get("/test", sampleController.getTests);
router.get("/test/:id", validateId, sampleController.getTest);
router.post("/test", testValidation, sampleController.postTest);
router.put("/test/:id", validateId, testValidation, sampleController.putTest);
router.delete("/test/:id", sampleController.remove);

export = router;
