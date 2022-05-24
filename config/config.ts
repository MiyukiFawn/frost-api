import dotenv from "dotenv";

dotenv.config();

const MYSQL_HOST = process.env.MYSQL_HOST || "localhost";
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || "pso2api";
const MYSQL_USER = process.env.MYSQL_USER || "root";
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || "";

const MYSQL = {
  host: MYSQL_HOST,
  database: MYSQL_DATABASE,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
};

const SERVER_PORT = process.env.SERVER_PORT || 3000;
const SERVER_HOST = process.env.SERVER_HOST || "localhost";

const SERVER = {
  hostname: SERVER_HOST,
  port: SERVER_PORT,
};

const BCRYPT = {
  saltOrRounds: process.env.BCRYPTROUNDS || 10,
};

const JWT = {
  secret: process.env.JWTSECRET || "token",
  expides: process.env.JWTEXPIRES || 86400,
};

const config = {
  mysql: MYSQL,
  server: SERVER,
  bcrypt: BCRYPT,
  jwt: JWT,
};

export default config;
