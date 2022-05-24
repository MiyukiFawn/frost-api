import dotenv from "dotenv";
import conf from "../config.json";

dotenv.config();

// SERVER CONFIG
const SERVER = {
  hostname: conf.server.host,
  port: conf.server.port,
};

// JWT CONFIG
const JWT = {
  secret: process.env.JWT_SECRET || "token",
  expides: process.env.JWT_EXPIRES || 86400,
};

const config = {
  server: SERVER,
  jwt: JWT,
};

export default config;
