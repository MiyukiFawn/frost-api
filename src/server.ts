import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import swaggerUi from "swagger-ui-express";
import config from "./config";

import Debuger from "./debuger";

import routes from "./routes";
import apiErrorHandler from "./middlewares/api_error_handler";
import ApiError from "./errors/ApiError";
import fs from "fs";

import YAML from "yaml";

const docsFile = fs.readFileSync("src/swagger.yaml", "utf8");
const swaggerDocs = YAML.parse(docsFile);

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
  console.log('\n');
  
  next();
});

/** Parse the request */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/** Rules of the API */
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  next();
});

/** Define Swagger Documentation route */
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/** Allow external applications to request the API's allowed options */
app.options("/", (req: Request, res: Response) => res.end());

/** Import routes from 'routes.ts' file */
app.use("/", routes);

/** Error Handling */
app.use((req: Request, res: Response) => {
  throw ApiError.notFound();
});
app.use(apiErrorHandler);

/** Create the server */
app.listen(config.server.port, () => {
  Debug.info(`Server running on port ${config.server.port}`);
});
