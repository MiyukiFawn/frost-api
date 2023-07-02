import express from "express";
import Debuger from "debuger";
/** IMPORT ROUTERS */

import dotenv from "dotenv";
dotenv.config();

const Debug = Debuger("Routes");
const router = express.Router();

/** --- ROUTES --- */
router.get("/", async (req, res) => {
  Debug.info("MESSAGE");
  Debug.info("MESSAGE", { type: "object" });

  Debug.warn("MESSAGE");
  Debug.warn("MESSAGE", { type: "object" });

  Debug.error("MESSAGE");
  Debug.error("MESSAGE", { type: "object" });

  Debug.debug("MESSAGE");
  Debug.debug("MESSAGE", { type: "object" });

  Debug.log("MESSAGE");
  Debug.log("MESSAGE", { type: "object" });

  return res.status(200).json({
    message: "Hello world :D",
  });
});

/** SAMPLE */
export = router;
