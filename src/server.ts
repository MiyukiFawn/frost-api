import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import config from "config";

import Debuger from "debuger"

import routes from "routes";
import apiErrorHandler from "middlewares/api_error_handler";
import ApiError from "error/ApiError";

const Debug = Debuger("Routes");
const app = express();

/** Debug the request */
app.use((req: Request, res: Response, next: NextFunction) => {
  Debug.log(`METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);

  res.on("finish", () => {
    Debug.log(
      `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`
    );
  });
  next();
});

/** Parse the request */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/** Rules of the API */
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");

  if (req.method == "OPTIONS") {
    return res.status(200).json({ options: ["POST", "GET", "OPTIONS", "DELETE", "PUT"] });
  }
  next();
});

/** Config app */
app.use("/", routes);

/** Error Handling */
app.use((req: Request, res: Response) => {
  throw ApiError.notFound();
});
app.use(apiErrorHandler);

/** Create the server */
app.listen(config.server.port, () => {
  Debug.info(`Server running on http://${config.server.hostname}:${config.server.port}`);
});
