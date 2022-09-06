import "express-async-errors";
import http from "http";
import express, { Request, Response, NextFunction } from "express";
import logging from "logging";
import config from "config";

import routes from "routes";
import apiErrorHandler from "middlewares/api_error_handler";
import ApiError from "error/ApiError";

const NAMESPACE = "Server";
const router = express();

/** Logging the request */
router.use((req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);

  res.on("finish", () => {
    logging.info(
      NAMESPACE,
      `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`
    );
  });
  next();
});

/** Parse the request */
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

/** Rules of the API */
router.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST PUT");
    return res.status(200).json(["GET PATCH DELETE POST PUT"]);
  }
  next();
});

/** Config router */
router.use("/", routes);

/** Error Handling */
router.use((req: Request, res: Response) => {
  throw ApiError.notFound();
});
router.use(apiErrorHandler);

/** Create the server */
const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () => {
  logging.info(NAMESPACE, `Server running on http://${config.server.hostname}:${config.server.port}`);
});
