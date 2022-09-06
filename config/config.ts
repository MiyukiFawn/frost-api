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
  access_expides: process.env.JWT_ACCESS_EXPIRES || 900,
  refresh_expides: process.env.JWT_REFRESH_EXPIRES || 2592000,
};

const config = {
  server: SERVER,
  jwt: JWT,
};

export default config;
