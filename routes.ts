import express from "express";
/** IMPORT ROUTERS */
const router = express.Router();

/** --- ROUTES --- */
router.use("/ping", (req, res) => {
  return res.status(200).json({
      message: "pong",
  })
});

/** SAMPLE */
export = router;
