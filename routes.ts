import express from "express";
import logging from "logging";
/** IMPORT ROUTERS */
import user_routes from "routes/auth";

import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

/** --- ROUTES --- */
router.get("/ping", async (req, res) => {
  logging.info("NAMESPACE", "MESSAGE");
  logging.info("NAMESPACE", "MESSAGE", { type: "object" });
  
  logging.warn("NAMESPACE", "MESSAGE");
  logging.warn("NAMESPACE", "MESSAGE", { type: "object" });
  
  logging.error("NAMESPACE", "MESSAGE");
  logging.error("NAMESPACE", "MESSAGE", { type: "object" });
  
  logging.debug("NAMESPACE", "MESSAGE");
  logging.debug("NAMESPACE", "MESSAGE", { type: "object" });

  logging.log("NAMESPACE", "MESSAGE");
  logging.log("NAMESPACE", "MESSAGE", { type: "object" });

  return res.status(200).json({
      message: "pong",
  })
});

router.use("/auth", user_routes);

/** SAMPLE */
export = router;
